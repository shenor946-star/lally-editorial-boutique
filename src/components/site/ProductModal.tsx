import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { ALL_SIZES, productKind, type ColorId, type Product, type Size } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageProvider";
import { saveEnquiry } from "@/lib/enquiries";
import { discountPercent, formatPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";

import { editorialButton } from "./button-styles";
import { ColorSwatches, CrossfadeImage, PhotoArrows, PhotoIndicator, useSwipe, wrap } from "./ProductPhotos";
import { WhatsAppIcon } from "./WhatsAppIcon";

export type ModalSelection = { product: Product; color: ColorId; photo: number };

type Props = {
  selection: ModalSelection | null;
  onClose: () => void;
};

export function ProductModal({ selection, onClose }: Props) {
  const { t } = useLanguage();
  return (
    <Dialog.Root open={!!selection} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className="fixed inset-0 z-[70] overflow-y-auto bg-background outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-8 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:duration-700 md:inset-4 lg:inset-8"
          aria-describedby={undefined}
        >
          {selection && <ModalBody key={selection.product.sku} {...selection} />}

          <Dialog.Close
            className="fixed right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-ink hover:text-milk md:right-10 md:top-10 lg:right-14 lg:top-14"
            aria-label={t.catalog.close}
          >
            <X className="h-5 w-5" strokeWidth={1.25} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ModalBody({ product, color: initialColor, photo: initialPhoto }: ModalSelection) {
  const { t, l, lang } = useLanguage();
  const [colorId, setColorId] = useState<ColorId>(initialColor);
  const [photo, setPhoto] = useState(initialPhoto);
  // Pre-select when only one size exists; otherwise the customer chooses.
  const [size, setSize] = useState<Size | null>(product.sizes.length === 1 ? (product.sizes[0] ?? null) : null);

  const color = product.colors.find((c) => c.id === colorId) ?? product.colors[0]!;
  const photos = color.images;
  const at = wrap(photo, photos.length);
  const name = l(product.name);
  const colorName = l(color.name);
  const off = discountPercent(product.oldPrice, product.price);
  const waHref = size
    ? whatsappLink(buildOrderMessage({ lang, kind: productKind(product), name, sku: product.sku, size, color: colorName }))
    : null;

  const prev = () => setPhoto((p) => wrap(p - 1, photos.length));
  const next = () => setPhoto((p) => wrap(p + 1, photos.length));
  const swipe = useSwipe(prev, next);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length]);

  return (
    <div className="grid min-h-full md:grid-cols-[1.15fr_1fr]">
      {/* Gallery */}
      <div className="relative flex flex-col bg-secondary md:sticky md:top-0 md:h-[calc(100svh-2rem)] lg:h-[calc(100svh-4rem)]">
        <div className="relative min-h-[68svh] flex-1 overflow-hidden [touch-action:pan-y] md:min-h-0" {...swipe.handlers}>
          <CrossfadeImage src={photos[at] ?? product.image} alt={`${name} — ${colorName}`} eager className="animate-fade-up" />
          {off > 0 && (
            <span className="absolute left-5 top-5 bg-ink px-3 py-1.5 type-eyebrow text-milk md:left-8 md:top-8">−{off}%</span>
          )}
          {photos.length > 1 && (
            <>
              <PhotoArrows onPrev={prev} onNext={next} className="px-4 md:px-6" buttonClassName="h-12 w-12" />
              <p className="absolute bottom-5 right-5 font-display text-lg tabular-nums text-ink/70 md:bottom-8 md:right-8">
                {String(at + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              </p>
            </>
          )}
        </div>

        {photos.length > 1 && (
          <div className="flex items-center gap-2 px-5 py-3 md:px-8 md:py-4">
            <div className="flex gap-2">
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setPhoto(i)}
                  aria-label={t.catalog.photoOf(i + 1, photos.length)}
                  aria-current={i === at ? "true" : undefined}
                  className={cn(
                    "relative h-16 w-12 overflow-hidden transition-opacity duration-300 md:h-20 md:w-16",
                    i === at ? "opacity-100 ring-1 ring-ink" : "opacity-55 hover:opacity-100",
                  )}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                </button>
              ))}
            </div>
            <PhotoIndicator count={photos.length} index={at} className="ml-auto hidden w-24 md:flex" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col px-6 py-10 md:px-12 md:py-16 lg:px-16">
        <p className="type-eyebrow text-muted-foreground">
          {t.catalog.categories[product.category]}
          {product.isNew ? ` · ${t.catalog.isNew}` : ""}
        </p>
        <Dialog.Title className="mt-5 font-serif text-5xl leading-[0.95] md:text-6xl lg:text-7xl">{name}</Dialog.Title>
        <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">{l(product.description)}</p>

        <dl className="mt-8 border-y border-border py-4 text-sm">
          <div className="flex justify-between">
            <dt className="type-eyebrow text-muted-foreground">{t.catalog.sku}</dt>
            <dd className="font-semibold tracking-[0.12em]">{product.sku}</dd>
          </div>
        </dl>

        <fieldset className="mt-8">
          <legend className="flex w-full items-baseline justify-between type-eyebrow">
            <span>{t.catalog.color}</span>
            <span className="text-muted-foreground">{colorName}</span>
          </legend>
          <ColorSwatches
            colors={product.colors}
            value={color.id}
            onChange={(id) => {
              setColorId(id);
              setPhoto(0);
            }}
            size="lg"
            className="-ml-2.5 mt-2"
          />
        </fieldset>

        <fieldset className="mt-6">
          <legend className="type-eyebrow">{t.catalog.chooseSize}</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {ALL_SIZES.map((s) => {
              const available = product.sizes.includes(s);
              const active = size === s;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={!available}
                  onClick={() => setSize(s)}
                  aria-pressed={active}
                  title={available ? undefined : t.catalog.sizeUnavailable}
                  className={cn(
                    "h-12 w-14 border text-sm font-semibold tracking-[0.1em] transition-colors duration-300",
                    active && "border-ink bg-ink text-milk",
                    !active && available && "border-foreground/30 hover:border-ink",
                    !available && "cursor-not-allowed border-border text-muted-foreground/50 line-through",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-10 flex flex-wrap items-end gap-x-5 gap-y-2">
          <div>
            <p className="type-eyebrow text-muted-foreground">{t.catalog.newPrice}</p>
            <p className="mt-1 font-serif text-5xl leading-none md:text-6xl">{formatPrice(product.price)}</p>
          </div>
          <div className="pb-1">
            <p className="type-eyebrow text-muted-foreground">{t.catalog.oldPrice}</p>
            <p className="mt-1 text-lg text-muted-foreground line-through">{formatPrice(product.oldPrice)}</p>
          </div>
          {off > 0 && (
            <p className="pb-1.5 type-eyebrow">
              {t.catalog.discount} −{off}%
            </p>
          )}
        </div>

        <div className="mt-8">
          {waHref ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                saveEnquiry({ sku: product.sku, productName: name, size, color: colorName, price: product.price, lang, source: "modal" })
              }
              className={editorialButton({ size: "lg", className: "w-full" })}
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>{t.catalog.orderWhatsapp}</span>
            </a>
          ) : (
            <button type="button" disabled className={editorialButton({ size: "lg", className: "w-full" })}>
              <WhatsAppIcon className="h-4 w-4" />
              <span>{t.catalog.orderWhatsapp}</span>
            </button>
          )}
          <p className="mt-3 min-h-5 text-xs text-muted-foreground">
            {size ? `${colorName} · ${t.catalog.size}: ${size}` : t.catalog.chooseSizeFirst}
          </p>
        </div>

        <section className="mt-10 border-t border-border pt-6">
          <h3 className="type-eyebrow">{t.catalog.fabric}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{l(product.fabric)}</p>
        </section>

        <p className="mt-auto pt-10 text-xs leading-relaxed text-muted-foreground">{t.catalog.note}</p>
      </div>
    </div>
  );
}
