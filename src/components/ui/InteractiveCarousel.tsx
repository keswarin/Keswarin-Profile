// src/components/ui/InteractiveCarousel.tsx

import React, { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const InteractiveCarousel = ({ activities }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
    },
    [
      Autoplay({ 
        delay: 1000, 
        stopOnInteraction: false, // หยุดเมื่อผู้ใช้ลาก
        stopOnMouseEnter: false,  // หยุดเมื่อเอาเมาส์ไปวาง
      })
    ]
  );

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  // สร้าง array ของรูปภาพสำหรับ Lightbox
  const slides = activities.map(activity => ({ src: activity.src }));

  return (
    <>
      <div className="overflow-hidden rounded-lg cursor-pointer" ref={emblaRef}>
        <div className="flex">
          {activities.map((activity, index) => (
            // flex-grow-0 flex-shrink-0 คือส่วนสำคัญที่ทำให้แต่ละสไลด์ขนาดเท่ากัน
            <div 
              className="relative flex-grow-0 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-4" 
              key={activity.id}
              onClick={() => openLightbox(index)}
            >
              <div className="overflow-hidden rounded-lg">
                  <img
                    src={activity.src}
                    alt={activity.alt}
                    className="w-full h-56 object-cover" // กำหนดความสูงของรูป
                  />
                  {/* ส่วนของข้อความบรรยายใต้ภาพ */}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-base font-semibold">{activity.caption}</p>
                  </div>
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