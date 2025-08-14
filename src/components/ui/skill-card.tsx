import { cn } from "@/lib/utils";

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
}

export function SkillCard({ icon, title, className }: SkillCardProps) {
  return (
    <div className={cn(
      "flex flex-col items-center p-6 bg-card rounded-xl border border-border transition-all duration-200 hover:shadow-lg hover:shadow-[hsl(var(--portfolio-card-shadow-hover))]",
      className
    )}>
      <div className="mb-3 text-primary">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-center text-foreground">
        {title}
      </h3>
    </div>
  );
}