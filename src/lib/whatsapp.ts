import { SITE } from "@/config/site";
import type { Lang } from "@/i18n/translations";

/** What the item is called in the order message. */
export type ItemKind = "dress" | "suit" | "item";

const RU_NOUN: Record<ItemKind, { noun: string; tail: string }> = {
  dress: { noun: "платье", tail: "доступно ли оно для заказа?" },
  suit: { noun: "костюм", tail: "доступен ли он для заказа?" },
  item: { noun: "модель", tail: "доступна ли она для заказа?" },
};

const AZ_NOUN: Record<ItemKind, string> = {
  dress: "donunu",
  suit: "kostyumunu",
  item: "modelini",
};

export type OrderInput = {
  lang: Lang;
  kind: ItemKind;
  name: string;
  sku: string;
  /** Leave empty when the customer has not chosen a size yet. */
  size?: string;
  /** Colour name in the message language, e.g. "Чёрный" / "Qara". */
  color?: string;
};

export function buildOrderMessage({ lang, kind, name, sku, size, color }: OrderInput): string {
  const tone = color ? color.toLocaleLowerCase(lang) : "";
  if (lang === "az") {
    const head = `Salam! "${name}" ${AZ_NOUN[kind]} sifariş etmək istəyirəm.`;
    const parts = [`Artikül: ${sku}`, tone && `rəng: ${tone}`, size && `ölçü: ${size}`].filter(Boolean).join(", ");
    if (size) {
      return `${head} ${parts}. Zəhmət olmasa, sifariş üçün mövcud olub-olmadığını bildirin.`;
    }
    return `${head} ${parts}. Zəhmət olmasa, hansı ölçülərin mövcud olduğunu bildirin.`;
  }
  const { noun, tail } = RU_NOUN[kind];
  const parts = [`артикул ${sku}`, tone && `цвет ${tone}`, size && `размер ${size}`].filter(Boolean).join(", ");
  if (size) {
    return `Здравствуйте! Хочу заказать ${noun} "${name}", ${parts}. Подскажите, пожалуйста, ${tail}`;
  }
  return `Здравствуйте! Хочу заказать ${noun} "${name}", ${parts}. Подскажите, пожалуйста, какие размеры доступны для заказа?`;
}

/** Direct WhatsApp link with the text safely URL-encoded. */
export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
