import { cn } from "@/lib/utils";
import { ExternalLink, Calendar } from "lucide-react";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  companyUrl?: string;
  className?: string;
}

export function ExperienceItem({ title, company, period, companyUrl, className }: ExperienceItemProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>{period}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {companyUrl ? (
        <a 
          href={companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          {company}
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : (
        <p className="text-muted-foreground">{company}</p>
      )}
    </div>
  );
}