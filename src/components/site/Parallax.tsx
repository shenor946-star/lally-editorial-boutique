import type { ReactNode } from "react";

import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

/** Wraps content in a clipped frame and drifts it on scroll. */
export function Parallax({
  children,
  speed = 0.12,
  className,
  innerClassName,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  innerClassName?: string;
}) {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className={cn("h-full w-full", innerClassName)}>{children}</div>
    </div>
  );
}
