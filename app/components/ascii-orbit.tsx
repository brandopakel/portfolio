"use client";

import { useEffect, useState } from "react";

type Point = {
  x: number;
  y: number;
  z: number;
};

const width = 64;
const height = 26;
const characterAspect = 0.55;
const shades = " .:-=+*#%@";

const fallbackFrame = String.raw`
      +---------------------+
     /|                    /|
    / |   FINANCE + AI    / |
   +---------------------+  |
   |  |                  |  |
   |  |   MODELS         |  |
   |  |   TOOLS          |  |
   |  |   PRODUCTS       |  |
   |  +------------------|--+
   | /                   | /
   |/                    |/
   +---------------------+
`.trim();

function randomGenerator(seed: number) {
  let value = seed;

  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function makePoints(seed: number) {
  const random = randomGenerator(seed);
  const points: Point[] = [];
  const latitudes = [-55, -32, -14, 14, 32, 55];
  const longitudes = [0, 24, 48, 72, 96, 120, 144, 168];
  const orbitTilt = random() * Math.PI;

  latitudes.forEach((latitude) => {
    const phi = (latitude * Math.PI) / 180;
    const ringRadius = Math.cos(phi);

    for (let i = 0; i < 120; i += 1) {
      const theta = (i / 120) * Math.PI * 2;
      points.push({
        x: ringRadius * Math.cos(theta),
        y: Math.sin(phi),
        z: ringRadius * Math.sin(theta),
      });
    }
  });

  longitudes.forEach((longitude) => {
    const theta = (longitude * Math.PI) / 180;

    for (let i = 0; i < 96; i += 1) {
      const phi = -Math.PI / 2 + (i / 95) * Math.PI;
      points.push({
        x: Math.cos(phi) * Math.cos(theta),
        y: Math.sin(phi),
        z: Math.cos(phi) * Math.sin(theta),
      });
    }
  });

  for (let i = 0; i < 180; i += 1) {
    const theta = (i / 180) * Math.PI * 2;
    const x = 1.48 * Math.cos(theta);
    const y = 0.22 * Math.sin(theta);
    const z = 1.48 * Math.sin(theta);
    const sinTilt = Math.sin(orbitTilt);
    const cosTilt = Math.cos(orbitTilt);

    points.push({
      x: x * cosTilt - z * sinTilt,
      y,
      z: x * sinTilt + z * cosTilt,
    });
  }

  return points;
}

function rotate(point: Point, time: number, seed: number) {
  const ax = time * 0.9 + seed * 0.0007;
  const ay = time * 0.62 + seed * 0.0009;
  const az = time * 0.35;

  const sinX = Math.sin(ax);
  const cosX = Math.cos(ax);
  const sinY = Math.sin(ay);
  const cosY = Math.cos(ay);
  const sinZ = Math.sin(az);
  const cosZ = Math.cos(az);

  const y1 = point.y * cosX - point.z * sinX;
  const z1 = point.y * sinX + point.z * cosX;
  const x2 = point.x * cosY + z1 * sinY;
  const z2 = -point.x * sinY + z1 * cosY;

  return {
    x: x2 * cosZ - y1 * sinZ,
    y: x2 * sinZ + y1 * cosZ,
    z: z2,
  };
}

function renderFrame(points: Point[], time: number, seed: number) {
  const cells = Array.from({ length: width * height }, () => " ");
  const depth = Array.from({ length: width * height }, () => -Infinity);
  const projected = points.map((point) => {
    const rotated = rotate(point, time, seed);
    const distance = 4.2;
    const perspective = distance / (distance + rotated.z);

    return {
      x: rotated.x * perspective,
      y: rotated.y * perspective,
      z: rotated.z,
    };
  });

  const bounds = projected.reduce(
    (acc, point) => ({
      minX: Math.min(acc.minX, point.x),
      maxX: Math.max(acc.maxX, point.x),
      minY: Math.min(acc.minY, point.y),
      maxY: Math.max(acc.maxY, point.y),
    }),
    {
      minX: Infinity,
      maxX: -Infinity,
      minY: Infinity,
      maxY: -Infinity,
    }
  );

  const paddingX = 5;
  const paddingTop = 3;
  const paddingBottom = 5;
  const objectWidth = Math.max(bounds.maxX - bounds.minX, 0.001);
  const objectHeight = Math.max(bounds.maxY - bounds.minY, 0.001);
  const scale = Math.min(
    ((width - paddingX * 2) * characterAspect) / objectWidth,
    (height - paddingTop - paddingBottom) / objectHeight
  );
  const centerX = (bounds.minX + bounds.maxX) / 2;
  const centerY = (bounds.minY + bounds.maxY) / 2;
  const centerRow = paddingTop + (height - paddingTop - paddingBottom) / 2;

  projected.forEach((point, index) => {
    const x = Math.round(
      width / 2 + ((point.x - centerX) * scale) / characterAspect
    );
    const y = Math.round(centerRow + (point.y - centerY) * scale);

    if (x < 0 || x >= width || y < 0 || y >= height) return;

    const cell = y * width + x;
    if (point.z <= depth[cell]) return;

    const shimmer = Math.sin(time * 2.2 + index * 0.17 + seed) * 0.12;
    const shadeIndex = Math.max(
      1,
      Math.min(
        shades.length - 1,
        Math.floor(((point.z + 1.8) / 3.6 + shimmer) * shades.length)
      )
    );

    depth[cell] = point.z;
    cells[cell] = shades[shadeIndex];
  });

  const lines: string[] = [];
  for (let y = 0; y < height; y += 1) {
    lines.push(cells.slice(y * width, (y + 1) * width).join(""));
  }

  return lines.join("\n");
}

export function AsciiOrbit() {
  const [frame, setFrame] = useState(fallbackFrame);

  useEffect(() => {
    const seed = Math.floor(Math.random() * 1_000_000);
    const points = makePoints(seed);
    let frameId = 0;
    let lastFrame = 0;

    function tick(timestamp: number) {
      if (timestamp - lastFrame > 70) {
        setFrame(renderFrame(points, timestamp / 1000, seed));
        lastFrame = timestamp;
      }

      frameId = window.requestAnimationFrame(tick);
    }

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div
        aria-hidden="true"
        className="grid min-h-[390px] w-full max-w-2xl place-items-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 px-4 py-7 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
      >
        <pre className="m-0 font-mono text-[8px] leading-none sm:text-[10px] md:text-[12px]">{frame}</pre>
      </div>
    </div>
  );
}
