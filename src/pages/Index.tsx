import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/ui/ContactButton";
import { TechStackItem } from "@/components/ui/tech-stack-item";
import { ExperienceItem } from "@/components/ui/experience-item";
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { ExperienceCarousel } from '@/components/ui/ExperienceCarousel'; // Component ใหม่สำหรับ Experience
import CoverflowCarousel from '@/components/ui/CoverflowCarousel';
import { useLenis } from '@/hooks/useLenis';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  MapPin,
  Github,
  Facebook,
  Instagram,
  Phone,
  Mail,
  Download,
  Camera,
  Award,
  Gamepad2,
  Plane,
  Music,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";

// --- Import รูปภาพ ---
import activityImage1 from "@/assets/p1.jpg";
import activityImage2 from "@/assets/p2.jpg";
import activityImage3 from "@/assets/p3.jpg";
import activityImage4 from "@/assets/p4.jpg";

import certImage1 from "@/assets/o1.png";
import certImage2 from "@/assets/o2.png";
import certImage3 from "@/assets/o3.png";
import certImage4 from "@/assets/o4.png";
import certImage5 from "@/assets/o5.png";
import certImage6 from "@/assets/o6.png";

// --- Data for sections ---
const experiences = [
  { id: 1, title: 'Smart Tram Service System for Chiang Mai Rajabhat University', company: 'Developed a real-time tram tracking web application using Flutter and Firebase to solve uncertain wait times.', period: 'June 2024 - Aug 2024' },
  { id: 2, title: 'Best Presenter Award, 3rd SCI-TECH CMRU Conference', company: 'Achieved the award after presenting the "Smart Tram Service System" project to a panel of judges and a live audience.', period: 'July 2024' },
  { id: 3, title: 'Committee Member, Faculty of Science and Technology', company: 'Managed membership fee collections and financial records for campus events, ensuring transparency.', period: '2022 – Present' },
];

const educations = [
  { id: 1, title: "Bachelor of Science in Computer Science", institution: "Chiang Mai Rajabhat University", period: "2022 - Present" },
  { id: 2, title: "Science and Technology Program", institution: "Thungchang School", period: "2016 - 2022" },
];

const activities = [
    { id: 1, src: activityImage1, alt: "ภาพตอนนำเสนอผลงาน", caption: "นำเสนอโปรเจกต์ Smart Tram Service" },
    { id: 2, src: activityImage2, alt: "ภาพรับรางวัล", caption: "รับรางวัล Best Presenter Award" },
    { id: 3, src: activityImage3, alt: "ภาพกิจกรรมคณะ", caption: "กิจกรรมคณะวิทยาศาสตร์และเทคโนโลยี" },
    { id: 4, src: activityImage4, alt: "ภาพกิจกรรมอื่นๆ", caption: "คำอธิบายรูปภาพที่ 4" },
];

const certificates = [
    { id: 1, src: certImage1, alt: "เกียรติบัตร 1" },
    { id: 2, src: certImage2, alt: "เกียรติบัตร 2" },
    { id: 3, src: certImage3, alt: "เกียรติบัตร 3" },
    { id: 4, src: certImage4, alt: "เกียรติบัตร 4" },
    { id: 5, src: certImage5, alt: "เกียรติบัตร 5" },
    { id: 6, src: certImage6, alt: "เกียรติบัตร 6" },
];

const hobbies = [
  { id: 'gaming', icon: Gamepad2, label: "Gaming" },
  { id: 'photo', icon: Camera, label: "Photography" },
  { id: 'travel', icon: Plane, label: "Traveling" },
  { id: 'music', icon: Music, label: "Listening to Music" },
];

const favoriteSongs = [
  { id: 1, artist: 'LANY', title: 'Malibu Nights' },
  { id: 2, artist: 'The 1975', title: 'About You' },
  { id: 3, artist: 'keshi', title: 'SOMEBODY' },
  { id: 4, artist: 'Troye Sivan', title: 'Angel Baby' },
];

