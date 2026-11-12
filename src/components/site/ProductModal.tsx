import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { ALL_SIZES, productKind, type Product, type Size } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageProvider";
import { discountPercent, formatPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";

import { editorialButton } from "./button-styles";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Props = {
  product: Product | null;
  onClose: () => void;
};

export function ProductModal({ product, onClose }: Props) {
  const { t, l, lang } = useLanguage();
  const [size, setSize] = useState<Size | null>(null);

  useEffect(() => {
    // Pre-select when only one size exists; otherwise the customer chooses.
    setSize(product && product.sizes.length === 1 ? product.sizes[0] : null);
  }, [product]);

  const name = product ? l(product.name) : "";
  const off = product ? discountPercent(product.oldPrice, product.price) : 0;
  const waHref =
    product && size
      ? whatsappLink(buildOrderMessage({ lang, kind: productKind(product), name, sku: product.sku, size }))
      : null;

  return (
    <Dialog.Root open={!!product} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className="fixed inset-0 z-[70] overflow-y-auto bg-background outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-8 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:duration-700 md:inset-4 lg:inset-8"
          aria-describedby={undefined}
        >
          {product && (
            <div className="grid min-h-full md:grid-cols-[1.15fr_1fr]">
              {/* Image */}
              <div className="relative flex min-h-[62svh] items-center justify-center overflow-hidden bg-secondary px-6 pb-6 pt-16 md:min-h-0 md:p-12">
                <span
                  aria-hidden="true"
                  className="type-masthead pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[38vw] text-background md:text-[16vw]"
                >
                  {product.sku.replace(/\D/g, "").slice(-3)}
                </span>
                <img
                  src={product.image}
                  alt={name}
                  className="filter-float relative max-h-[56svh] w-auto object-contain animate-fade-up md:max-h-[calc(100svh-9rem)] lg:max-h-[calc(100svh-11rem)]"
                />
                {off > 0 && (
                  <span className="absolute left-5 top-5 bg-ink px-3 py-1.5 type-eyebrow text-milk md:left-8 md:top-8">
                    −{off}%
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col px-6 py-10 md:px-12 md:py-16 lg:px-16">
                <p className="type-eyebrow text-muted-foreground">
                  {t.catalog.categories[product.category]}
                  {product.isNew ? ` · ${t.catalog.isNew}` : ""}
                </p>
                <Dialog.Title className="mt-5 font-serif text-5xl leading-[0.95] md:text-6xl lg:text-7xl">
                  {name}
                </Dialog.Title>
                <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
                  {l(product.description)}
                </p>

                <dl className="mt-8 border-y border-border py-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="type-eyebrow text-muted-foreground">{t.catalog.sku}</dt>
                    <dd className="font-semibold tracking-[0.12em]">{product.sku}</dd>
                  </div>
                </dl>

                <fieldset className="mt-8">
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
                    {size ? `${t.catalog.size}: ${size}` : t.catalog.chooseSizeFirst}
                  </p>
                </div>

                <p className="mt-auto pt-10 text-xs leading-relaxed text-muted-foreground">{t.catalog.note}</p>
              </div>
            </div>
          )}

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
