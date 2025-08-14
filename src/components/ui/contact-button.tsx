import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ContactButtonProps {
  icon: LucideIcon;
  label: string;
  href: string;
  className?: string;
}

export function ContactButton({ icon: Icon, label, href, className }: ContactButtonProps) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border border-border bg-portfolio-card-bg hover:bg-accent hover:text-accent-foreground transition-all duration-200 group",
        className
      )}
    >
      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-accent-foreground" />
      <span className="text-sm font-medium text-foreground group-hover:text-accent-foreground">
        {label}
      </span>
    </a>
  );
}