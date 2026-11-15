/**
 * ============================================================
 *  LALLY BOUTIQUE — КАТАЛОГ ТОВАРОВ / MƏHSUL KATALOQU
 * ============================================================
 *
 *  ФОТО. У каждого товара своя папка с артикулом:
 *        src/assets/products/lb-009/
 *  В неё кладём фото каждого цвета, пронумерованные по порядку:
 *        black-1.webp   ← главное фото (вертикальное 4:5, светлый фон)
 *        black-2.webp   ← второй ракурс / деталь
 *        black-3.webp   ← ещё фото (сколько угодно)
 *        ivory-1.webp   ← первое фото молочного цвета …
 *  Имя файла = код цвета из списка COLORS ниже + номер. Подходят
 *  .webp, .jpg, .jpeg и .png. Сайт находит фото сам — импорты не нужны.
 *
 *  ТОВАР. Скопируйте любой блок { ... } в списке ITEMS, вставьте
 *  в конец и поменяйте данные:
 *     sku         — артикул, например "LB-009" (папка: lb-009)
 *     category    — "dresses" | "suits" | "casual" | "evening"
 *     isNew       — true, чтобы товар был в разделе «Новинки»
 *     colors      — коды цветов, первый показывается по умолчанию
 *     name        — название на русском (ru) и азербайджанском (az)
 *     description — краткое описание на двух языках
 *     fabric      — состав ткани и уход на двух языках
 *     sizes       — доступные размеры: ["S", "M", "L", "XL"]
 *     oldPrice    — старая цена в AZN
 *     price       — новая цена со скидкой в AZN
 *
 *  НОВЫЙ ЦВЕТ. Если нужного цвета нет в COLORS — добавьте строку:
 *     код: { name: { ru: "…", az: "…" }, swatch: "#RRGGBB" },
 *
 *  Чтобы убрать товар — удалите его блок { ... }.
 *  Порядок в списке = порядок на сайте.
 * ============================================================
 */

import type { Localized } from "@/i18n/translations";
import type { ItemKind } from "@/lib/whatsapp";

export const ALL_SIZES = ["S", "M", "L", "XL"] as const;
export type Size = (typeof ALL_SIZES)[number];

export const CATEGORY_IDS = ["dresses", "suits", "casual", "evening"] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

/** Catalog filters in menu order. "new" shows every product with isNew: true. */
export const FILTER_IDS = ["dresses", "suits", "casual", "evening", "new"] as const;
export type FilterId = (typeof FILTER_IDS)[number];

/** Colour names shown on the site and in WhatsApp messages, plus the swatch shade. */
export const COLORS = {
  black: { name: { ru: "Чёрный", az: "Qara" }, swatch: "#151515" },
  ivory: { name: { ru: "Молочный", az: "Süd rəngi" }, swatch: "#F1EADB" },
  cream: { name: { ru: "Кремовый", az: "Krem" }, swatch: "#E6DCC6" },
  bordeaux: { name: { ru: "Бордо", az: "Bordo" }, swatch: "#5E1521" },
  burgundy: { name: { ru: "Винный", az: "Şərabı" }, swatch: "#6E1527" },
  scarlet: { name: { ru: "Алый", az: "Al-qırmızı" }, swatch: "#A8121C" },
  red: { name: { ru: "Красный", az: "Qırmızı" }, swatch: "#B0141E" },
  graphite: { name: { ru: "Графит", az: "Qrafit" }, swatch: "#4A4A4D" },
  grey: { name: { ru: "Серый меланж", az: "Boz melanj" }, swatch: "#A9A9AA" },
  silver: { name: { ru: "Серебро", az: "Gümüşü" }, swatch: "#C4C6CA" },
  champagne: { name: { ru: "Шампань", az: "Şampan" }, swatch: "#C9AE82" },
  emerald: { name: { ru: "Изумрудный", az: "Zümrüdü" }, swatch: "#0F5132" },
  camel: { name: { ru: "Кэмел", az: "Kemel" }, swatch: "#C19A6B" },
  mocha: { name: { ru: "Мокко", az: "Mokka" }, swatch: "#5A3E2B" },
  olive: { name: { ru: "Оливковый", az: "Zeytuni" }, swatch: "#5B6236" },
} satisfies Record<string, { name: Localized; swatch: string }>;
export type ColorId = keyof typeof COLORS;

export type ProductColor = { id: ColorId; name: Localized; swatch: string; images: string[] };

