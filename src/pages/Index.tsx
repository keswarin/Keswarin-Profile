import { Button } from "@/components/ui/button";
import { ContactButton } from "@/components/ui/contact-button";
import { TechStackItem } from "@/components/ui/tech-stack-item";
import { ExperienceItem } from "@/components/ui/experience-item";
import { ProjectCard } from "@/components/ui/project-card";
import { 
  MapPin,
  Github,
  Facebook,
  Instagram,
  Phone,
  Mail,
  Download,
  ExternalLink
} from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";
import project1Image from "@/assets/project-1.jpg";
import project2Image from "@/assets/project-2.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-main-bg">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-80 bg-portfolio-sidebar-bg p-6 lg:min-h-screen">
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-border">
                <img 
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Alex Chen</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sr. UX/UI Designer | User Experience Specialist | Design Systems, Mobile Apps, Web Applications
              </p>
              <Button className="mt-4" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Based in:</span>
                <span className="font-medium text-foreground">Thailand</span>
              </div>
              
              <ContactButton 
                icon={Github}
                label="alexchen"
                href="https://github.com/alexchen"
              />
              
              <ContactButton 
                icon={Facebook}
                label="Alex Chen"
                href="https://facebook.com/alexchen"
              />
              
              <ContactButton 
                icon={Instagram}
                label="@alexchen_ux"
                href="https://instagram.com/alexchen_ux"
              />
              
              <ContactButton 
                icon={Mail}
                label="alex.chen@example.com"
                href="mailto:alex.chen@example.com"
              />
              
              <ContactButton 
                icon={Phone}
                label="+66 12 345 6789"
                href="tel:+66123456789"
              />
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                <TechStackItem name="Figma" />
                <TechStackItem name="Sketch" />
                <TechStackItem name="Adobe XD" />
                <TechStackItem name="Principle" />
                <TechStackItem name="Framer" />
                <TechStackItem name="HTML" />
                <TechStackItem name="CSS" />
                <TechStackItem name="JavaScript" />
                <TechStackItem name="React" />
                <TechStackItem name="Tailwind" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 space-y-8">
          {/* Experience Section */}
          <section className="bg-portfolio-card-bg rounded-xl p-6 shadow-sm shadow-[hsl(var(--portfolio-card-shadow))]">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Experience</h2>
            <div className="space-y-6">
              <ExperienceItem
                title="Senior UX/UI Designer"
                company="Tech Solutions Co."
                period="September 2021 - Present"
                companyUrl="https://techsolutions.com"
              />
              <ExperienceItem
                title="UX/UI Designer"
                company="Digital Agency"
                period="July 2019 - August 2021"
                companyUrl="https://digitalagency.com"
              />
              <ExperienceItem
                title="Junior Designer"
                company="StartupX"
                period="March 2018 - June 2019"
                companyUrl="https://startupx.com"
              />
            </div>
          </section>

          {/* Education Section */}
          <section className="bg-portfolio-card-bg rounded-xl p-6 shadow-sm shadow-[hsl(var(--portfolio-card-shadow))]">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Education</h2>
            <div className="space-y-6">
              <ExperienceItem
                title="Bachelor of Fine Arts in Design"
                company="University of Art & Design"
                period="2014 - 2018"
              />
              <ExperienceItem
                title="Certificate in UX Design"
                company="Design Institute"
                period="2018"
              />
            </div>
          </section>

          {/* Featured Projects */}
          <section className="bg-portfolio-card-bg rounded-xl p-6 shadow-sm shadow-[hsl(var(--portfolio-card-shadow))]">
            <div className="flex items-center gap-2 mb-6">
              <Github className="h-6 w-6 text-foreground" />
              <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>
            </div>
            <p className="text-muted-foreground mb-6">Showcasing 2 featured repositories</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-lg p-4 border border-border hover:shadow-md hover:shadow-[hsl(var(--portfolio-card-shadow-hover))] transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">FinTech Mobile App</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  A comprehensive mobile banking app focused on simplifying financial management for millennials.
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>⭐ 128</span>
                    <span>🍴 45</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Figma</span>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-lg p-4 border border-border hover:shadow-md hover:shadow-[hsl(var(--portfolio-card-shadow-hover))] transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">E-commerce Platform</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete redesign of an e-commerce platform that increased conversion rates by 35%.
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span>⭐ 89</span>
                    <span>🍴 23</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Sketch</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
