"use client";

import { useEffect, useState } from "react";

type Point = {
  x: number;
  y: number;
  z: number;
};

const width = 64;
const height = 26;
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
`;

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
  const mode = random();
  const points: Point[] = [];

  if (mode < 0.42) {
    for (let i = 0; i < 620; i += 1) {
      const u = random() * Math.PI * 2;
      const v = random() * Math.PI * 2;
      const radius = 1.18;
      const tube = 0.48;

      points.push({
        x: (radius + tube * Math.cos(v)) * Math.cos(u),
        y: (radius + tube * Math.cos(v)) * Math.sin(u),
        z: tube * Math.sin(v),
      });
    }
  } else if (mode < 0.72) {
    const edges = [
      [-1, -1, -1, 1, -1, -1],
      [-1, 1, -1, 1, 1, -1],
      [-1, -1, 1, 1, -1, 1],
      [-1, 1, 1, 1, 1, 1],
      [-1, -1, -1, -1, 1, -1],
      [1, -1, -1, 1, 1, -1],
      [-1, -1, 1, -1, 1, 1],
      [1, -1, 1, 1, 1, 1],
      [-1, -1, -1, -1, -1, 1],
      [1, -1, -1, 1, -1, 1],
      [-1, 1, -1, -1, 1, 1],
      [1, 1, -1, 1, 1, 1],
    ];

    edges.forEach(([x1, y1, z1, x2, y2, z2]) => {
      for (let i = 0; i <= 38; i += 1) {
        const t = i / 38;
        points.push({
          x: x1 + (x2 - x1) * t,
          y: y1 + (y2 - y1) * t,
          z: z1 + (z2 - z1) * t,
        });
      }
    });
  } else {
    for (let i = 0; i < 560; i += 1) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const radius = 1 + random() * 0.55;

      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      });
    }
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

  points.forEach((point, index) => {
    const rotated = rotate(point, time, seed);
    const distance = 4.2;
    const perspective = distance / (distance + rotated.z);
    const x = Math.round(width / 2 + rotated.x * perspective * 18);
    const y = Math.round(height / 2 + rotated.y * perspective * 8.25);

    if (x < 0 || x >= width || y < 0 || y >= height) return;

    const cell = y * width + x;
    if (rotated.z <= depth[cell]) return;

    const shimmer = Math.sin(time * 2.2 + index * 0.17 + seed) * 0.12;
    const shadeIndex = Math.max(
      1,
      Math.min(
        shades.length - 1,
        Math.floor(((rotated.z + 1.8) / 3.6 + shimmer) * shades.length)
      )
    );

    depth[cell] = rotated.z;
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
      <pre
        aria-hidden="true"
        className="h-[360px] w-full max-w-2xl overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 px-4 py-5 text-[9px] leading-[1.08] text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 sm:text-[11px] md:text-[13px]"
      >
        {frame}
      </pre>
    </div>
  );
}