type ProductInput = {
  sku: string;
  category: CategoryId;
  isNew?: boolean;
  colors: ColorId[];
  name: Localized;
  description: Localized;
  fabric: Localized;
  sizes: Size[];
  oldPrice: number;
  price: number;
  /** Optional: how the WhatsApp message names the item. Picked from the category when omitted. */
  kind?: ItemKind;
};

export type Product = Omit<ProductInput, "colors"> & {
  colors: ProductColor[];
  /** Main photo of the first colour (used on the home page). */
  image: string;
};

const ITEMS: ProductInput[] = [
  {
    sku: "LB-001",
    category: "dresses",
    isNew: true,
    colors: ["black", "ivory", "bordeaux"],
    name: { ru: "Коктейль Шанель", az: "Kokteyl Şanel" },
    description: {
      ru: "Приталенное мини-платье из твида букле с бахромой по краю и фактурными пуговицами. Классика, которая не выходит из моды.",
      az: "Kənarları saçaqlı, faktur düymələri olan buklə tvid mini don. Dəbdən heç vaxt düşməyən klassika.",
    },
    fabric: {
      ru: "Твид букле: 60% хлопок, 30% вискоза, 10% полиэстер. Подкладка — 100% вискоза. Только деликатная химчистка.",
      az: "Buklə tvid: 60% pambıq, 30% viskoza, 10% poliester. Astar — 100% viskoza. Yalnız zərif kimyəvi təmizləmə.",
    },
    sizes: ["S", "M", "L"],
    oldPrice: 180,
    price: 145,
  },
  {
    sku: "LB-002",
    category: "suits",
    colors: ["graphite", "cream"],
    name: { ru: "Графит", az: "Qrafit" },
    description: {
      ru: "Двубортный жакет оверсайз и широкие брюки со стрелками из костюмной шерсти.",
      az: "Kostyum yunundan ikidöşlü oversayz pencək və ütülü enli şalvar.",
    },
    fabric: {
      ru: "Костюмная ткань: 70% шерсть, 30% полиэстер. Жакет на подкладке из вискозы. Химчистка.",
      az: "Kostyum parçası: 70% yun, 30% poliester. Pencək viskoza astarlıdır. Kimyəvi təmizləmə.",
    },
    sizes: ["S", "M", "L", "XL"],
    oldPrice: 200,
    price: 165,
  },
  {
    sku: "LB-003",
    category: "evening",
    colors: ["scarlet", "black", "ivory"],
    name: { ru: "Скарлет", az: "Skarlet" },
    description: {
      ru: "Вечернее платье в пол из струящегося атласа с драпировкой на одно плечо и высоким разрезом.",
      az: "Tək çiyinli drapirovkası və hündür yarığı olan, axıcı atlasdan uzun axşam donu.",
    },
    fabric: {
      ru: "Плотный атлас: 95% полиэстер, 5% эластан, мягкий блеск. Ручная стирка при 30°, гладить с изнанки.",
      az: "Sıx atlas: 95% poliester, 5% elastan, yumşaq parıltı. 30°-də əl ilə yuma, tərs üzündən ütüləyin.",
    },
    sizes: ["M", "L"],
    oldPrice: 195,
    price: 159,
  },
  {
    sku: "LB-004",
    category: "evening",
    isNew: true,
    colors: ["silver", "champagne"],
    name: { ru: "Серебряная луна", az: "Gümüş Ay" },
    description: {
      ru: "Длинное платье-комбинация из жидкого атласа с мягкой драпировкой у выреза.",
      az: "Yaxasında yumşaq drapirovka olan, maye atlasdan uzun kombinezon-don.",
    },
    fabric: {
      ru: "Жидкий атлас: 100% полиэстер с шёлковым блеском, косой крой. Деликатная стирка при 30°.",
      az: "Maye atlas: ipək parıltılı 100% poliester, çəp biçim. 30°-də zərif yuma.",
    },
    sizes: ["S", "M"],
    oldPrice: 175,
    price: 139,
  },
  {
    sku: "LB-005",
    category: "dresses",
    colors: ["emerald", "burgundy", "black"],
    name: { ru: "Изумруд", az: "Zümrüd" },
    description: {
      ru: "Шёлковое платье миди с запахом, поясом, объёмными рукавами и струящейся юбкой.",
      az: "Kəmərli, həcmli qolları və axıcı ətəyi olan ipək midi don.",
    },
    fabric: {
      ru: "Шёлк армани: 90% вискоза, 10% натуральный шёлк, без подкладки. Ручная стирка при 30°.",
      az: "Armani ipəyi: 90% viskoza, 10% təbii ipək, astarsız. 30°-də əl ilə yuma.",
    },
    sizes: ["S", "M", "L", "XL"],
    oldPrice: 160,
    price: 125,
  },
  {
    sku: "LB-006",
    category: "casual",
    colors: ["camel", "grey"],
    name: { ru: "Кашемир", az: "Kaşemir" },
    description: {
      ru: "Мягкий трикотажный комплект: свободный джемпер и широкие брюки. Уют в премиальном исполнении.",
      az: "Yumşaq trikotaj dəst: sərbəst cemper və enli şalvar. Premium rahatlıq.",
    },
    fabric: {
      ru: "Трикотаж: 30% кашемир, 50% шерсть мериноса, 20% нейлон. Ручная стирка, сушить горизонтально.",
      az: "Trikotaj: 30% kaşemir, 50% merinos yunu, 20% neylon. Əl ilə yuma, üfüqi vəziyyətdə qurudun.",
    },
    sizes: ["S", "M", "L"],
    oldPrice: 150,
    price: 119,
  },
  {
    sku: "LB-007",
    category: "dresses",
    isNew: true,
    colors: ["black", "ivory", "red"],
    name: { ru: "Нуар", az: "Nuar" },
    description: {
      ru: "Платье-жакет с острыми плечами, лацканами и серебристыми пуговицами. Строгий силуэт для дня и вечера.",
      az: "İti çiyinli, yaxalıqlı və gümüşü düyməli pencək-don. Gündüz və axşam üçün sərt siluet.",
    },
    fabric: {
      ru: "Шерстяной креп: 65% шерсть, 35% полиэстер. Подкладка из вискозы. Химчистка.",
      az: "Yun krep: 65% yun, 35% poliester. Viskoza astar. Kimyəvi təmizləmə.",
    },
    sizes: ["M", "L", "XL"],
    oldPrice: 170,
    price: 135,
  },
  {
    sku: "LB-008",
    category: "casual",
    colors: ["mocha", "olive"],
    name: { ru: "Мокко", az: "Mokka" },
    description: {
      ru: "Льняное платье-рубашка миди с поясом и закатанными рукавами.",
      az: "Kəmərli və qatlanmış qollu kətan köynək-don, midi uzunluq.",
    },
    fabric: {
      ru: "100% стираный лён, мягкий на ощупь. Машинная стирка при 30°, гладить слегка влажным.",
      az: "100% yuyulmuş kətan, yumşaq toxunuş. 30°-də maşında yuma, bir az nəm halda ütüləyin.",
    },
    sizes: ["S", "M", "L", "XL"],
    oldPrice: 135,
    price: 109,
    kind: "dress",
  },
];

