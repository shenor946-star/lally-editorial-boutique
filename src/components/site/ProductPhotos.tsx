import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type TouchEvent } from "react";

import type { ProductColor } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type Layer = { src: string; id: number; shown: boolean };

/**
 * Shows `src`; when it changes the new photo loads underneath and
 * cross-dissolves in over the old one. Only the visible photos are loaded.
 */
export function CrossfadeImage({
  src,
  alt,
  eager,
  className,
}: {
  src: string;
  alt: string;
  eager?: boolean;
  className?: string;
}) {
  const [layers, setLayers] = useState<Layer[]>([{ src, id: 0, shown: true }]);
  const nextId = useRef(1);

  useEffect(() => {
    setLayers((ls) => {
      const top = ls[ls.length - 1];
      if (top?.src === src) return ls;
      return [...ls.slice(-1), { src, id: nextId.current++, shown: false }];
    });
  }, [src]);

  const reveal = (id: number) => {
    setLayers((ls) => ls.map((l) => (l.id === id ? { ...l, shown: true } : l)));
    // Drop the photo underneath once the dissolve has finished.
    window.setTimeout(() => setLayers((ls) => (ls[ls.length - 1]?.id === id ? ls.slice(-1) : ls)), 700);
  };

  return (
    <>
      {layers.map((layer) => (
        <img
          key={layer.id}
          src={layer.src}
          alt={alt}
          width={880}
          height={1100}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          onLoad={() => !layer.shown && reveal(layer.id)}
          ref={(el) => {
            // Cached photos may finish loading before React attaches onLoad.
            if (el && !layer.shown && el.complete && el.naturalWidth > 0) queueMicrotask(() => reveal(layer.id));
          }}
          className={cn(
            "absolute inset-0 h-full w-full select-none object-cover object-top transition-opacity duration-500 ease-[var(--ease-soft)] motion-reduce:duration-0",
            layer.shown ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      ))}
    </>
  );
}

/** Horizontal swipe on touch screens; vertical scrolling stays untouched. Returns true from `consumed()` right after a swipe. */
export function useSwipe(onPrev: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  return {
    handlers: {
      onTouchStart: (e: TouchEvent) => {
        const t = e.touches[0];
        if (t) start.current = { x: t.clientX, y: t.clientY };
        swiped.current = false;
      },
      onTouchEnd: (e: TouchEvent) => {
        const t = e.changedTouches[0];
        const s = start.current;
        start.current = null;
        if (!t || !s) return;
        const dx = t.clientX - s.x;
        const dy = t.clientY - s.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) {
          swiped.current = true;
          if (dx < 0) onNext();
          else onPrev();
        }
      },
    },
    consumed: () => {
      const v = swiped.current;
      swiped.current = false;
      return v;
    },
  };
}

/** Thin segment bar: one segment per photo, the current one filled. */
export function PhotoIndicator({
  count,
  index,
  onSelect,
  className,
}: {
  count: number;
  index: number;
  onSelect?: (i: number) => void;
  className?: string;
}) {
  const { t } = useLanguage();
  if (count < 2) return null;
  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          tabIndex={onSelect ? 0 : -1}
          aria-label={t.catalog.photoOf(i + 1, count)}
          aria-current={i === index ? "true" : undefined}
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.(i);
          }}
          className="group/seg flex h-6 flex-1 items-center"
        >
          <span
            className={cn(
              "block h-0.5 w-full transition-colors duration-500",
              i === index ? "bg-ink" : "bg-ink/20 group-hover/seg:bg-ink/45",
            )}
          />
        </button>
      ))}
    </div>
  );
}

export function PhotoArrows({
  onPrev,
  onNext,
  className,
  buttonClassName,
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
  buttonClassName?: string;
}) {
  const { t } = useLanguage();
  const btn = cn(
    "pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-background/75 text-foreground backdrop-blur transition-colors duration-300 hover:bg-ink hover:text-milk",
    buttonClassName,
  );
  return (
    <div className={cn("pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3", className)}>
      <button type="button" aria-label={t.catalog.prevPhoto} onClick={onPrev} className={btn}>
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <button type="button" aria-label={t.catalog.nextPhoto} onClick={onNext} className={btn}>
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}

/** Colour circles. Each target is at least 36px for fingers; the dot itself stays small. */
export function ColorSwatches({
  colors,
  value,
  onChange,
  size = "sm",
  className,
}: {
  colors: ProductColor[];
  value: ProductColor["id"];
  onChange: (id: ProductColor["id"]) => void;
  size?: "sm" | "lg";
  className?: string;
}) {
  const { t, l } = useLanguage();
  return (
    <div role="radiogroup" aria-label={t.catalog.color} className={cn("flex flex-wrap", className)}>
      {colors.map((c) => {
        const active = c.id === value;
        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t.catalog.colorOf(l(c.name))}
            title={l(c.name)}
            onClick={(e) => {
              e.stopPropagation();
              onChange(c.id);
            }}
            className={cn(
              "flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-ring",
              size === "sm" ? "h-9 w-9" : "h-12 w-12",
            )}
          >
            <span
              style={{ backgroundColor: c.swatch }}
              className={cn(
                "block rounded-full border border-foreground/15 ring-offset-background transition-[box-shadow,transform] duration-300",
                size === "sm" ? "h-4 w-4" : "h-7 w-7",
                active ? "scale-110 ring-1 ring-foreground ring-offset-[3px]" : "hover:scale-110",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

/** Index helpers that wrap around. */
export const wrap = (i: number, n: number) => ((i % n) + n) % n;
