// src/components/ui/StackedExperience.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// 1. สร้างข้อมูลผลงานของคุณในรูปแบบ Array of Objects
const experiences = [
  {
    id: 1,
    title: "Smart Tram Service System for Chiang Mai Rajabhat University",
    description: "Developed a real-time tram tracking web application using Flutter and Firebase...",
    color: "#a0b5f7", // สีพื้นหลังของการ์ด
  },
  {
    id: 2,
    title: "Best Presenter Award, 3rd SCI-TECH CMRU Conference",
    description: "Achieved the award after presenting the 'Smart Tram System' project...",
    color: "#b4f0b4",
  },
  {
    id: 3,
    title: "Committee Member, Faculty of Science and Technology",
    description: "Managed membership fee collections and financial records for campus events...",
    color: "#f7d0a0",
  },
];

// Component หลักสำหรับทำ Animation
export const StackedExperience = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  return (
    <section ref={targetRef} className="relative h-[200vh]"> {/* เพิ่มความสูงเพื่อให้มีพื้นที่ scroll */}
      <div className="sticky top-0 h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
        <div className="flex flex-col gap-4">
          {experiences.map((exp, index) => (
            <Card key={exp.id} experience={exp} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Component สำหรับการ์ดแต่ละใบ
const Card = ({ experience, index, scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1 - (experiences.length - index) * 0.05, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [-index * 50, 0]);

  return (
    <motion.div
      style={{
        scale,
        translateY,
        backgroundColor: experience.color,
      }}
      className="h-48 w-[500px] rounded-lg p-6 text-black"
    >
      <h3 className="font-bold text-lg">{experience.title}</h3>
      <p className="text-sm mt-2">{experience.description}</p>
    </motion.div>
  );
};