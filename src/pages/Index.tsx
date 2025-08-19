// src/pages/Index.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/ui/ContactButton";
import { TechStackItem } from "@/components/ui/tech-stack-item";
import { ExperienceItem } from "@/components/ui/experience-item";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ExperienceCarousel } from "@/components/ui/ExperienceCarousel";
import MarqueeGallery from "@/components/ui/MarqueeGallery";
import { useLenis } from "@/hooks/useLenis";
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
  Music,
  Mic2,
  Dumbbell,
  CalendarDays,
  User,
} from "lucide-react";

import profileImage from "@/assets/profile-image.jpg";

// --- Activities images ---
import activityImage1 from "@/assets/p1.jpg";
import activityImage2 from "@/assets/p2.jpg";
import activityImage3 from "@/assets/p3.jpg";
import activityImage4 from "@/assets/p4.jpg";
import activityImage5 from "@/assets/p5.png";

// --- Certificates images ---
import certImage1 from "@/assets/o1.png";
import certImage2 from "@/assets/o2.png";
import certImage3 from "@/assets/o3.png";
import certImage4 from "@/assets/o4.png";
import certImage5 from "@/assets/o5.png";
import certImage6 from "@/assets/o6.png";
import certImage7 from "@/assets/o7.png";

// ---------- Data ----------
const experiences = [
  {
    id: 1,
    title:
      "Smart Tram Management Information System for hiang Mai Rajabhat niversity, Mae Rim Campus",
    company:
      "I presented my research at the SCI-TECH CMRU Conference 2025 on the topic “Smart Tram Management Information System for Chiang Mai Rajabhat University, Mae Rim Campus.The system was designed with core functionalities that allow users to track drivers in real time and send ride requests directly to drivers, enabling drivers to know the user’s location. The project was developed using Firebase as the database and Flutter (Dart language) as the development framework.",
    period: "June 2025 - July 2025",
  },
  {
    id: 2,
    title: "Best Presenter Award, 3rd SCI-TECH CMRU Conference",
    company:
      'Best Presenter Award, SCI-TECH CMRU Conference 2025 – Presented research on “Smart Tram Management Information System for Chiang Mai Rajabhat University, Mae Rim Campus” to three experts and participants.',
    period: "July 2025",
  },
  {
    id: 3,
    title:
      "Committee Member (Top 7) of the Faculty of Science and Technology, Chiang Mai Rajabhat University.",
    company:
      "I was responsible for collecting membership fees during faculty and university activities, and for managing financial records with transparency across various faculty events.",
    period: "2022 – Present",
  },
  {
    id: 4,
    title: "IoT Project: Smart Pet Feeding Device with Blynk IoT.",
    company:
      "I developed an automatic pet feeder with Arduino hardware, enabling feeding schedules to be controlled through a mobile application integrated with Blynk IoT.",
    period: "October 2024",
  },
];

const educations = [
  {
    id: 1,
    title: "Faculty of Science and Technology,Computer Science",
    institution: "Chiang Mai Rajabhat University",
    period: "2022 - Present",
  },
  {
    id: 2,
    title: "Science and Technology",
    institution: "Thungchang School",
    period: "2018- 2021",
  },
];

// Activities with captions
const activities = [
  {
    id: 1,
    src: activityImage1,
    alt: "ภาพประชุมทีม",
    caption: "Best Presenter Award – SCI-TECH CMRU Conference 2025",
  },
  {
    id: 2,
    src: activityImage2,
    alt: "ภาพบรรยายโครงการ",
    caption: "Presented at SCI-TECH CMRU Conference 2025",
  },
  {
    id: 3,
    src: activityImage3,
    alt: "รับรางวัล",
    caption:
      "ศึกษาการทำงานในหน่วยงานด้านนวัตกรรมดิจิทัล ณ ศูนย์บริหารจัดการเมืองอัจฉริยะ มหาวิทยาลัยเชียงใหม่",
  },
  {
    id: 4,
    src: activityImage4,
    alt: "กิจกรรมอื่น ๆ",
    caption:
      "ศึกษาการทำงานในสถานประกอบการด้านเทคโนโลยีตอมพิวเตอร์ อุทยานวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยเชียงใหม่",
  },
  {
    id: 5,
    src: activityImage5,
    alt: "ภาพกิจกรรม 5",
    caption: "IoT Project: Smart Pet Feeding Device with Blynk IoT.",
  },
];

const certificates = [
  { id: 1, src: certImage1, alt: "Certificate 1" },
  { id: 2, src: certImage2, alt: "Certificate 2" },
  { id: 3, src: certImage3, alt: "Certificate 3" },
  { id: 4, src: certImage4, alt: "Certificate 4" },
  { id: 5, src: certImage5, alt: "Certificate 5" },
  { id: 6, src: certImage6, alt: "Certificate 6" },
  { id: 7, src: certImage7, alt: "Certificate 7" },
];

