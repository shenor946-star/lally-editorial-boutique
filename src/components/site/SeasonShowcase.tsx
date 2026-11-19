import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import limitedImg from "@/assets/season-limited-edition.jpg";
import newCollectionImg from "@/assets/season-new-collection.jpg";
import seasonalOffersImg from "@/assets/season-seasonal-offers.jpg";
import specialOffersImg from "@/assets/season-special-offers.jpg";
import { useLanguage } from "@/i18n/LanguageProvider";

const images = [newCollectionImg, specialOffersImg, seasonalOffersImg, limitedImg];

export const SeasonShowcase = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  return (
    <section id="season" aria-labelledby="season-title" className="bg-background py-16">
      <div className="container mx-auto mb-8 px-4">
        <span className="type-eyebrow text-muted-foreground">Lally · 2026</span>
        <h2 id="season-title" className="mt-2 font-serif text-3xl md:text-4xl">
          {t.home.infoTitle}
        </h2>
      </div>

      <div
        ref={scrollRef}
        aria-label={t.home.infoTitle}
        className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {t.home.info.map((item, index) => (
          <article
            key={item.title}
            className="group relative flex h-[500px] w-[300px] min-w-[300px] shrink-0 cursor-pointer snap-center flex-col justify-end overflow-hidden rounded-lg p-6 shadow-sm md:w-[420px] md:min-w-[420px]"
          >
            <img
              src={images[index]}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />

            <div className="relative z-10 flex items-end justify-between gap-4 text-milk">
              <div className="min-w-0">
                <p className="type-eyebrow mb-1 opacity-80">Lally · 2026</p>
                <h3 className="mb-2 font-serif text-2xl">{item.title}</h3>
                <p className="line-clamp-2 text-sm opacity-90">{item.text}</p>
              </div>
              <div className="mb-1 flex shrink-0 items-center gap-2">
                <span className="font-serif text-2xl font-light">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-lg font-light opacity-60">/ 04</span>
              </div>
            </div>

            <div className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-milk/20 text-milk backdrop-blur-md transition-colors group-hover:bg-milk group-hover:text-ink">
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
