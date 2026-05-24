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

function addLine(points: Point[], start: Point, end: Point, steps: number) {
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    points.push({
      x: start.x + (end.x - start.x) * t,
      y: start.y + (end.y - start.y) * t,
      z: start.z + (end.z - start.z) * t,
    });
  }
}

function addTorusCloud(points: Point[], random: () => number) {
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
}

function addCubeWireframe(points: Point[]) {
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
    addLine(
      points,
      { x: x1, y: y1, z: z1 },
      { x: x2, y: y2, z: z2 },
      38
    );
  });
}

function addSphereCloud(points: Point[], random: () => number) {
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

function addHelix(points: Point[], random: () => number) {
  const turns = 2.4 + random() * 0.8;
  const radius = 0.86 + random() * 0.18;

  for (let strand = 0; strand < 2; strand += 1) {
    const phase = strand * Math.PI;

    for (let i = 0; i < 220; i += 1) {
      const t = i / 219;
      const theta = t * Math.PI * 2 * turns + phase;
      points.push({
        x: radius * Math.cos(theta),
        y: (t - 0.5) * 2.35,
        z: radius * Math.sin(theta),
      });
    }
  }

  for (let i = 0; i < 18; i += 1) {
    const t = i / 17;
    const theta = t * Math.PI * 2 * turns;
    addLine(
      points,
      {
        x: radius * Math.cos(theta),
        y: (t - 0.5) * 2.35,
        z: radius * Math.sin(theta),
      },
      {
        x: radius * Math.cos(theta + Math.PI),
        y: (t - 0.5) * 2.35,
        z: radius * Math.sin(theta + Math.PI),
      },
      14
    );
  }
}

function addWaveGrid(points: Point[], random: () => number) {
  const phase = random() * Math.PI * 2;
  const frequency = 4 + random() * 1.5;
  const size = 1.35;
  const lines = 9;
  const steps = 48;

  for (let row = 0; row < lines; row += 1) {
    const z = -size + (row / (lines - 1)) * size * 2;
    for (let i = 0; i <= steps; i += 1) {
      const x = -size + (i / steps) * size * 2;
      points.push({
        x,
        y: Math.sin(x * frequency + z * 1.6 + phase) * 0.22,
        z,
      });
    }
  }

  for (let column = 0; column < lines; column += 1) {
    const x = -size + (column / (lines - 1)) * size * 2;
    for (let i = 0; i <= steps; i += 1) {
      const z = -size + (i / steps) * size * 2;
      points.push({
        x,
        y: Math.sin(x * frequency + z * 1.6 + phase) * 0.22,
        z,
      });
    }
  }
}

function addOctahedron(points: Point[]) {
  const top = { x: 0, y: -1.25, z: 0 };
  const bottom = { x: 0, y: 1.25, z: 0 };
  const ring = [
    { x: -1.2, y: 0, z: 0 },
    { x: 0, y: 0, z: -1.2 },
    { x: 1.2, y: 0, z: 0 },
    { x: 0, y: 0, z: 1.2 },
  ];

  ring.forEach((point, index) => {
    const next = ring[(index + 1) % ring.length];
    addLine(points, top, point, 44);
    addLine(points, bottom, point, 44);
    addLine(points, point, next, 44);
  });
}

function makePoints(seed: number) {
  const random = randomGenerator(seed);
  const mode = random();
  const points: Point[] = [];

  if (mode < 0.24) addTorusCloud(points, random);
  else if (mode < 0.4) addCubeWireframe(points);
  else if (mode < 0.56) addSphereCloud(points, random);
  else if (mode < 0.72) addHelix(points, random);
  else if (mode < 0.88) addWaveGrid(points, random);
  else addOctahedron(points);

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
    const values = new Uint32Array(1);
    window.crypto?.getRandomValues(values);
    const seed = values[0] || Math.floor(Math.random() * 1_000_000);
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
