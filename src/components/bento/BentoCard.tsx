import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function BentoCard({ children, className, title, description }: BentoCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-[#16181a] border border-[#27272a] p-6 transition-all duration-300 hover:border-[#15803d]/50 shadow-lg flex flex-col justify-between group",
        className
      )}
    >
      <div>
        {title && (
          <h3 className="text-sm font-medium text-[#a1a1aa] uppercase tracking-wider mb-1">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-xs text-[#a1a1aa] mb-4">
            {description}
          </p>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}