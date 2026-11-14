/**
 * ============================================================
 *  LALLY BOUTIQUE — КАТАЛОГ ТОВАРОВ / MƏHSUL KATALOQU
 * ============================================================
 *
 *  Как добавить новое платье:
 *
 *  1. Загрузите вертикальное студийное фото (пропорция 4:5,
 *     светлый фон, как у остальных) в папку
 *     src/assets/products/  — например  lb-009.webp или .jpg
 *
 *  2. Добавьте строку импорта ниже, рядом с остальными:
 *        import lb009 from "@/assets/products/lb-009.webp";
 *
 *  3. Скопируйте любой блок { ... } в списке PRODUCTS,
 *     вставьте в конец списка и поменяйте данные:
 *        sku        — артикул, например "LB-009"
 *        category   — "dresses" | "suits" | "casual" | "evening"
 *        isNew      — true, чтобы товар был в разделе «Новинки»
 *        image      — имя из импорта (lb009)
 *        name       — название на русском (ru) и азербайджанском (az)
 *        description— краткое описание на двух языках
 *        sizes      — доступные размеры: ["S", "M", "L", "XL"]
 *        oldPrice   — старая цена в AZN
 *        price      — новая цена со скидкой в AZN
 *
 *  Чтобы убрать товар — удалите его блок { ... }.
 *  Порядок в списке = порядок на сайте.
 * ============================================================
 */

import type { Localized } from "@/i18n/translations";
import type { ItemKind } from "@/lib/whatsapp";

import lb001 from "@/assets/products/lb-001.webp";
import lb002 from "@/assets/products/lb-002.webp";
import lb003 from "@/assets/products/lb-003.webp";
import lb004 from "@/assets/products/lb-004.webp";
import lb005 from "@/assets/products/lb-005.webp";
import lb006 from "@/assets/products/lb-006.webp";
import lb007 from "@/assets/products/lb-007.webp";
import lb008 from "@/assets/products/lb-008.webp";

export const ALL_SIZES = ["S", "M", "L", "XL"] as const;
export type Size = (typeof ALL_SIZES)[number];

export const CATEGORY_IDS = ["dresses", "suits", "casual", "evening"] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

/** Catalog filters in menu order. "new" shows every product with isNew: true. */
export const FILTER_IDS = ["dresses", "suits", "casual", "evening", "new"] as const;
export type FilterId = (typeof FILTER_IDS)[number];

export type Product = {
  sku: string;
  category: CategoryId;
  isNew?: boolean;
  image: string;
  name: Localized;
  description: Localized;
  sizes: Size[];
  oldPrice: number;
  price: number;
  /** Optional: how the WhatsApp message names the item. Picked from the category when omitted. */
  kind?: ItemKind;
};

export const PRODUCTS: Product[] = [
  {
    sku: "LB-001",
    category: "dresses",
    isNew: true,
    image: lb001,
    name: { ru: "Коктейль Шанель", az: "Kokteyl Şanel" },
    description: {
      ru: "Приталенное мини-платье из чёрного твида с бахромой по краю и фактурными пуговицами. Классика, которая не выходит из моды.",
      az: "Kənarları saçaqlı, faktur düymələri olan qara tvid mini don. Dəbdən heç vaxt düşməyən klassika.",
    },
    sizes: ["S", "M", "L"],
    oldPrice: 180,
    price: 145,
  },
  {
    sku: "LB-002",
    category: "suits",
    image: lb002,
    name: { ru: "Графит", az: "Qrafit" },
    description: {
      ru: "Двубортный жакет оверсайз и широкие брюки со стрелками из шерсти графитового оттенка.",
      az: "Qrafit rəngli yundan ikidöşlü oversayz pencək və ütülü enli şalvar.",
    },
    sizes: ["S", "M", "L", "XL"],
    oldPrice: 200,
    price: 165,
  },
  {
    sku: "LB-003",
    category: "evening",
    image: lb003,
    name: { ru: "Скарлет", az: "Skarlet" },
    description: {
      ru: "Вечернее платье в пол из струящегося алого атласа с драпировкой на одно плечо и высоким разрезом.",
      az: "Tək çiyinli drapirovkası və hündür yarığı olan, axıcı al-qırmızı atlasdan uzun axşam donu.",
    },
    sizes: ["M", "L"],
    oldPrice: 195,
    price: 159,
  },
  {
    sku: "LB-004",
    category: "evening",
    isNew: true,
    image: lb004,
    name: { ru: "Серебряная луна", az: "Gümüş Ay" },
    description: {
      ru: "Длинное платье-комбинация из жидкого серебристого атласа с мягкой драпировкой у выреза.",
      az: "Yaxasında yumşaq drapirovka olan, gümüşü maye atlasdan uzun kombinezon-don.",
    },
    sizes: ["S", "M"],
    oldPrice: 175,
    price: 139,
  },
  {
    sku: "LB-005",
    category: "dresses",
    image: lb005,
    name: { ru: "Изумруд", az: "Zümrüd" },
    description: {
      ru: "Шёлковое платье миди с запахом, поясом, объёмными рукавами и струящейся юбкой насыщенного изумрудного цвета.",
      az: "Kəmərli, həcmli qolları və axıcı ətəyi olan, zəngin zümrüd rəngli ipək midi don.",
    },
    sizes: ["S", "M", "L", "XL"],
    oldPrice: 160,
    price: 125,
  },
  {
    sku: "LB-006",
    category: "casual",
    image: lb006,
    name: { ru: "Кашемир", az: "Kaşemir" },
    description: {
      ru: "Мягкий трикотажный комплект цвета кэмел: свободный джемпер и широкие брюки. Уют в премиальном исполнении.",
      az: "Kemel rəngli yumşaq trikotaj dəst: sərbəst cemper və enli şalvar. Premium rahatlıq.",
    },
    sizes: ["S", "M", "L"],
    oldPrice: 150,
    price: 119,
  },
  {
    sku: "LB-007",
    category: "dresses",
    isNew: true,
    image: lb007,
    name: { ru: "Нуар", az: "Nuar" },
    description: {
      ru: "Платье-жакет с острыми плечами, лацканами и серебристыми пуговицами. Строгий силуэт для дня и вечера.",
      az: "İti çiyinli, yaxalıqlı və gümüşü düyməli pencək-don. Gündüz və axşam üçün sərt siluet.",
    },
    sizes: ["M", "L", "XL"],
    oldPrice: 170,
    price: 135,
  },
  {
    sku: "LB-008",
    category: "casual",
    image: lb008,
    name: { ru: "Мокко", az: "Mokka" },
    description: {
      ru: "Льняное платье-рубашка миди с поясом и закатанными рукавами в глубоком оттенке мокко.",
      az: "Dərin mokka çalarında kəmərli və qatlanmış qollu kətan köynək-don, midi uzunluq.",
    },
    sizes: ["S", "M", "L", "XL"],
    oldPrice: 135,
    price: 109,
    kind: "dress",
  },
];

/** WhatsApp wording: dresses and evening wear are "платье / don", suits "костюм", the rest "модель". */
export function productKind(p: Product): ItemKind {
  if (p.kind) return p.kind;
  if (p.category === "suits") return "suit";
  if (p.category === "dresses" || p.category === "evening") return "dress";
  return "item";
}

export function filterProducts(products: Product[], filter?: FilterId): Product[] {
  if (!filter) return products;
  if (filter === "new") return products.filter((p) => p.isNew);
  return products.filter((p) => p.category === filter);
}
