// src/components/ui/CoverflowCarousel.tsx
import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import './CoverflowCarousel.css'

const CoverflowCarousel = ({ items, isExperience = false, autoplayEnabled = true }) => {
  // เราจะใช้ Autoplay เฉพาะเมื่อ autoplayEnabled เป็น true
  const plugins = autoplayEnabled ? [Autoplay({ delay: 5000, stopOnInteraction: true })] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, plugins);
  
  const [scaleValues, setScaleValues] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollSnaps = emblaApi.scrollSnapList();

    const newScaleValues = scrollSnaps.map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - engine.location.get();
      const tweenValue = 1 - Math.abs(diffToTarget);
      return Math.max(0.7, tweenValue); // คำนวณ scale
    });
    setScaleValues(newScaleValues);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  const openLightbox = useCallback((index) => {
    if (items[index].src) { // เปิด Lightbox เฉพาะเมื่อเป็นรูปภาพ
        setLightboxIndex(index);
        setLightboxOpen(true);
    }
  }, [items]);

  const slides = items.filter(item => item.src).map(item => ({ src: item.src }));

  return (
    <>
      <div className="embla-coverflow">
        <div className="embla-coverflow__viewport" ref={emblaRef}>
          <div className="embla-coverflow__container">
            {items.map((item, index) => (
              <div className="embla-coverflow__slide" key={item.id} onClick={() => openLightbox(index)}>
                <div 
                  className={`embla-coverflow__slide__inner ${isExperience ? 'experience-card' : ''}`}
                  style={{ transform: `scale(${scaleValues[index] || 0.7})` }}
                >
                  {item.src ? (
                    <img className="embla-coverflow__slide__img" src={item.src} alt={item.alt} />
                  ) : (
                    <div className="p-6 text-left">
                        <p className="text-sm text-gray-500">{item.period}</p>
                        <h3 className="text-xl font-bold mt-1 text-gray-900">{item.title}</h3>
                        <p className="text-base text-gray-600 mt-2">{item.company}</p>
                    </div>
                  )}
                  {item.caption && (
                     <div className="embla-coverflow__slide__caption"><p>{item.caption}</p></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
      />
    </>
  )
}

export default CoverflowCarousel;
