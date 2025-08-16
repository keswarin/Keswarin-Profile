// src/components/ui/animated-section.tsx

import React from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
}

export const AnimatedSection = ({ children }: AnimatedSectionProps) => {
  const { ref, inView } = useInView({
    // `triggerOnce: true` หมายถึง animation จะทำงานแค่ครั้งแรกที่เห็น
    triggerOnce: true,
    // `threshold: 0.1` หมายถึง component ต้องปรากฏบนจอ 10% ก่อน animation ถึงจะเริ่ม
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      // ใช้ `inView` เพื่อเปลี่ยน class ของ CSS
      // ตอนยังไม่เห็น: จะโปร่งใส (opacity-0) และเลื่อนลงเล็กน้อย (translate-y-5)
      // ตอนเห็นแล้ว: จะทึบ (opacity-100) และกลับมาที่ตำแหน่งเดิม (translate-y-0)
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {children}
    </div>
  );
};