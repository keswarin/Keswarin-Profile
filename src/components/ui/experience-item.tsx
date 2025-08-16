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
    // 1. เพิ่ม "relative" ที่นี่ เพื่อให้จุดวงกลมเกาะได้
    <div className={cn("relative", className)}>

      {/* 2. นี่คือ "จุดวงกลม" ที่เราเพิ่มเข้ามาใหม่ */}
      {/* มันจะลอยไปอยู่บนเส้นที่เราสร้างไว้ในขั้นตอนที่ 1 */}
      <div className="absolute -left-[calc(1.5rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-gray-400" />

      {/* เนื้อหาเดิมทั้งหมด ไม่ต้องแก้ไข */}
      <div className="space-y-2">
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

    </div>
  );
}