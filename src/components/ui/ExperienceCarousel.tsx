import React, { useCallback, useEffect, useMemo, useState } from "react";
// ✅ useEmblaCarousel มาจาก react-wrapper
import useEmblaCarousel from "embla-carousel-react";
// ✅ types ต้องมาจาก core package
import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

export type ExperienceItemData = {
  id: number | string;
  title: string;
  company?: string;  // คำอธิบาย/บรรทัดรอง
  period?: string;   // ช่วงเวลา
};

type Props = {
  items: ExperienceItemData[];
  options?: EmblaOptionsType;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

export const ExperienceCarousel: React.FC<Props> = ({ items, options }) => {
  // ค่าพื้นฐานให้ลื่น + snap ทีละใบตรงกลาง
  const emblaOptions = useMemo<EmblaOptionsType>(
    () => ({
      align: "center",
      containScroll: "trimSnaps",
      dragFree: false,
      slidesToScroll: 1,
      skipSnaps: false,
      loop: false,
      inViewThreshold: 0.6,
      ...options,
    }),
    [options]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [WheelGesturesPlugin()]);
  const [scales, setScales] = useState<number[]>(() => items.map(() => 0.95));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  // อัปเดต scale/opacity/shadow ตามความใกล้ศูนย์กลาง
  const updateScales = useCallback(() => {
    if (!emblaApi) return;
    const progress = emblaApi.scrollProgress();  // 0..1
    const snaps = emblaApi.scrollSnapList();     // 0..1 สำหรับแต่ละสไลด์

    const nextScales = snaps.map((snap) => {
      const diff = Math.abs(progress - snap);            // ใกล้ศูนย์กลาง = diff เล็ก
      const scale = clamp(1.10 - diff * 0.5, 0.88, 1.10); // 1.10 กลางใหญ่, 0.88 ข้างเล็ก
      return scale;
    });
    setScales(nextScales);
  }, [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevEnabled(api.canScrollPrev());
    setNextEnabled(api.canScrollNext());
    updateScales();
  }, [updateScales]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", updateScales);
    emblaApi.on("resize", updateScales);
  }, [emblaApi, onSelect, updateScales]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      {/* viewport */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        aria-label="Experience Carousel"
      >
        {/* container */}
        <div className="flex gap-6 px-2 py-4">
          <div aria-hidden className="shrink-0 w-[8vw]" />
          {items.map((it, i) => (
            <article
              key={it.id}
              className="
                shrink-0 bg-white rounded-2xl p-5
                transition-[transform,opacity,box-shadow] duration-200 will-change-transform
                w-[85vw] sm:w-[60vw] md:w-[46vw] lg:w-[34vw] xl:w-[28vw]
              "
              style={{
                transform: `scale(${scales[i] ?? 0.95})`,
                opacity: String(0.7 + (scales[i] ? (scales[i] - 0.88) / (1.10 - 0.88) * 0.3 : 0)),
                boxShadow: `0 10px ${10 + (scales[i] ? (scales[i] - 0.88) / (1.10 - 0.88) * 25 : 0)}px rgba(0,0,0,0.15)`,
              }}
            >
              {it.period && <div className="text-xs text-gray-500 mb-2">{it.period}</div>}
              <h3 className="text-lg font-semibold leading-snug text-gray-900">{it.title}</h3>
              {it.company && <p className="text-sm text-gray-600 mt-2">{it.company}</p>}
            </article>
          ))}
          <div aria-hidden className="shrink-0 w-[8vw]" />
        </div>
      </div>

      {/* ปุ่มเลื่อนซ้าย/ขวา */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1">
        <button
          onClick={scrollPrev}
          disabled={!prevEnabled}
          aria-label="Previous"
          className="pointer-events-auto rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ←
        </button>
        <button
          onClick={scrollNext}
          disabled={!nextEnabled}
          aria-label="Next"
          className="pointer-events-auto rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>

      {/* จุดสถานะ (optional) */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === selectedIndex ? "w-6 bg-gray-800" : "w-2 bg-gray-400/60"}`}
          />
        ))}
      </div>
    </div>
  );
};
