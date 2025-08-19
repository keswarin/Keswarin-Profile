// src/components/ui/GalleryCarousel.tsx
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/* ---------- Types ---------- */
export type GalleryItem = {
  id: number | string;
  src: string;
  alt?: string;
  caption?: string;
};

type Props = {
  items: GalleryItem[];
  heightClass?: string;   // card height (Tailwind class)
  speed?: number;         // autoplay speed px/s
  gap?: number;           // space between cards in px
  pauseOnHover?: boolean;
};

const DRAG_THRESHOLD = 6; // px — move over this = drag

export default function GalleryCarousel({
  items,
  heightClass = "h-48 md:h-64 lg:h-72",
  speed = 60,
  gap = 24,
  pauseOnHover = true,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [repeat, setRepeat] = useState(3);
  const setWidthRef = useRef(0);
  const posRef = useRef(0);
  const runningRef = useRef(true);
  const rafRef = useRef<number | null>(null);

  // timers
  const resumeTimerRef = useRef<number | null>(null);

  // drag helpers
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const velRef = useRef(0);

  // which card pressed / released (for "true click")
  const pressedIndexRef = useRef<number | null>(null);

  // lightbox
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  /* ---------- measure one block width ---------- */
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
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (setRef.current) ro.observe(setRef.current);
    return () => ro.disconnect();
  }, [measure]);

  /* ---------- helpers ---------- */
  const wrap = (x: number) => {
    const W = setWidthRef.current || 1;
    while (x < -W) x += W;
    while (x >= 0) x -= W;
    return x;
  };
  const applyTransform = (x: number) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${x}px,0,0)`;
    }
  };
  const resumeAfter = (ms: number) => {
    runningRef.current = false;
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      runningRef.current = true;
    }, ms) as unknown as number;
  };

  /* ---------- autoplay ticker ---------- */
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
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, [speed]);

  /* ---------- hover pause ---------- */
  const hoverProps = pauseOnHover
    ? {
        onMouseEnter: () => (runningRef.current = false),
        onMouseLeave: () => resumeAfter(600),
        onTouchStart: () => (runningRef.current = false),
        onTouchEnd: () => resumeAfter(800),
      }
    : {};

  /* ---------- drag to scroll ---------- */
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const vp = viewportRef.current;
    if (!vp) return;

    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    runningRef.current = false;
    draggingRef.current = true;
    didDragRef.current = false;

    vp.setPointerCapture?.(e.pointerId);
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    lastXRef.current = e.clientX;
    lastTRef.current = performance.now();
    vp.classList.add("cursor-grabbing", "select-none");

    // บันทึกการ์ดที่เริ่มกด
    const btn = (e.target as HTMLElement).closest("[data-idx]") as HTMLElement | null;
    pressedIndexRef.current = btn ? Number(btn.dataset.idx) : null;
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > DRAG_THRESHOLD) didDragRef.current = true;

    posRef.current = wrap(dragStartPosRef.current + dx);
    applyTransform(posRef.current);

    const now = performance.now();
    const dtx = e.clientX - lastXRef.current;
    const dt = Math.max(1, now - lastTRef.current) / 1000;
    velRef.current = dtx / dt;
    lastXRef.current = e.clientX;
    lastTRef.current = now;
  };

  const finishDrag = (pointerId?: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    draggingRef.current = false;
    vp.releasePointerCapture?.(pointerId ?? 0);
    vp.classList.remove("cursor-grabbing", "select-none");

    // inertia
    let v = velRef.current;
    const friction = 0.92;
    const minV = 8;
    const momentum = () => {
      v *= friction;
      const dt = 1 / 60;
      posRef.current = wrap(posRef.current + v * dt);
      applyTransform(posRef.current);
      if (Math.abs(v) > minV) requestAnimationFrame(momentum);
      else resumeAfter(1000);
    };
    requestAnimationFrame(momentum);
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    // ตรวจว่าคลิกจริง (ไม่ลาก) และเริ่ม/จบที่การ์ดเดียวกัน
    const endBtn = (e.target as HTMLElement).closest("[data-idx]") as HTMLElement | null;
    const endIndex = endBtn ? Number(endBtn.dataset.idx) : null;
    const startIndexPressed = pressedIndexRef.current;

    finishDrag(e.pointerId);

    if (!didDragRef.current && startIndexPressed != null && startIndexPressed === endIndex) {
      setStartIndex(startIndexPressed);
      setOpen(true);
      runningRef.current = false;
    }

    pressedIndexRef.current = null;
    didDragRef.current = false;
  };

  const onPointerCancel: React.PointerEventHandler<HTMLDivElement> = (e) => {
    finishDrag(e.pointerId);
    pressedIndexRef.current = null;
    didDragRef.current = false;
  };

  const onPointerLeave: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (draggingRef.current) onPointerUp(e);
  };

  /* ---------- wheel support ---------- */
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta !== 0) {
      runningRef.current = false;
      posRef.current = wrap(posRef.current - delta);
      applyTransform(posRef.current);
      (onWheel as any)._t && window.clearTimeout((onWheel as any)._t);
      (onWheel as any)._t = window.setTimeout(() => (runningRef.current = true), 600);
    }
  };

  const handleClose = () => {
    setOpen(false);
    resumeAfter(400);
  };

  return (
    <>
      <div
        ref={viewportRef}
        className="overflow-hidden cursor-grab"
        role="region"
        aria-label="Gallery carousel"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerLeave}
        onWheel={onWheel}
        {...hoverProps}
      >
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
                  data-idx={i}
                  // ❌ ไม่ต้องใส่ onClick — เราเปิดรูปใน onPointerUp แล้ว
                  className={`
                    group relative shrink-0 bg-white shadow rounded-xl
                    w-[70vw] sm:w-[48vw] md:w-[38vw] lg:w-[28vw] xl:w-[24vw]
                    ${heightClass}
                    flex items-center justify-center overflow-hidden
                    transition-transform duration-200 hover:scale-[1.02]
                  `}
                  aria-label={it.alt || "open image"}
                >
                  <img
                    src={it.src}
                    alt={it.alt || ""}
                    className="max-w-full max-h-full object-contain pointer-events-none"
                    loading="lazy"
                    draggable={false}
                  />
                  {(it.caption || it.alt) && (
                    <div className="
                      pointer-events-none absolute inset-x-0 bottom-0
                      bg-gradient-to-t from-black/70 via-black/40 to-transparent
                      text-white px-3 py-2">
                      <div className="text-[11px] md:text-sm leading-snug line-clamp-2">
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

      {open && <LightboxPortal item={items[startIndex]} onClose={handleClose} />}
    </>
  );
}

/* ---------- Lightbox (เต็มจอ) ---------- */
function LightboxPortal({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center"
         onClick={onClose}>
      {/* ปุ่มกากบาท */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 rounded-full p-3 bg-white/95 hover:bg-white shadow-lg"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {/* รูปเต็มจอ */}
      <div className="w-screen h-screen flex items-center justify-center"
           onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.alt || ""}
          className="w-screen h-screen object-contain"
          draggable={false}
        />
        {(item.caption || item.alt) && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
            <div className="mx-auto max-w-[90vw] rounded-md bg-black/60 text-white text-sm md:text-base px-3 py-2">
              {item.caption || item.alt}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
