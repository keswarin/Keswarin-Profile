// src/components/ui/ImageSlider.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type SliderItem = {
  id: number | string;
  src: string;
  alt?: string;
  caption?: string; // ใช้กับ Activities (Certificates จะปิดได้ด้วย showCaptions=false)
};

type Props = {
  items: SliderItem[];
  heightClass?: string;     // ความสูงของการ์ด เช่น "h-64 md:h-80"
  showCaptions?: boolean;   // โชว์คำบรรยายไหม
  autoplayMs?: number;      // >0 = เล่นอัตโนมัติ, 0 = ปิดออโต้ (ค่าเริ่มต้น 0)
};

export default function ImageSlider({
  items,
  heightClass = "h-64 md:h-80",
  showCaptions = true,
  autoplayMs = 0, // ❗ค่าเริ่มต้นปิดออโต้
}: Props) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const hoverRef = useRef(false);

  const max = items.length;

  const go = (i: number) => {
    // วนรอบซ้าย/ขวาได้
    const next = (i + max) % max;
    setIndex(next);
  };
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // autoplay (ถ้า > 0) + pause on hover
  useEffect(() => {
    if (!autoplayMs || autoplayMs <= 0) return;
    const t = setInterval(() => {
      if (!hoverRef.current) next();
    }, autoplayMs);
    return () => clearInterval(t);
  }, [autoplayMs, index]); // eslint-disable-line

  // keyboard nav บนคอมโพเนนต์
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return; // เมื่อเปิดภาพใหญ่ให้จัดการใน Lightbox แทน
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, index]); // eslint-disable-line

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full select-none`}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {/* viewport */}
      <div className={`overflow-hidden rounded-xl bg-white shadow ${heightClass}`}>
        {/* track */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${index * 100}%)`, width: `${items.length * 100}%` }}
        >
          {items.map((it, i) => (
            <div key={it.id} className="w-full shrink-0 h-full relative">
              {/* รูป (กดเพื่อเปิด Lightbox) */}
              <button
                type="button"
                onClick={() => openLightbox(i)}
                className="absolute inset-0 w-full h-full bg-black/2"
                aria-label="Open image"
              >
                <img
                  src={it.src}
                  alt={it.alt || ""}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </button>

              {/* คำบรรยายภาพ (เปิด/ปิดได้ด้วย showCaptions) */}
              {showCaptions && (it.caption || it.alt) && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0">
                  <div className="mx-3 mb-3 rounded-lg bg-black/55 text-white text-xs md:text-sm px-3 py-2">
                    {it.caption || it.alt}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ปุ่มซ้าย/ขวา */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow focus:outline-none"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow focus:outline-none"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* จุดบอกสไลด์ */}
      <div className="absolute inset-x-0 -bottom-7 flex items-center justify-center gap-3">
        {items.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all h-2 rounded-full ${
                active ? "w-8 bg-gray-800" : "w-2 bg-gray-400/70"
              }`}
            />
          );
        })}
      </div>

      {/* Lightbox (ภาพใหญ่เต็มจอ) */}
      {lightboxOpen && (
        <Lightbox
          items={items}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

/* ---------------- Lightbox ---------------- */
function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: SliderItem[];
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
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* ปิด */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 rounded-full p-3 bg-white/95 hover:bg-white shadow-lg"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {/* ปุ่มใน Lightbox */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/90 hover:bg-white shadow"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 bg-white/90 hover:bg-white shadow"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* รูปใหญ่ */}
      <div
        className="w-screen h-screen flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={items[idx].src}
          alt={items[idx].alt || ""}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </div>,
    document.body
  );
}
