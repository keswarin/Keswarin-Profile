// src/components/ui/ExperienceSection.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';

// --- ข้อมูล Experience ของคุณ ---
const experiences = [
  {
    id: 1,
    title: 'Smart Tram Service System for Chiang Mai Rajabhat University',
    description: 'Developed a real-time tram tracking web application using Flutter and Firebase to solve uncertain wait times.',
    period: 'June 2024 - Aug 2024',
    bgColor: '#3B82F6', // สีน้ำเงิน
  },
  {
    id: 2,
    title: 'Best Presenter Award, 3rd SCI-TECH CMRU Conference',
    description: 'Achieved the award after presenting the "Smart Tram Service System" project to a panel of judges and a live audience.',
    period: 'July 2024',
    bgColor: '#10B981', // สีเขียว
  },
  {
    id: 3,
    title: 'Committee Member (Top 7) of the Faculty of Science and Technology, Chiang Mai Rajabhat University',
    description: '"This project developed a real-time tram tracking system for Chiang Mai Rajabhat University, Mae Rim Campus. The system addresses the issue where users previously could not reliably know the driver’s exact location, and it was designed to fit the specific context and needs of the university."',
    period: '2020 – Present',
    bgColor: '#8B5CF6', // สีม่วง
  },
];

const TOTAL_CARDS = experiences.length;

// --- Component หลักที่รวมทุกอย่างไว้ด้วยกัน ---
export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] });

  const scrollToStart = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // 1. แก้ไข Section หลัก ให้พื้นหลังเป็นสีดำสนิท
    <section ref={sectionRef} className="bg-black text-white">
      {/* --- Navigation Bar (เหลือปุ่มเดียว) --- */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-sm p-4 text-center">
        <Button
          className="bg-white text-black font-bold hover:bg-gray-200"
          onClick={scrollToStart}
        >
          Experience
        </Button>
      </div>

      {/* --- ส่วนแสดงผลการ์ด --- */}
      <div ref={scrollRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            {experiences.map((exp, index) => (
              <Card
                experience={exp}
                key={exp.id}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Component สำหรับการ์ดแต่ละใบ ---
const Card = ({ experience, index, scrollYProgress }) => {
  const cardStart = index / TOTAL_CARDS;
  const cardEnd = (index + 1) / TOTAL_CARDS;

  // 2. ปรับการคำนวณ scale ให้นุ่มนวลขึ้น
  const scale = useTransform(scrollYProgress,
    [cardStart, cardEnd],
    [1, 0.8],
    { clamp: false } // เพิ่ม clamp: false เพื่อความต่อเนื่อง
  );
  
  // 3. จัดตำแหน่งการ์ดให้อยู่ตรงกลางเสมอ
  const y = useTransform(scrollYProgress,
    [cardStart, cardEnd],
    ['0%', '-50%']
  );

  return (
    <motion.div
      style={{
        scale,
        y, // ใช้ y แทน translateY เพื่อประสิทธิภาพที่ดีกว่า
        backgroundColor: experience.bgColor,
        transformOrigin: 'top center',
        // 4. ทำให้การ์ดใบล่าสุด (index 0) อยู่บนสุดเสมอ
        zIndex: TOTAL_CARDS - index, 
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl min-h-[18rem] rounded-2xl p-8 shadow-2xl flex flex-col justify-center"
    >
      <p className="text-sm font-light text-gray-200">{experience.period}</p>
      <h3 className="text-2xl font-bold text-white mt-2">{experience.title}</h3>
      <p className="text-base text-gray-100 mt-4 leading-relaxed">{experience.description}</p>
    </motion.div>
  );
};