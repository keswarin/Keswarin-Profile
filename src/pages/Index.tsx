import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/ui/skill-card";
import { ProjectCard } from "@/components/ui/project-card";
import { 
  Figma, 
  Palette, 
  Users, 
  MousePointer, 
  BarChart3, 
  Code,
  Linkedin,
  Github,
  Mail
} from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";
import project1Image from "@/assets/project-1.jpg";
import project2Image from "@/assets/project-2.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-portfolio-hero-bg py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="flex-shrink-0">
              <img 
                src={profileImage}
                alt="Profile"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
                Alex Chen
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                UX/UI Designer
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                I create meaningful digital experiences that bridge the gap between user needs and business goals. 
                With a passion for clean design and intuitive interfaces, I help brands tell their story through thoughtful design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="rounded-xl">
                  View My Work
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl">
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="bg-portfolio-section-bg py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">About Me</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                With over 5 years of experience in UX/UI design, I specialize in creating user-centered 
                digital solutions that drive engagement and conversion. My approach combines strategic thinking 
                with creative problem-solving to deliver designs that not only look beautiful but also 
                function seamlessly.
              </p>
              <p>
                I believe that great design is invisible – it should feel natural and intuitive to the user. 
                My process involves deep user research, iterative prototyping, and close collaboration with 
                development teams to ensure that the final product exceeds expectations.
              </p>
              <p>
                When I'm not designing, you can find me exploring new design trends, contributing to open-source 
                projects, or mentoring aspiring designers in the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              My Skills & Tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <SkillCard 
                icon={<Figma size={32} />} 
                title="Figma" 
              />
              <SkillCard 
                icon={<Palette size={32} />} 
                title="Design Systems" 
              />
              <SkillCard 
                icon={<Users size={32} />} 
                title="User Research" 
              />
              <SkillCard 
                icon={<MousePointer size={32} />} 
                title="Wireframing" 
              />
              <SkillCard 
                icon={<BarChart3 size={32} />} 
                title="Usability Testing" 
              />
              <SkillCard 
                icon={<Code size={32} />} 
                title="HTML/CSS" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-portfolio-section-bg py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              My Work
            </h2>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <ProjectCard
                image={project1Image}
                title="FinTech Mobile App"
                description="A comprehensive mobile banking app focused on simplifying financial management for millennials. The design emphasizes clarity and trust while maintaining a modern, approachable aesthetic."
                tags={["UX Research", "Mobile App", "Prototyping", "User Testing"]}
              />
              <ProjectCard
                image={project2Image}
                title="E-commerce Platform Redesign"
                description="Complete redesign of an e-commerce platform that increased conversion rates by 35%. The project involved extensive user journey mapping and A/B testing to optimize the shopping experience."
                tags={["E-commerce", "Web Design", "Conversion Optimization", "A/B Testing"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
              Let's Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              I'm always interested in new opportunities and collaborations. 
              Whether you have a project in mind or just want to chat about design, I'd love to hear from you.
            </p>
            <Button size="lg" className="rounded-xl text-lg px-8">
              <Mail className="mr-2 h-5 w-5" />
              alex.chen@example.com
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-portfolio-section-bg py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-muted-foreground mb-6">© 2025 Alex Chen. All rights reserved.</p>
            <div className="flex justify-center space-x-6">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