const Index = () => {
  useLenis();

  const FULL_NAME_TH = "เกศวรินทร์ โฆษิตไทย";
  const NICKNAME = "แอล";
  const CURRENT_ADDRESS =
    "รอยัลแกรนด์ฮิลล์ ตำบลช้างเผือก อำเภอเมืองเชียงใหม่ เชียงใหม่ 50300";

  const DOB_ISO = "2003-11-12";
  const dob = new Date(DOB_ISO);
  const age = Math.floor(
    (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.2425)
  );
  const dobText = dob.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const neumorphismClass =
    "bg-[#E0E5EC] rounded-2xl p-6 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]";

  const StaticHobbyCard: React.FC<{
    icon: React.ComponentType<any>;
    label: string;
  }> = ({ icon: Icon, label }) => (
    <div className="group relative rounded-2xl p-[2px] bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-300/20 cursor-default select-none">
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl blur-lg opacity-40 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400"
      />
      <div className="relative rounded-[14px] bg-white/90 backdrop-blur p-6 flex items-center justify-between gap-4 w-[260px] h-[96px]">
        <div className="flex items-center gap-3">
          <Icon className="h-7 w-7 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#E0E5EC] text-gray-800">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside
          className={`lg:w-96 m-4 rounded-2xl lg:sticky top-4 self-start ${neumorphismClass}`}
        >
          <div className="relative z-10 h-full flex flex-col p-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-gray-300">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Keswarin Kositthai
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">
                  A great design is not just seen, it's felt. It makes the
                  complex simple, the impossible usable, and the digital world
                  feel a little more human.
                </p>

                <div className="space-y-3 mt-4 text-left">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">Thai name:</span>
                    <span className="font-medium text-gray-800">
                      {FULL_NAME_TH}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">Nickname:</span>
                    <span className="font-medium text-gray-800">
                      {NICKNAME}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">Birthday:</span>
                    <span className="font-medium text-gray-800">
                      {dobText}
                    </span>
                    <span className="ml-2 inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 text-xs font-semibold text-gray-700 shadow-sm border border-gray-200">
                      {age} ปี
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-500 shrink-0">
                      Current address:
                    </span>
                    <span className="font-medium text-gray-800 break-words">
                      {CURRENT_ADDRESS}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contacts */}
              <div className="space-y-3">
                <ContactButton
                  icon={Github}
                  label="keswarin"
                  href="https://github.com/keswarin"
                  hoverBgColor="bg-gray-800"
                />
                <ContactButton
                  icon={Facebook}
                  label="แอล(keswarin)"
                  href="https://www.facebook.com/x.l.121487/"
                  hoverBgColor="bg-blue-600"
                />
                <ContactButton
                  icon={Instagram}
                  label="_chongeun"
                  href="https://www.instagram.com/_chongeun/"
                  hoverBgColor="bg-pink-500"
                />
                <ContactButton
                  icon={Mail}
                  label="keswarin.th@gmail.com"
                  href="mailto:keswarin.th@gmail.com"
                  hoverBgColor="bg-red-500"
                />
                <ContactButton
                  icon={Phone}
                  label="092 355 1336"
                  href="tel:092 355 1336"
                  hoverBgColor="bg-green-500"
                />
              </div>

              {/* Skills & Tools */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Skills & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  <TechStackItem name="CSS" />
                  <TechStackItem name="PHP" />
                  <TechStackItem name="HTML" />
                  <TechStackItem name="JavaScript" />
                  <TechStackItem name="Flutter" />
                  <TechStackItem name="GitHub" />
                  <TechStackItem name="Figma" />
                  <TechStackItem name="Firebase" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 w-full max-w-5xl mx-auto p-6 lg:p-8 min-w-0">
          <div className="space-y-8">
            {/* Experience */}
            <AnimatedSection>
              <section className={neumorphismClass}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  My Experience
                </h2>
                <div
                  data-lenis-prevent
                  data-lenis-prevent-wheel
                  data-lenis-prevent-touch
                >
                  <ExperienceCarousel items={experiences} />
                </div>
              </section>
            </AnimatedSection>

            {/* Education */}
            <AnimatedSection>
              <section className={neumorphismClass}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Education
                </h2>
                <div className="relative border-l-2 border-gray-300 pl-6 space-y-8">
                  {educations.map((edu) => (
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

            {/* Activities – Marquee + Lightbox + Captions */}
            <AnimatedSection>
              <section className={neumorphismClass}>
                <div className="flex items-center gap-2 mb-6">
                  <Camera className="h-6 w-6 text-gray-800" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Activities
                  </h2>
                </div>
                <MarqueeGallery
                  items={activities}
                  heightClass="h-64 md:h-80"
                  speed={60}
                  gap={24}
                  pauseOnHover={true}
                  showCaptions={true}
                />
              </section>
            </AnimatedSection>

            {/* Certificates – Marquee + Lightbox + No captions */}
            <AnimatedSection>
              <section className={neumorphismClass}>
                <div className="flex items-center gap-2 mb-6">
                  <Award className="h-6 w-6 text-gray-800" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Certificates
                  </h2>
                </div>
                <MarqueeGallery
                  items={certificates}
                  heightClass="h-56 md:h-72"
                  speed={60}
                  gap={24}
                  pauseOnHover={true}
                  showCaptions={false}
                />
              </section>
            </AnimatedSection>

            {/* Hobbies & Interests */}
            <AnimatedSection>
              <section className={neumorphismClass}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Hobbies & Interests
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StaticHobbyCard icon={Music} label="Music" />
                  <StaticHobbyCard icon={Mic2} label="Podcasts" />
                  <StaticHobbyCard icon={Dumbbell} label="exercise" />
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
