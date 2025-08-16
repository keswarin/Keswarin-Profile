import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/ui/ContactButton";
import { TechStackItem } from "@/components/ui/tech-stack-item";
import { ExperienceItem } from "@/components/ui/experience-item";
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';
import { AnimatedSection } from '@/components/ui/animated-section';
import { HorizontalExperience } from '@/components/ui/HorizontalExperience';
import { InteractiveCarousel } from '@/components/ui/InteractiveCarousel';
import { InteractiveCertificateCarousel } from '@/components/ui/InteractiveCertificateCarousel';
import { ShootingStarBackground } from '@/components/ui/ShootingStarBackground'; // Component ใหม่
import { ExperienceSection } from '@/components/ui/ExperienceSection'; // Component ใหม่
import { useLenis } from '@/hooks/useLenis';
import { motion } from 'framer-motion';
import {
  MapPin,
  Github,
  Facebook,
  Instagram,
  Phone,
  Mail,
  Download,
  Camera,
  Award
} from "lucide-react";
import profileImage from "@/assets/image.png";

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
const educations = [
  {
    id: 1,
    title: "Bachelor of Science in Computer Science",
    institution: "Chiang Mai Rajabhat University",
    period: "2022 - Present",
  },
  {
    id: 2,
    title: "Science and Technology Program",
    institution: "Thungchang School",
    period: "2016 - 2022",
  },
];

const activities = [
    {
        id: 1,
        src: activityImage1,
        alt: "ภาพตอนนำเสนอผลงาน",
        caption: "นำเสนอโปรเจกต์ Smart Tram Service ในงานประชุมวิชาการ"
    },
    {
        id: 2,
        src: activityImage2,
        alt: "ภาพรับรางวัล",
        caption: "รับรางวัล Best Presenter Award"
    },
    {
        id: 3,
        src: activityImage3,
        alt: "ภาพกิจกรรมคณะ",
        caption: "กิจกรรมคณะวิทยาศาสตร์และเทคโนโลยี"
    },
    {
        id: 4,
        src: activityImage4,
        alt: "ภาพกิจกรรมอื่นๆ",
        caption: "คำอธิบายรูปภาพที่ 4"
    },
];

const certificates = [
    { id: 1, src: certImage1, alt: "เกียรติบัตร 1" },
    { id: 2, src: certImage2, alt: "เกียรติบัตร 2" },
    { id: 3, src: certImage3, alt: "เกียรติบัตร 3" },
    { id: 4, src: certImage4, alt: "เกียรติบัตร 4" },
    { id: 5, src: certImage5, alt: "เกียรติบัตร 5" },
    { id: 6, src: certImage6, alt: "เกียรติบัตร 6" },
];

// Animation Variants for Stagger Effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
        duration: 0.5,
        ease: "easeOut"
    }
  },
};

const Index = () => {
  useLenis();

  return (
    <div className="min-h-screen text-portfolio-text">
      <ShootingStarBackground />
      <div className="flex flex-col lg:flex-row">
        
        <aside className="lg:w-80 bg-portfolio-brown p-6 lg:min-h-screen text-white lg:sticky top-0 h-full">
            <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-portfolio-blue">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover"/>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Keswarin Kositthai</h1>
              <p className="text-sm text-gray-300 leading-relaxed">
                A great design is not just seen, it's felt. It makes the complex simple, the impossible usable, and the digital world feel a little more human.
              </p>
              <Button className="mt-4 bg-portfolio-blue text-portfolio-brown font-bold hover:bg-portfolio-blue/80" size="sm" asChild>
                <a href="/resume.pdf" download><Download className="mr-2 h-4 w-4"/>Download Resume</a>
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">Based in:</span>
                <span className="font-medium text-white">Chiang Mai, Thailand</span>
              </div>
              
              <ContactButton icon={Github} label="keswarin" href="https://github.com/keswarin" hoverBgColor="bg-gray-800" />
              <ContactButton icon={Facebook} label="แอล(keswarin)" href="https://www.facebook.com/x.l.121487/" hoverBgColor="bg-blue-600" />
              <ContactButton icon={Instagram} label="_chongeun" href="https://www.instagram.com/_chongeun/" hoverBgColor="bg-pink-500" />
              <ContactButton icon={Mail} label="keswarin.th@gmail.com" href="mailto:keswarin.th@gmail.com" hoverBgColor="bg-red-500" />
              <ContactButton icon={Phone} label="092 385 1336" href="tel:092 385 1336" hoverBgColor="bg-green-500" />

            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                <TechStackItem name="CSS" /><TechStackItem name="PHP" /><TechStackItem name="HTML" /><TechStackItem name="JavaScript" /><TechStackItem name="Flutter" /><TechStackItem name="GitHub" /><TechStackItem name="Figma" /><TechStackItem name="Firebase" />
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 w-full max-w-full p-0 lg:p-0 min-w-0">
          
          <HorizontalExperience />
          
          <div className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
            <AnimatedSection>
              <section className="bg-portfolio-card-bg/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-portfolio-text">Education</h2>
                
                <div className="relative border-l-2 border-gray-200/20 pl-6 space-y-8">
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
              <section className="bg-portfolio-card-bg/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-6">
                  <Camera className="h-6 w-6 text-portfolio-text" />
                  <h2 className="text-2xl font-bold text-portfolio-text">Activities</h2>
                </div>
                
                <InteractiveCarousel activities={activities} />

              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section className="bg-portfolio-card-bg/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="h-6 w-6 text-portfolio-text" />
                  <h2 className="text-2xl font-bold text-portfolio-text">Certificates</h2>
                </div>
                
                <InteractiveCertificateCarousel certificates={certificates} />
                
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