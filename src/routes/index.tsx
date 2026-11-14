import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

import boutiqueImg from "@/assets/editorial-boutique.webp";
import suitImg from "@/assets/editorial-suit.webp";
import heroLogo from "@/assets/hero-logo.png.asset.json";
import heroModel from "@/assets/hero-model.webp";
import { editorialButton } from "@/components/site/button-styles";
import { Marquee } from "@/components/site/Marquee";
import { Parallax } from "@/components/site/Parallax";
import { Reveal } from "@/components/site/Reveal";
import { SeasonShowcase } from "@/components/site/SeasonShowcase";
import { PRODUCTS } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageProvider";
import { discountPercent, formatPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LALLY BOUTIQUE — Dəbli xanımların seçimi · Баку" },
      {
        name: "description",
        content:
          "Бутик женской одежды LALLY BOUTIQUE в Nizami Mall, Баку: новая коллекция платьев и костюмов, акции и скидки, заказ через WhatsApp.",
      },
      { property: "og:title", content: "LALLY BOUTIQUE — Выбор стильных женщин" },
      {
        property: "og:description",
        content: "Новая коллекция, сезонные скидки и заказ через WhatsApp. Nizami Mall, магазин №316, Баку.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

/** Feeds the hero's scroll position into a CSS variable for layered parallax. */
function useHeroScroll() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const factor = window.matchMedia("(max-width: 767px)").matches ? 0.4 : 1;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = Math.min(window.scrollY, window.innerHeight * 1.2);
      el.style.setProperty("--hero-y", String(y * factor));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return ref;
}

const layer = (speed: number) => ({
  transform: `translate3d(0, calc(var(--hero-y, 0) * ${speed}px), 0)`,
});

function HomePage() {
  const { t, l, lang } = useLanguage();
  const heroRef = useHeroScroll();

  const promo = [...PRODUCTS]
    .sort((a, b) => discountPercent(b.oldPrice, b.price) - discountPercent(a.oldPrice, a.price))
    .slice(0, 3);
  const maxOff = Math.max(0, ...PRODUCTS.map((p) => discountPercent(p.oldPrice, p.price)));

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[620px] overflow-hidden">
        <div
          className="absolute inset-x-0 top-[calc(var(--header-h)+2svh)] z-0 flex justify-center px-6"
          style={layer(0.45)}
        >
          <h1 className="animate-fade-up m-0 [animation-delay:150ms]">
            <img
              src={heroLogo.url}
              alt="LALY BOUTIQUE"
              fetchPriority="high"
              className="w-[min(76vw,19rem)] object-contain md:w-[min(31vw,25rem)]"
            />
          </h1>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center" style={layer(0.12)}>
          <img
            src={heroModel}
            alt=""
            fetchPriority="high"
            className="animate-fade h-[74svh] w-auto max-w-none object-contain [animation-delay:500ms] md:h-[88svh]"
          />
        </div>

        {/* Side notes */}
        <p className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 origin-left type-eyebrow text-muted-foreground lg:block">
          N° 316 — Nizami Mall
        </p>
        <p className="absolute right-6 top-1/2 z-20 hidden translate-x-1/2 -translate-y-1/2 rotate-90 type-eyebrow text-muted-foreground lg:block">
          AW · 2026
        </p>

        <div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-background via-background/85 to-transparent pt-28 md:bg-none md:pt-0">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 pb-8 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10">
            <div className="animate-fade-up [animation-delay:1100ms]">
              <p className="type-eyebrow text-muted-foreground">{t.home.eyebrow}</p>
              <p className="mt-3 max-w-[14ch] font-serif text-4xl italic leading-[1.02] md:text-5xl lg:text-6xl">
                {t.home.slogan}
              </p>
            </div>
            <div className="animate-fade-up flex items-center gap-6 [animation-delay:1250ms]">
              <Link to="/catalog" className={editorialButton({ size: "lg" })}>
                <span>{t.home.cta}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1" strokeWidth={1.5} />
              </Link>
              <a href="#season" className="hidden items-center gap-2 type-eyebrow text-muted-foreground md:flex">
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
                {t.home.scroll}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- MARQUEE ---------------- */}
      <Marquee className="bg-ink py-5 font-display text-4xl text-milk md:py-7 md:text-6xl" />

      {/* ---------------- SEASON / INFO ---------------- */}
      <SeasonShowcase />

      {/* ---------------- PROMO / АКЦИИ ---------------- */}
      <section className="bg-ink text-milk">
        <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">
          <Reveal>
            <p className="type-eyebrow text-ink-muted">Sale · Endirim · Скидки</p>
          </Reveal>
          <h2
            className={cn(
              "type-masthead hollow-milk mt-6 whitespace-nowrap",
              lang === "az" ? "text-[12.4vw] 2xl:text-[12rem]" : "text-[21vw] 2xl:text-[20rem]",
            )}
          >
            {t.home.promoTitle}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <Reveal className="md:col-span-6">
              <p className="font-serif text-4xl italic leading-tight md:text-5xl">{t.home.promoLead(maxOff)}</p>
            </Reveal>
            <Reveal delay={120} className="md:col-span-4 md:col-start-9">
              <p className="text-sm leading-relaxed text-ink-muted">{t.home.promoText}</p>
              <Link to="/catalog" className={editorialButton({ variant: "light", className: "mt-6" })}>
                <span>{t.home.promoCta}</span>
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 pb-24 pt-16 md:px-10 md:pb-36 md:pt-24">
        <div className="grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 md:gap-x-12">
          {promo.map((p, i) => {
            const off = discountPercent(p.oldPrice, p.price);
            return (
              <Reveal key={p.sku} delay={i * 120} className={cn(i === 1 && "md:mt-24", i === 2 && "col-span-2 mx-auto w-1/2 md:col-span-1 md:w-full")}>
                <Link to="/catalog" search={{ category: p.category }} className="group block">
                  <span className="relative block aspect-[3/5]">
                    <img
                      src={p.image}
                      alt={l(p.name)}
                      loading="lazy"
                      className="filter-float h-full w-full object-contain transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.06]"
                    />
                    <span className="type-masthead absolute -left-1 top-0 text-5xl md:text-7xl">−{off}%</span>
                  </span>
                  <span className="mt-5 flex items-baseline justify-between border-t border-foreground pt-3">
                    <span className="font-serif text-xl md:text-2xl">{l(p.name)}</span>
                    <span className="text-sm">
                      <span className="mr-2 text-muted-foreground line-through">{p.oldPrice}</span>
                      <span className="font-semibold">{formatPrice(p.price)}</span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------------- WIDE IMAGE ---------------- */}
      <Reveal variant="clip">
        <Parallax speed={0.18} className="h-[60svh] md:h-[90svh]" innerClassName="scale-[1.3]">
          <img src={boutiqueImg} alt="" className="h-full w-full object-cover" />
        </Parallax>
      </Reveal>

      {/* ---------------- ABOUT TEASER ---------------- */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6 lg:col-span-5">
            <Reveal>
              <p className="type-eyebrow text-muted-foreground">{t.home.aboutEyebrow}</p>
              <h2 className="mt-5 font-serif text-5xl leading-[0.95] md:text-6xl lg:text-7xl">{t.home.aboutTitle}</h2>
              <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">{t.home.aboutText}</p>
              <p className="mt-6 type-eyebrow">{t.address}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/catalog" className={editorialButton()}>
                  <span>{t.home.aboutCta}</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
                <Link to="/about" className={editorialButton({ variant: "outline" })}>
                  <span>{t.home.aboutMore}</span>
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal variant="clip" delay={150}>
              <Parallax speed={0.1} className="aspect-[4/5]" innerClassName="scale-[1.15]">
                <img src={suitImg} alt="" className="h-full w-full object-cover" />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
