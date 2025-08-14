import { cn } from "@/lib/utils";

interface TechStackItemProps {
  name: string;
  className?: string;
}

export function TechStackItem({ name, className }: TechStackItemProps) {
  return (
    <span 
      className={cn(
        "inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full font-medium",
        className
      )}
    >
      {name}
    </span>
  );
}