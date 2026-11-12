import type { Product } from "@/data/products";
import { productKind } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageProvider";
import { discountPercent, formatPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";

import { WhatsAppIcon } from "./WhatsAppIcon";

type Props = {
  product: Product;
  index: number;
  onOpen: (product: Product) => void;
  className?: string;
};

/** A garment floating directly on the page — no card, no frame. */
export function ProductFigure({ product, index, onOpen, className }: Props) {
  const { t, l, lang } = useLanguage();
  const name = l(product.name);
  const off = discountPercent(product.oldPrice, product.price);
  const waText = buildOrderMessage({ lang, kind: productKind(product), name, sku: product.sku });

  return (
    <article className={cn("group relative", className)}>
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        aria-label={`${name} — ${t.catalog.details}`}
      >
        <span
          aria-hidden="true"
          className="type-masthead pointer-events-none absolute left-1/2 top-[8%] -translate-x-1/2 select-none text-[34vw] text-ghost transition-colors duration-700 group-hover:text-secondary md:text-[13vw] lg:text-[11rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative block aspect-[3/5] md:aspect-[5/8]">
          <span className="absolute inset-0 block md:animate-float" style={{ animationDelay: `${(index % 4) * -1.7}s` }}>
            <img
              src={product.image}
              alt={name}
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              className="filter-float h-full w-full object-contain transition-transform duration-[900ms] ease-[var(--ease-soft)] group-hover:scale-[1.06]"
            />
          </span>
        </span>
        <span className="absolute left-0 top-0 flex flex-col items-start gap-1.5">
          {off > 0 && <span className="bg-ink px-2 py-1 type-eyebrow text-milk">−{off}%</span>}
          {product.isNew && <span className="border border-ink px-2 py-1 type-eyebrow">{t.catalog.isNew}</span>}
        </span>
      </button>

      <div className="relative mt-5 border-t border-foreground/80 pt-4">
        <div className="flex items-center justify-between gap-3 type-eyebrow text-muted-foreground">
          <span>{product.sku}</span>
          <span className="tracking-[0.2em]">{product.sizes.join(" · ")}</span>
        </div>
        <h3 className="mt-3 font-serif text-2xl leading-tight md:text-3xl">
          <button type="button" onClick={() => onOpen(product)} className="text-left hover:opacity-70">
            {name}
          </button>
        </h3>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <button type="button" onClick={() => onOpen(product)} className="type-eyebrow underline-offset-[6px] hover:underline">
            {t.catalog.details}
          </button>
          <a
            href={whatsappLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 type-eyebrow underline-offset-[6px] hover:underline"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            {t.catalog.order}
          </a>
        </div>
      </div>
    </article>
  );
}
