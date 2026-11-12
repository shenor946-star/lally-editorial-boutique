import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";

import silkImg from "@/assets/editorial-silk.webp";
import { editorialButton } from "@/components/site/button-styles";
import { Parallax } from "@/components/site/Parallax";
import { ProductFigure } from "@/components/site/ProductFigure";
import { ProductModal } from "@/components/site/ProductModal";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { FILTER_IDS, PRODUCTS, filterProducts, type FilterId, type Product } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";

type CatalogSearch = { category?: FilterId };

export const Route = createFileRoute("/catalog")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => {
    const c = search.category;
    return typeof c === "string" && (FILTER_IDS as readonly string[]).includes(c) ? { category: c as FilterId } : {};
  },
  head: () => ({
    meta: [
      { title: "Каталог — платья, костюмы, вечерняя одежда | LALLY BOUTIQUE" },
      {
        name: "description",
        content:
          "Каталог LALLY BOUTIQUE: платья, костюмы, повседневная и вечерняя одежда со скидками. Выберите размер и закажите через WhatsApp.",
      },
      { property: "og:title", content: "Каталог LALLY BOUTIQUE · Kataloq" },
      {
        property: "og:description",
        content: "Платья, костюмы и вечерние образы от 100 до 200 AZN. Заказ через WhatsApp, доставка по Баку и регионам.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const { t } = useLanguage();
  const { category } = Route.useSearch();
  const [selected, setSelected] = useState<Product | null>(null);
  const items = filterProducts(PRODUCTS, category);

  const tabs: { id: FilterId | undefined; label: string }[] = [
    { id: undefined, label: t.catalog.all },
    ...FILTER_IDS.map((id) => ({ id, label: t.catalog.categories[id] })),
  ];

  return (
    <div className="pt-header">
      {/* Masthead */}
      <section className="mx-auto max-w-[1600px] px-5 pb-10 pt-10 md:px-10 md:pb-16 md:pt-16">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="animate-fade-up type-eyebrow text-muted-foreground">{t.catalog.eyebrow}</p>
            <h1 className="mt-4 overflow-hidden font-serif text-[23vw] font-medium leading-[0.8] tracking-[-0.03em] md:text-[13vw] 2xl:text-[13rem]">
              <span className="animate-letter inline-block pb-[0.08em]">{t.catalog.title}</span>
            </h1>
          </div>
          <div className="animate-fade-up md:col-span-4 [animation-delay:300ms]">
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t.catalog.intro}</p>
            <p className="mt-4 type-eyebrow">{t.catalog.count(items.length)}</p>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <nav
        aria-label={t.nav.catalog}
        className="sticky top-[var(--header-h)] z-30 border-y border-border bg-background/90 backdrop-blur-md"
      >
        <ul className="mx-auto flex max-w-[1600px] gap-7 overflow-x-auto px-5 [scrollbar-width:none] md:gap-12 md:px-10">
          {tabs.map((tab) => {
            const active = tab.id === category;
            return (
              <li key={tab.id ?? "all"} className="shrink-0">
                <Link
                  to="/catalog"
                  search={tab.id ? { category: tab.id } : {}}
                  viewTransition={false}
                  resetScroll={false}
                  replace
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block py-4 type-eyebrow transition-opacity duration-300",
                    active ? "opacity-100" : "opacity-50 hover:opacity-100",
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-foreground transition-transform duration-500",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Products */}
      <section className="mx-auto max-w-[1600px] px-5 pb-28 pt-14 md:px-10 md:pb-40 md:pt-24">
        {items.length === 0 ? (
          <p className="py-32 text-center font-serif text-3xl italic text-muted-foreground">{t.catalog.empty}</p>
        ) : (
          <div
            key={category ?? "all"}
            className="grid grid-cols-2 items-start gap-x-4 gap-y-16 md:grid-cols-3 md:gap-x-10 md:gap-y-28 lg:gap-x-16"
          >
            {items.map((product, i) => (
              <Fragment key={product.sku}>
                {!category && i === 3 && <Interlude />}
                <Reveal delay={(i % 3) * 110} className={staggerClass(!category && i >= 3 ? i - 3 : i)}>
                  <ProductFigure product={product} index={i} onOpen={setSelected} />
                </Reveal>
              </Fragment>
            ))}
          </div>
        )}
      </section>

      {/* Help */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-end md:px-10 md:py-28">
          <Reveal>
            <h2 className="font-serif text-5xl leading-[0.95] md:text-7xl">{t.catalog.helpTitle}</h2>
            <p className="mt-5 max-w-md text-muted-foreground">{t.catalog.helpText}</p>
          </Reveal>
          <Reveal delay={120}>
            <a href={whatsappLink(t.wa.general)} target="_blank" rel="noopener noreferrer" className={editorialButton({ size: "lg" })}>
              <WhatsAppIcon className="h-4 w-4" />
              <span>{t.catalog.helpCta}</span>
            </a>
          </Reveal>
        </div>
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

/** Offsets columns so the grid reads like a magazine spread rather than a shop shelf. */
function staggerClass(pos: number) {
  const mobileOffset = pos % 2 === 1;
  const desktopOffset = pos % 3 === 1;
  return cn(mobileOffset ? "mt-16" : "mt-0", desktopOffset ? "md:mt-32" : "md:mt-0");
}

/** Magazine-style spread between product rows. */
function Interlude() {
  const { t } = useLanguage();
  return (
    <div className="col-span-full my-4 grid items-center gap-8 bg-ink text-milk md:my-10 md:grid-cols-2">
      <Parallax speed={0.1} className="aspect-[4/5] md:aspect-[5/4]" innerClassName="scale-[1.2]">
        <img src={silkImg} alt="" loading="lazy" className="h-full w-full object-cover" />
      </Parallax>
      <Reveal className="px-6 pb-12 md:px-14 md:pb-0">
        <p className="type-eyebrow text-ink-muted">LALLY · Editorial</p>
        <p className="mt-6 font-serif text-5xl italic leading-[0.95] md:text-7xl">{t.catalog.interludeTitle}</p>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-muted">{t.catalog.interludeText}</p>
      </Reveal>
    </div>
  );
}
