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
    <div className={cn("rounded-xl bg-[#121315] border border-[#222326] p-5 shadow-sm flex flex-col justify-start w-full", className)}>
      {(title || description) && (
        <div className="mb-4 border-b border-[#222326] pb-3 w-full">
          {title && <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{title}</h3>}
          {description && <p className="text-[11px] text-zinc-500 mt-1">{description}</p>}
        </div>
      )}
      <div className="w-full flex-1 flex flex-col justify-start">{children}</div>
    </div>
  );
}