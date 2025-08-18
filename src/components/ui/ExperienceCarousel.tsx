// src/components/ui/ExperienceCarousel.tsx

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './ExperienceCarousel.css'; // เราจะสร้างไฟล์ CSS นี้ต่อไป

export const ExperienceCarousel = ({ items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center', // จัดให้อยู่กลาง
  });

  const [scaleValues, setScaleValues] = useState([]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollSnaps = emblaApi.scrollSnapList();

    const newScaleValues = scrollSnaps.map((scrollSnap, index) => {
      // คำนวณระยะห่างของแต่ละสไลด์จากจุดกึ่งกลาง
      let diffToTarget = scrollSnap - engine.location.get();
      // ทำให้ค่า tween อยู่ระหว่าง 0 (ไกลสุด) ถึง 1 (ใกล้สุด/ตรงกลาง)
      const tweenValue = 1 - Math.abs(diffToTarget);
      // กำหนดค่า scale ขั้นต่ำที่ 0.7 และสูงสุดที่ 1
      return Math.max(0.7, tweenValue); 
    });
    setScaleValues(newScaleValues);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div className="embla-exp">
      <div className="embla-exp__viewport" ref={emblaRef}>
        <div className="embla-exp__container">
          {items.map((item, index) => (
            <div className="embla-exp__slide" key={item.id}>
              <div 
                className="embla-exp__slide__inner"
                style={{ transform: `scale(${scaleValues[index] || 0.7})` }}
              >
                <div className="p-6 text-left">
                  <p className="text-sm text-gray-500">{item.period}</p>
                  <h3 className="text-xl font-bold mt-1 text-gray-900">{item.title}</h3>
                  <p className="text-base text-gray-600 mt-2">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