// Every photo in src/assets/products/<sku>/<colour>-<n>.<ext>, found at build time.
const PHOTO_FILES = import.meta.glob<string>("../assets/products/*/*.{webp,jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

/** Photos of one colour, in file-number order. */
export function photosFor(files: Record<string, string>, sku: string, color: string): string[] {
  const folder = sku.toLowerCase();
  const re = new RegExp(`/${folder}/${color}-(\\d+)\\.(webp|jpe?g|png)$`, "i");
  return Object.entries(files)
    .map(([path, url]) => ({ n: Number(path.match(re)?.[1] ?? NaN), url }))
    .filter((f) => !Number.isNaN(f.n))
    .sort((a, b) => a.n - b.n)
    .map((f) => f.url);
}

export function buildProducts(items: ProductInput[], files: Record<string, string>): Product[] {
  return items.flatMap((item) => {
    const colors: ProductColor[] = item.colors
      .map((id) => ({ id, ...COLORS[id], images: photosFor(files, item.sku, id) }))
      .filter((c) => c.images.length > 0);
    const first = colors[0]?.images[0];
    if (!first) {
      console.warn(`[catalog] ${item.sku}: no photos found in src/assets/products/${item.sku.toLowerCase()}/`);
      return [];
    }
    return [{ ...item, colors, image: first }];
  });
}

export const PRODUCTS: Product[] = buildProducts(ITEMS, PHOTO_FILES);

/** WhatsApp wording: dresses and evening wear are "платье / don", suits "костюм", the rest "модель". */
export function productKind(p: Pick<Product, "kind" | "category">): ItemKind {
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
