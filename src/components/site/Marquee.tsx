import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = ["LALLY BOUTIQUE", "NEW COLLECTION", "YOUR STYLE", "FASHION", "BAKU"];

export function Marquee({ items = DEFAULT_ITEMS, className }: { items?: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <span className="text-silver">/</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
