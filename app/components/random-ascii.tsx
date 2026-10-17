"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { load, mount, names, type Piece, type PieceName } from "ascii.rest";

// Every piece in the library has an equal chance on each visit.
function randomPiece(exclude?: PieceName | null): PieceName {
  const values = new Uint32Array(1);
  let name: PieceName;
  do {
    window.crypto.getRandomValues(values);
    name = names[values[0] % names.length];
  } while (name === exclude && names.length > 1);
  return name;
}

const CHAR_WIDTH = 0.6; // monospace advance, in ems
const LINE_HEIGHT = 1.15;

export function RandomAscii() {
  const [name, setName] = useState<PieceName | null>(null);
  const [piece, setPiece] = useState<Piece | null>(null);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const frameRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLElement | null>(null);

  // Pick on the client, so every visit gets a fresh draw.
  useEffect(() => {
    setName(randomPiece());
  }, []);

  useEffect(() => {
    if (!name) return;
    let live = true;
    setPiece(null);
    load[name]().then((mod) => live && setPiece(mod as Piece));
    return () => {
      live = false;
    };
  }, [name]);

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () =>
      setBox({ width: el.clientWidth, height: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isCanvas = Boolean(piece?.meta.palette);

  useEffect(() => {
    if (!piece || !artRef.current) return;
    return mount(artRef.current, piece);
  }, [piece, isCanvas]);

  let style: React.CSSProperties = { visibility: "hidden" };
  if (piece && box.width > 0) {
    const { cols = 80, rows = 24, cell = 2 } = piece.meta;
    if (isCanvas) {
      // Canvas pieces fill their width; cap the width so tall ones fit the frame.
      const width = Math.min(box.width, (box.height * cols) / (rows * cell));
      style = { width: `${Math.floor(width)}px` };
    } else {
      const fontSize = Math.min(
        box.width / (cols * CHAR_WIDTH),
        box.height / (rows * LINE_HEIGHT),
        16
      );
      style = { fontSize: `${fontSize}px`, lineHeight: LINE_HEIGHT };
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setName(randomPiece(name))}
        aria-label="Show another random piece"
        className="block w-full cursor-pointer"
      >
        <div
          ref={frameRef}
          className="flex h-[260px] w-full items-end justify-center overflow-hidden sm:h-[380px]"
        >
          {piece ? (
            isCanvas ? (
              <canvas
                key={name}
                ref={(el) => {
                  artRef.current = el;
                }}
                role="img"
                aria-label={piece.meta.name}
                className="max-w-full rounded-[3px] text-signal"
                style={style}
              />
            ) : (
              <pre
                key={name}
                ref={(el) => {
                  artRef.current = el;
                }}
                role="img"
                aria-label={piece.meta.name}
                className="m-0 font-mono text-signal"
                style={style}
              />
            )
          ) : null}
        </div>
      </button>

      <div className="mt-3 flex h-5 items-baseline gap-4 font-mono text-[12.5px] text-faint">
        {name ? (
          <>
            <a
              href={`https://ascii.rest/${name}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              {name}
            </a>
            <button
              type="button"
              onClick={() => setName(randomPiece(name))}
              className="transition-colors hover:text-ink"
            >
              shuffle
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
