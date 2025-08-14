import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
  className?: string;
}

export function ProjectCard({ image, title, description, tags, className }: ProjectCardProps) {
  return (
    <div className={cn(
      "group bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[hsl(var(--portfolio-card-shadow-hover))] hover:-translate-y-1",
      className
    )}>
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button variant="ghost" className="group/btn p-0 h-auto font-medium text-primary hover:text-primary">
          Read Case Study
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}