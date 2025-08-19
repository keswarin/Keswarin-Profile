// src/components/ui/MarqueeGallery.tsx
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type MarqueeItem = {
  id: number | string;
  src: string;
  alt?: string;
  caption?: string;
};

type Props = {
  items: MarqueeItem[];
  heightClass?: string;      // ความสูงของการ์ดรูป เช่น "h-48 md:h-64 lg:h-72"
  speed?: number;            // px/วินาที (ความเร็วเลื่อน)
  gap?: number;              // ระยะห่างการ์ด
  pauseOnHover?: boolean;    // โฮเวอร์แล้วหยุดไหม
  showCaptions?: boolean;    // แสดงคำบรรยายไหม
};

export default function MarqueeGallery({
  items,
  heightClass = "h-48 md:h-64 lg:h-72",
  speed = 60,
  gap = 24,
  pauseOnHover = true,
  showCaptions = true,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [repeat, setRepeat] = useState(3);
  const setWidthRef = useRef(0);
  const posRef = useRef(0);
  const runningRef = useRef(true);
  const rafRef = useRef<number | null>(null);

  // Lightbox
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  // วัดความกว้างของ 1 ชุด เพื่อคูณซ้ำให้เลื่อนวนได้เนียน
  const measure = useCallback(() => {
    const setEl = setRef.current;
    const vp = viewportRef.current;
    if (!setEl || !vp) return;
    const w = Math.ceil(setEl.getBoundingClientRect().width);
    const vw = Math.ceil(vp.getBoundingClientRect().width);
    setWidthRef.current = w;
    const need = Math.max(2, Math.ceil((vw * 2) / Math.max(1, w)));
    setRepeat(need + 1);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    viewportRef.current && ro.observe(viewportRef.current);
    setRef.current && ro.observe(setRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // wrap ค่าตำแหน่งให้อยู่ในช่วง [-W, 0)
  const wrap = (x: number) => {
    const W = setWidthRef.current || 1;
    while (x < -W) x += W;
    while (x >= 0) x -= W;
    return x;
  };
  const applyTransform = (x: number) => {
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${x}px,0,0)`;
  };

  // autoplay แบบต่อเนื่อง
  useEffect(() => {
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (runningRef.current && setWidthRef.current > 0) {
        posRef.current = wrap(posRef.current - speed * dt);
        applyTransform(posRef.current);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      rafRef.current != null && cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  // โฮเวอร์/ทัชให้หยุด (ถ้าตั้งค่า)
  const hoverProps = pauseOnHover
    ? {
        onMouseEnter: () => (runningRef.current = false),
        onMouseLeave: () => (runningRef.current = true),
        onTouchStart: () => (runningRef.current = false),
        onTouchEnd: () => (runningRef.current = true),
      }
    : {};

  // เปิด/ปิดภาพใหญ่
  const openLightbox = (i: number) => {
    setStartIndex(i);
    setOpen(true);
    runningRef.current = false;
  };
  const closeLightbox = () => {
    setOpen(false);
    runningRef.current = true;
  };

  // ปุ่มเลื่อนซ้าย/ขวา (นัดจ์ตำแหน่งเล็กน้อย)
  const nudge = (dir: "left" | "right") => {
    const vpW = viewportRef.current?.clientWidth || 600;
    const step = Math.max(160, Math.floor(vpW * 0.6)); // ระยะเลื่อนต่อครั้ง
    runningRef.current = false;
    posRef.current = wrap(posRef.current + (dir === "left" ? step : -step));
    applyTransform(posRef.current);
    // ให้วิ่งต่อเองอีกครั้งหลังหยุดสั้นๆ
    window.setTimeout(() => (runningRef.current = true), 250);
  };

  return (
    <>
      {/* พื้นหลังโปร่งใส + position:relative สำหรับปุ่มซ้าย/ขวา */}
      <div
        ref={viewportRef}
        className="relative overflow-hidden rounded-xl"
        {...hoverProps}
      >
        {/* ปุ่มเลื่อนซ้าย/ขวา */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => nudge("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 md:p-3 bg-black/40 hover:bg-black/60 text-white backdrop-blur"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => nudge("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 md:p-3 bg-black/40 hover:bg-black/60 text-white backdrop-blur"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* แทร็กที่เลื่อนต่อเนื่อง */}
        <div
          ref={trackRef}
          className="will-change-transform"
          style={{ display: "flex", gap: `${gap}px`, transform: `translate3d(${posRef.current}px,0,0)` }}
        >
          {Array.from({ length: repeat }).map((_, blockIdx) => (
            <div
              key={blockIdx}
              ref={blockIdx === 0 ? setRef : undefined}
              className="flex"
              style={{ gap: `${gap}px` }}
            >
              {items.map((it, i) => (
                <button
                  key={`${blockIdx}-${it.id}`}
                  type="button"
                  onClick={() => openLightbox(i)}
                  className={`relative shrink-0 w-[72vw] sm:w-[50vw] md:w-[40vw] lg:w-[28vw] xl:w-[24vw] ${heightClass} rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.02]`}
                  aria-label="Open image"
                >
                  <img
                    src={it.src}
                    alt={it.alt || ""}
                    className="max-w-full max-h-full object-contain pointer-events-none"
                    loading="lazy"
                    draggable={false}
                  />

                  {showCaptions && (it.caption || it.alt) && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0">
                      <div className="mx-3 mb-3 rounded-md bg-black/60 text-white text-[11px] md:text-sm px-3 py-2">
                        {it.caption || it.alt}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox เต็มจอ */}
      {open && (
        <Lightbox items={items} startIndex={startIndex} onClose={closeLightbox} />
      )}
    </>
  );
}

/* ---------------- Lightbox ---------------- */
function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: MarqueeItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const next = () => setIdx((p) => (p + 1) % items.length);
  const prev = () => setIdx((p) => (p - 1 + items.length) % items.length);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black/95" onClick={onClose}>
      {/* ปิด */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 rounded-full p-3 bg-white/95 hover:bg-white shadow-lg"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {/* ปุ่มเลื่อน */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/90 hover:bg-white shadow"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/90 hover:bg-white shadow"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="w-screen h-screen flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={items[idx].src}
          alt={items[idx].alt || ""}
          className="w-full h-full object-contain"
          draggable={false}
        />
        {(items[idx].caption || items[idx].alt) && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
            <div className="mx-auto max-w-[92vw] rounded-md bg-black/60 text-white text-sm md:text-base px-3 py-2">
              {items[idx].caption || items[idx].alt}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
