import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import boutiqueImg from "@/assets/editorial-boutique.webp";
import limitedImg from "@/assets/editorial-limited.webp";
import silkImg from "@/assets/editorial-silk.webp";
import suitImg from "@/assets/editorial-suit.webp";
import type { FilterId } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

import { Parallax } from "./Parallax";
import { Reveal } from "./Reveal";

/** One photo and one catalog filter per info item, in the same order as t.home.info. */
const VISUALS: { image: string; category?: FilterId }[] = [
  { image: silkImg, category: "new" },
  { image: suitImg },
  { image: boutiqueImg },
  { image: limitedImg },
];

/** "Season in details": hovering or tapping a card swaps the large photo on the left. */
export function SeasonShowcase() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const items = t.home.info;
  const current = items[active] ?? items[0]!;

  return (
    <section id="season" className="mx-auto max-w-[1600px] scroll-mt-20 px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-10 md:gap-y-0">
        {/* Heading: above the photo on phones, above the cards on desktop */}
        <div className="md:col-span-6 md:col-start-7 md:row-start-1 md:pt-10">
          <Reveal>
            <p className="type-eyebrow text-muted-foreground">LALLY · 2026</p>
            <h2 className="mt-5 font-serif text-5xl leading-[0.95] md:text-7xl">{t.home.infoTitle}</h2>
          </Reveal>
        </div>

        {/* Image stage */}
        <div className="md:sticky md:top-[calc(var(--header-h)+2rem)] md:col-span-5 md:col-start-1 md:row-span-2 md:row-start-1 md:self-start">
          <Reveal variant="clip" className="relative">
            <Parallax speed={0.06} className="relative aspect-[5/4] bg-ink md:aspect-[3/4]" innerClassName="scale-[1.12]">
              {VISUALS.map((v, i) => (
                <img
                  key={i}
                  src={v.image}
                  alt={i === active ? current.title : ""}
                  aria-hidden={i !== active}
                  loading={i === 0 ? undefined : "lazy"}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] ease-[var(--ease-soft)]",
                    i === active
                      ? "scale-[1.08] opacity-100 duration-[900ms,2600ms]"
                      : "scale-100 opacity-0 duration-[700ms,700ms]",
                  )}
                />
              ))}
            </Parallax>
            {/* Contrast gradient + caption sit outside the parallax so they never drift */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-milk md:p-8">
              <div key={`${active}-${current.title}`} className="animate-fade-up [animation-duration:700ms]">
                <p className="type-eyebrow text-ink-muted">LALLY · 2026</p>
                <p className="mt-3 font-serif text-3xl italic leading-none md:text-4xl">{current.title}</p>
              </div>
              <p className="font-display text-6xl leading-none md:text-7xl" aria-hidden="true">
                0{active + 1}
                <span className="text-2xl text-ink-muted md:text-3xl">/0{items.length}</span>
              </p>
            </div>
            {/* Progress ticks */}
            <div className="pointer-events-none absolute inset-x-6 top-6 flex gap-2 md:inset-x-8 md:top-8" aria-hidden="true">
              {items.map((item, i) => (
                <span key={item.title} className="h-px flex-1 bg-milk/25">
                  <span
                    className={cn(
                      "block h-full origin-left bg-milk transition-transform duration-700 ease-[var(--ease-soft)]",
                      i === active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Interactive cards */}
        <div className="md:col-span-6 md:col-start-7 md:row-start-2">
          <ol className="flex flex-col gap-3 md:mt-14">
            {items.map((item, i) => {
              const isActive = i === active;
              const category = VISUALS[i]?.category;
              return (
                <Reveal as="li" key={item.title} delay={i * 90}>
                  <div
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "group relative grid grid-cols-[3.25rem_1fr_auto] items-center gap-4 border px-5 py-6 transition-colors duration-500 ease-[var(--ease-soft)] md:grid-cols-[5rem_1fr_auto] md:gap-6 md:px-7 md:py-8",
                      isActive
                        ? "border-ink bg-ink text-milk"
                        : "border-border bg-background text-foreground hover:border-foreground/50",
                    )}
                  >
                    {/* Accent bar */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-0 left-0 w-1 origin-top bg-silver transition-transform duration-500 ease-[var(--ease-soft)]",
                        isActive ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-display text-4xl leading-none transition-colors duration-500 md:text-6xl",
                        isActive ? "text-milk" : "text-silver group-hover:text-foreground",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={isActive}
                      className="text-left after:absolute after:inset-0 focus-visible:outline-none"
                    >
                      <span className="block font-serif text-2xl leading-tight md:text-[2.1rem]">{item.title}</span>
                      <span
                        className={cn(
                          "mt-2 block max-w-md text-sm leading-relaxed transition-colors duration-500",
                          isActive ? "text-ink-muted" : "text-muted-foreground",
                        )}
                      >
                        {item.text}
                      </span>
                    </button>
                    <Link
                      to="/catalog"
                      search={category ? { category } : {}}
                      aria-label={`${t.home.infoCta}: ${item.title}`}
                      title={t.home.infoCta}
                      className={cn(
                        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-[background-color,color,border-color,transform] duration-500 ease-[var(--ease-soft)] hover:rotate-45 md:h-14 md:w-14",
                        isActive
                          ? "border-milk bg-milk text-ink"
                          : "border-foreground/30 text-foreground group-hover:border-foreground",
                      )}
                    >
                      <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.5} />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