// Animation Variants for Stagger Effect (unused, but kept for reference)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Index = () => {
  useLenis();
  const [expandedHobby, setExpandedHobby] = useState<string | null>(null);

  const neumorphismClass = "bg-[#E0E5EC] rounded-2xl p-6 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]";

  return (
    <div className="min-h-screen bg-[#E0E5EC] text-gray-800">
      <div className="flex flex-col lg:flex-row">
        
        <aside className={`lg:w-96 m-4 rounded-2xl lg:sticky top-4 self-start ${neumorphismClass}`}>
          <div className="relative z-10 h-full flex flex-col p-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-gray-300">
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover"/>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Keswarin Kositthai</h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                  A great design is not just seen, it's felt. It makes the complex simple, the impossible usable, and the digital world feel a little more human.
                </p>
                <Button className="mt-4 bg-gray-800 text-white font-bold hover:bg-gray-700" size="sm" asChild>
                  <a href="/resume.pdf" download><Download className="mr-2 h-4 w-4"/>Download Resume</a>
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Based in:</span>
                  <span className="font-medium text-gray-800">Chiang Mai, Thailand</span>
                </div>
                <ContactButton icon={Github} label="keswarin" href="https://github.com/keswarin" hoverBgColor="bg-gray-800" />
                <ContactButton icon={Facebook} label="แอล(keswarin)" href="https://www.facebook.com/x.l.121487/" hoverBgColor="bg-blue-600" />
                <ContactButton icon={Instagram} label="_chongeun" href="https://www.instagram.com/_chongeun/" hoverBgColor="bg-pink-500" />
                <ContactButton icon={Mail} label="keswarin.th@gmail.com" href="mailto:keswarin.th@gmail.com" hoverBgColor="bg-red-500" />
                <ContactButton icon={Phone} label="092 355 1336" href="tel:092 355 1336" hoverBgColor="bg-green-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <TechStackItem name="CSS" /><TechStackItem name="PHP" /><TechStackItem name="HTML" /><TechStackItem name="JavaScript" /><TechStackItem name="Flutter" /><TechStackItem name="GitHub" /><TechStackItem name="Figma" /><TechStackItem name="Firebase" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 w-full max-w-5xl mx-auto p-6 lg:p-8 min-w-0">
          <div className="space-y-8">
            
            <AnimatedSection>
              <section className={neumorphismClass}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">My Experience</h2>
                <ExperienceCarousel items={experiences} />
              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section className={neumorphismClass}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Education</h2>
                <div className="relative border-l-2 border-gray-300 pl-6 space-y-8">
                  {educations.map(edu => (
                    <ExperienceItem 
                      key={edu.id}
                      title={edu.title} 
                      company={edu.institution}
                      period={edu.period} 
                    />
                  ))}
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section className={neumorphismClass}>
                <div className="flex items-center gap-2 mb-6">
                  <Camera className="h-6 w-6 text-gray-800" />
                  <h2 className="text-2xl font-bold text-gray-800">Activities</h2>
                </div>
                <CoverflowCarousel items={activities} />
              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section className={neumorphismClass}>
                <div className="flex items-center gap-2 mb-6">
                  <Award className="h-6 w-6 text-gray-800" />
                  <h2 className="text-2xl font-bold text-gray-800">Certificates</h2>
                </div>
                <CoverflowCarousel items={certificates} />
              </section>
            </AnimatedSection>
            
            <AnimatedSection>
              <section className={neumorphismClass}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Hobbies & Interests</h2>
                
                <div className="relative min-h-[220px] overflow-hidden">
                  
                  <motion.div
                    animate={{ x: expandedHobby === 'music' ? '-100%' : '0%' }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
                  >
                    {hobbies.map(hobby => (
                      hobby.id === 'music' ? (
                        <button 
                          key={hobby.id} 
                          onClick={() => setExpandedHobby('music')}
                          className="bg-gray-100 p-4 rounded-xl flex flex-col justify-between h-28 shadow-inner relative transition-all duration-300 hover:bg-gray-200"
                        >
                          <hobby.icon className="h-8 w-8 text-gray-500 self-start" />
                          <div className="flex justify-between items-end w-full">
                              <span className="text-sm font-medium text-gray-600">{hobby.label}</span>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </button>
                      ) : (
                        <div key={hobby.id} className="bg-gray-100 p-4 rounded-xl flex flex-col items-center justify-center gap-2 h-28 shadow-inner">
                          <hobby.icon className="h-8 w-8 text-gray-500" />
                          <span className="text-sm font-medium text-gray-600">{hobby.label}</span>
                        </div>
                      )
                    ))}
                  </motion.div>

                  <AnimatePresence>
                    {expandedHobby === 'music' && (
                      <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: '0%' }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-full bg-gray-100 p-4 rounded-lg flex flex-col border border-gray-200"
                      >
                        <div className="flex items-center mb-4">
                          <button onClick={() => setExpandedHobby(null)} className="p-1 rounded-full hover:bg-gray-200">
                            <ChevronLeft className="h-6 w-6 text-gray-800" />
                          </button>
                          <h3 className="text-lg font-bold text-gray-900 mx-auto">Favorite Songs</h3>
                        </div>
                        <div className="space-y-2 overflow-y-auto">
                          {favoriteSongs.map(song => (
                            <div key={song.id} className="bg-gray-200 p-2 rounded">
                              <p className="font-bold text-gray-900">{song.title}</p>
                              <p className="text-sm text-gray-500">{song.artist}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>
            </AnimatedSection>
            
          </div>
        </main>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
