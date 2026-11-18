import { useState } from "react";

import type { ColorId, Product } from "@/data/products";
import { productKind } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageProvider";
import { saveEnquiry } from "@/lib/enquiries";
import { discountPercent, formatPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";

import { ColorSwatches, CrossfadeImage, PhotoArrows, PhotoIndicator, useSwipe, wrap } from "./ProductPhotos";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Props = {
  product: Product;
  index: number;
  onOpen: (product: Product, color: ColorId, photo: number) => void;
  className?: string;
};

/** Lookbook card: studio photo with colour swatches and a swipeable mini-gallery. */
export function ProductFigure({ product, index, onOpen, className }: Props) {
  const { t, l, lang } = useLanguage();
  const [colorId, setColorId] = useState<ColorId>(product.colors[0]!.id);
  const [photo, setPhoto] = useState(0);

  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0]!;
  const photos = color.images;
  const current = photos[wrap(photo, photos.length)] ?? product.image;
  const name = l(product.name);
  const colorName = l(color.name);
  const off = discountPercent(product.oldPrice, product.price);
  const waText = buildOrderMessage({ lang, kind: productKind(product), name, sku: product.sku, color: colorName });

  const prev = () => setPhoto((p) => wrap(p - 1, photos.length));
  const next = () => setPhoto((p) => wrap(p + 1, photos.length));
  const swipe = useSwipe(prev, next);
  const open = () => onOpen(product, color.id, wrap(photo, photos.length));

  return (
    <article className={cn("group relative", className)}>
      <div className="relative overflow-hidden bg-secondary [touch-action:pan-y]" {...swipe.handlers}>
        <button
          type="button"
          onClick={() => !swipe.consumed() && open()}
          className="relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          aria-label={`${name} — ${t.catalog.details}`}
        >
          <span className="relative block aspect-[4/5] transition-transform duration-[1200ms] ease-[var(--ease-soft)] group-hover:scale-[1.05] motion-reduce:transition-none">
            <CrossfadeImage src={current} alt={`${name} — ${colorName}`} eager={index < 3} />
          </span>
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="absolute left-3 top-3 flex flex-col items-start gap-1.5 md:left-4 md:top-4">
            {off > 0 && <span className="bg-ink px-2 py-1 type-eyebrow text-milk">−{off}%</span>}
            {product.isNew && <span className="bg-milk px-2 py-1 type-eyebrow text-ink">{t.catalog.isNew}</span>}
          </span>
          <span className="absolute right-3 top-3 font-display text-lg text-ink/60 md:right-4 md:top-4 md:text-xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute inset-x-0 bottom-0 hidden translate-y-2 p-4 pb-7 text-left type-eyebrow text-milk opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 md:block">
            {t.catalog.details} →
          </span>
        </button>

        {photos.length > 1 && (
          <>
            <PhotoArrows
              onPrev={prev}
              onNext={next}
              className="hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 md:flex"
            />
            <PhotoIndicator
              count={photos.length}
              index={wrap(photo, photos.length)}
              onSelect={setPhoto}
              className="absolute inset-x-3 bottom-1 md:inset-x-4"
            />
          </>
        )}
      </div>

      <div className="relative mt-3 flex items-center justify-between gap-2">
        <ColorSwatches
          colors={product.colors}
          value={color.id}
          onChange={(id) => {
            setColorId(id);
            setPhoto(0);
          }}
          className="-ml-2.5"
        />
        <span className="truncate text-right type-eyebrow text-muted-foreground">{colorName}</span>
      </div>

      <div className="relative mt-2 border-t border-foreground/80 pt-4">
        <div className="flex items-center justify-between gap-3 type-eyebrow text-muted-foreground">
          <span>{product.sku}</span>
          <span className="tracking-[0.2em]">{product.sizes.join(" · ")}</span>
        </div>
        <h3 className="mt-3 font-serif text-2xl leading-tight md:text-3xl">
          <button type="button" onClick={open} className="text-left hover:opacity-70">
            {name}
          </button>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{l(product.description)}</p>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatPrice(product.oldPrice)}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <button type="button" onClick={open} className="type-eyebrow underline-offset-[6px] hover:underline">
            {t.catalog.details}
          </button>
          <a
            href={whatsappLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              saveEnquiry({ sku: product.sku, productName: name, size: null, color: colorName, price: product.price, lang, source: "card" })
            }
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
