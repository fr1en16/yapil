'use client';

import { useEffect, useRef, useCallback } from 'react';

// Параметры (как в шаблоне)
const STEP       = 6;   // размер ячейки в px (меньше = больше деталей)
const PAD        = 0;   // отступ
const FPS        = 30;
const CONN_LIMIT = 6;   // макс. кривых соединений

interface Pt  { x: number; y: number }
interface Conn { a: Pt; b: Pt; offset: number; amp: number }

function dist(a: Pt, b: Pt) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function rndRGB() {
  return `rgb(${Math.random() * 255 | 0},${Math.random() * 255 | 0},${Math.random() * 255 | 0})`;
}

function map(v: number, a: number, b: number, c: number, d: number) {
  return c + (d - c) * ((v - a) / (b - a));
}

// ── Pixel data из изображения ──────────────────────────────────────────────
function sampleImage(img: HTMLImageElement, W: number, H: number): Uint8ClampedArray {
  const off = document.createElement('canvas');
  off.width = W; off.height = H;
  const c = off.getContext('2d')!;
  c.drawImage(img, 0, 0, W, H);
  return c.getImageData(0, 0, W, H).data;
}

export default function AsciiPhoto({ src = '/me.webp' }: { src?: string }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const pixelsRef   = useRef<Uint8ClampedArray | null>(null);
  const imgWRef     = useRef(0);
  const imgHRef     = useRef(0);
  const connsRef    = useRef<Conn[]>([]);
  const rafRef      = useRef<number>(0);
  const lastFRef    = useRef(0);
  const lastConnRef = useRef(0);

  const rebuild = useCallback((img: HTMLImageElement, logW: number, logH: number) => {
    imgWRef.current = logW;
    imgHRef.current = logH;
    pixelsRef.current = sampleImage(img, logW, logH);
    connsRef.current  = [];
  }, []);

  const draw = useCallback((ts: number) => {
    rafRef.current = requestAnimationFrame(draw);

    if (ts - lastFRef.current < 1000 / FPS) return;
    lastFRef.current = ts;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const px    = pixelsRef.current;
    const logW  = imgWRef.current;
    const logH  = imgHRef.current;
    if (!px || !logW || !logH) return;

    const dark  = document.documentElement.classList.contains('dark');
    const BG    = dark ? '#000' : '#E8EFF2';
    const INK   = dark ? '#fff' : '#000';

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, logW, logH);

    const darkPoints: Pt[] = [];

    for (let y = 0; y < logH; y += STEP) {
      for (let x = 0; x < logW; x += STEP) {
        const si  = (y * logW + x) * 4;
        // raw: 0 = dark pixel in photo, 255 = bright pixel
        // We use raw brightness directly for BOTH themes:
        //   dark photo area (raw < 80) → dense ink marks → visible in both light & dark
        //   light photo area (raw > 200) → nothing → bg shows through
        // Only ink color changes: black in light mode, white in dark mode
        const b = 0.299 * px[si] + 0.587 * px[si + 1] + 0.114 * px[si + 2];

        const cx = PAD + x + STEP / 2;
        const cy = PAD + y + STEP / 2;

        if (b < 80) {
          // Very dark → solid square
          ctx.fillStyle = INK;
          ctx.fillRect(cx - STEP / 2, cy - STEP / 2, STEP, STEP);
          darkPoints.push({ x: cx, y: cy });

        } else if (b < 120) {
          // Dark → circle, radius by brightness
          const r = map(b, 80, 120, STEP / 2, 2.5);
          ctx.fillStyle = INK;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();
          darkPoints.push({ x: cx, y: cy });

        } else if (b < 140) {
          // Mid-dark → solid square
          ctx.fillStyle = INK;
          ctx.fillRect(cx - STEP / 2, cy - STEP / 2, STEP, STEP);

        } else if (b < 160) {
          // Mid → noise dither
          const DENS = 0.22;
          ctx.fillStyle = INK;
          for (let yy = cy - STEP / 2; yy < cy + STEP / 2; yy++) {
            for (let xx = cx - STEP / 2; xx < cx + STEP / 2; xx++) {
              if (Math.random() < DENS) ctx.fillRect(xx - 1, yy - 1, 2, 2);
            }
          }

        } else if (b < 180) {
          // Mid-light → random color pixel (glitch accent)
          ctx.fillStyle = rndRGB();
          ctx.fillRect(cx - STEP / 2, cy - STEP / 2, STEP, STEP);

        } else if (b < 195) {
          // Near-light → thin horizontal line
          ctx.fillStyle = INK;
          ctx.fillRect(cx - STEP / 2, cy, STEP, 1);

        } else if (b < 222) {
          // Very near-light → ASCII character
          ctx.fillStyle = INK;
          ctx.font = `10px "Source Code Pro", "Courier New", monospace`;
          ctx.textAlign    = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(Math.random() < 0.2 ? 'Z' : '+', cx, cy);
        }
        // b >= 222 → nothing (transparent/background)
      }
    }

    // ── Соединения между тёмными точками ──────────────────────────────────
    const now = ts;
    if (now - lastConnRef.current > 500) {
      lastConnRef.current = now;
      const desired = 1 + (Math.random() * CONN_LIMIT | 0);
      // Prune stale connections
      connsRef.current = connsRef.current.filter(c =>
        darkPoints.some(p => dist(p, c.a) < STEP * 2) &&
        darkPoints.some(p => dist(p, c.b) < STEP * 2)
      );
      // Add new connections
      while (connsRef.current.length < desired && darkPoints.length >= 2) {
        const a = darkPoints[Math.random() * darkPoints.length | 0];
        let b: Pt = a;
        let tries = 0;
        while (tries < 50 && dist(a, b) < STEP * 5) {
          b = darkPoints[Math.random() * darkPoints.length | 0];
          tries++;
        }
        if (dist(a, b) >= STEP * 5) {
          connsRef.current.push({ a, b, offset: Math.random() * Math.PI * 2, amp: STEP * (4.5 + Math.random() * 4.5) });
        }
      }
    }

    // Draw bezier connections
    const t = now * 0.005;
    for (const c of connsRef.current) {
      ctx.strokeStyle = rndRGB();
      ctx.lineWidth   = 0.99;
      const { a, b } = c;
      const dx = b.x - a.x, dy = b.y - a.y;
      const mx = a.x + dx * 0.5, my = a.y + dy * 0.5;
      const ang = Math.atan2(dy, dx);
      const r   = c.amp * 4.2;
      const ph  = t * 2.4 + c.offset;
      const cx1 = mx + Math.cos(ang + Math.PI / 2 + Math.sin(ph) * 0.2) * r;
      const cy1 = my + Math.sin(ang + Math.PI / 2 + Math.sin(ph) * 0.02) * r;
      const cx2 = mx + Math.cos(ang - Math.PI / 2 + Math.cos(ph) * 0.9) * r;
      const cy2 = my + Math.sin(ang - Math.PI / 2 + Math.cos(ph) * 0.7) * r;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.bezierCurveTo(cx1, cy1, cx2, cy2, b.x, b.y);
      ctx.stroke();

      // Endpoint dots
      ctx.fillStyle = rndRGB();
      ctx.beginPath(); ctx.arc(a.x, a.y, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(b.x, b.y, 3.5, 0, Math.PI * 2); ctx.fill();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    // crossOrigin MUST be set before src for canvas getImageData to work
    // For same-origin images, don't set crossOrigin at all (avoids taint)
    img.src = src;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const logW = parent.clientWidth;
      const logH = parent.clientHeight;
      canvas.width  = logW * dpr;
      canvas.height = logH * dpr;
      canvas.style.width  = logW + 'px';
      canvas.style.height = logH + 'px';
      const ctx = canvas.getContext('2d')!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuild(img, logW, logH);
    };

    const start = () => {
      resize();
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(draw);
    };

    if (img.complete && img.naturalWidth > 0) {
      start();
    } else {
      img.onload = start;
    }

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [src, rebuild, draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-label="Portrait"
    />
  );
}
