import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton = () => {
  // สร้าง state เพื่อตรวจสอบว่าควรแสดงปุ่มหรือไม่
  const [isVisible, setIsVisible] = useState(false);

  // ฟังก์ชันนี้จะถูกเรียกทุกครั้งที่มีการ scroll
  const toggleVisibility = () => {
    // ถ้าเลื่อนลงมามากกว่า 300px ให้แสดงปุ่ม
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // ฟังก์ชันสำหรับเลื่อนกลับไปบนสุด
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // ทำให้การเลื่อนนุ่มนวล
    });
  };

  // useEffect จะทำงานคล้ายๆ componentDidMount และ componentWillUnmount
  useEffect(() => {
    // เพิ่ม Event Listener เพื่อคอยดักจับการ scroll
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup function: จะถูกเรียกเมื่อ component ถูกทำลาย
    // เพื่อลบ Event Listener ออก ป้องกัน memory leak
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // array ว่าง หมายถึง effect นี้จะทำงานแค่ครั้งเดียวตอน component ถูกสร้าง

  return (
    // VVVVVV แก้ไขบรรทัดนี้ VVVVVV
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      {/* ใช้ isVisible เพื่อกำหนดว่าจะแสดงปุ่มหรือไม่ */}
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="bg-portfolio-blue text-portfolio-brown p-3 rounded-full shadow-lg hover:bg-portfolio-blue/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-portfolio-blue transition-all duration-300"
          aria-label="Go to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};