// src/components/ui/HorizontalExperience.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ข้อมูลผลงานของคุณ
const experiences = [
  {
    id: 1,
    title: 'Smart Tram Service System for Chiang Mai Rajabhat University',
    description: 'Developed a real-time tram tracking web application using Flutter and Firebase to solve uncertain wait times.',
    period: 'June 2024 - Aug 2024',
    bgColor: 'from-blue-500 to-blue-700',
  },
  {
    id: 2,
    title: 'Best Presenter Award, 3rd SCI-TECH CMRU Conference',
    description: 'Achieved the award after presenting the "Smart Tram Service System" project to a panel of judges and a live audience.',
    period: 'July 2024',
    bgColor: 'from-green-500 to-green-700',
  },
  {
    id: 3,
    title: 'Committee Member, Faculty of Science and Technology',
    description: 'Managed membership fee collections and financial records for campus events, ensuring transparency.',
    period: '2022 – Present',
    bgColor: 'from-purple-500 to-purple-700',
  },
];

// Component หลัก
export const HorizontalExperience = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // คำนวณการเลื่อนแนวนอนของ "ทั้งกลุ่ม" การ์ด
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.66%']);

  return (
    // 3. ลดความสูงของพื้นที่ scroll ลงเหลือ 150vh
    <section ref={targetRef} className="relative h-[150vh] bg-black">
      <div className="sticky top-0 flex h-screen w-full flex-col items-start justify-start overflow-hidden">
        
        {/* 1. จัดหัวข้อชิดซ้ายและขยายใหญ่ขึ้น */}
        <div className="w-full px-6 lg:px-8 pt-16">
          <h2 className="text-5xl font-bold text-white mb-2">My Experience</h2>
          <p className="text-gray-400">Slide to explore my journey.</p>
        </div>
        
        <div className="flex-1 flex items-center w-full">
            <motion.div 
              style={{ x }} 
              className="flex items-center gap-8 px-[calc(50vw-225px)]" // 225px คือครึ่งหนึ่งของ 450px
            >
              {experiences.map((exp, index) => (
                <Card experience={exp} key={exp.id} index={index} scrollYProgress={scrollYProgress} />
              ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
};

// Component สำหรับการ์ดแต่ละใบ
const Card = ({ experience, index, scrollYProgress }) => {
  const totalCards = experiences.length;
  const cardStart = index / totalCards;
  const cardEnd = cardStart + (1 / totalCards);

  // 2. แก้ไขการคำนวณ Animation ให้ถูกต้องและสมูท
  const scale = useTransform(
    scrollYProgress,
    [cardStart - 0.2, cardStart, cardEnd, cardEnd + 0.1],
    [0.75, 1, 1, 0.75],
    { clamp: true }
  );

  const opacity = useTransform(
    scrollYProgress,
    [cardStart - 0.15, cardStart, cardEnd, cardEnd + 0.15],
    [0.5, 1, 1, 0.5],
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
      }}
      className={`relative h-[450px] w-[450px] shrink-0 rounded-2xl bg-gradient-to-br ${experience.bgColor} p-8 text-white shadow-2xl flex flex-col justify-between`}
    >
        <div>
            <p className="text-sm font-light text-gray-200">{experience.period}</p>
            <h3 className="text-2xl font-bold mt-2">{experience.title}</h3>
            <p className="text-base text-gray-100 mt-4 leading-relaxed">{experience.description}</p>
        </div>
        <div className="flex justify-end">
            <ArrowRight className="h-8 w-8 text-white/50" />
        </div>
    </motion.div>
  );
};