// src/hooks/useLenis.js

import { useEffect } from 'react'; // Import 'useEffect' จาก React
import Lenis from '@studio-freight/lenis';

// เราสร้างฟังก์ชันชื่อ 'useLenis' ซึ่งเป็น Custom Hook ของเรา
export const useLenis = () => {
  // 'useEffect' คือ Hook ของ React ที่จะรันโค้ดข้างใน 1 ครั้ง
  // หลังจากที่ Component ถูกวาดบนหน้าจอแล้ว (เหมือนกับ "เมื่อทุกอย่างพร้อม")
  useEffect(() => {
    
    // 1. สร้าง Instance ของ Lenis
    // เราสร้าง object 'lenis' ขึ้นมาเพื่อควบคุมการ scroll ทั้งหมด
    // เราสามารถใส่ options เพิ่มเติมได้ เช่น smoothWheel: true เพื่อความนุ่มนวล
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // 2. สร้างฟังก์ชัน Loop สำหรับ Animation
    // 'requestAnimationFrame' (raf) คือฟังก์ชันของเบราว์เซอร์ที่ออกแบบมาเพื่อ
    // การทำ animation โดยเฉพาะ มันจะทำงานก่อนที่เบราว์เซอร์จะวาดเฟรมถัดไป
    // ทำให้ animation ที่ได้นั้นลื่นไหลและไม่กินทรัพยากรเครื่อง
    function raf(time) {
      lenis.raf(time); // สั่งให้ lenis คำนวณตำแหน่ง scroll ใหม่ตามเวลา
      requestAnimationFrame(raf); // วนลูปฟังก์ชันนี้ไปเรื่อยๆ ในทุกๆ เฟรม
    }

    // 3. เริ่ม Animation Loop
    // เราเรียก requestAnimationFrame(raf) เป็นครั้งแรกเพื่อเริ่มวงจร
    requestAnimationFrame(raf);

    // 4. Cleanup Function (สำคัญมาก)
    // ส่วนนี้คือฟังก์ชันที่จะทำงานเมื่อ Component ที่เรียกใช้ Hook นี้ถูกทำลายไป
    // (เช่น เมื่อเปลี่ยนหน้าเว็บ) เราต้องสั่งให้ lenis หยุดทำงานและคืนค่า memory
    // เพื่อป้องกัน "Memory Leak" หรือการที่โปรแกรมกินทรัพยากรเครื่องไปเรื่อยๆ
    return () => {
      lenis.destroy();
    };
    
  }, []); // Array ว่าง [] หมายความว่า useEffect นี้จะทำงานแค่ครั้งเดียวตอนเริ่มต้น
};