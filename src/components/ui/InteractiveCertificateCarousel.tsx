// src/components/ui/InteractiveCertificateCarousel.tsx

import React, { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const InteractiveCertificateCarousel = ({ certificates }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // กลับมาใช้การตั้งค่า Autoplay ที่เรียบง่ายและทำงานถูกต้อง
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
    },
    [
      Autoplay({
        delay: 900,
        stopOnInteraction: false, // **สำคัญ:** หยุดเล่นเมื่อผู้ใช้เริ่มลาก
        stopOnMouseEnter: false  // หยุดเล่นเมื่อเอาเมาส์ไปวางบนสไลด์
      })
    ]
  );

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const slides = certificates.map(cert => ({ src: cert.src }));

  return (
    <>
      <div className="overflow-hidden rounded-lg cursor-pointer" ref={emblaRef}>
        <div className="flex">
          {certificates.map((cert, index) => (
            <div 
              className="relative flex-grow-0 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-4" 
              key={cert.id}
              onClick={() => openLightbox(index)}
            >
              <div className="overflow-hidden rounded-lg group">
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className="w-full h-48 object-contain bg-white/10 p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
      />
    </>
  );
};