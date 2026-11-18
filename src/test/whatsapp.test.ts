import { describe, expect, it } from "vitest";

import { PRODUCTS, filterProducts, productKind } from "@/data/products";
import { discountPercent } from "@/lib/pricing";
import { buildOrderMessage, whatsappLink } from "@/lib/whatsapp";

describe("WhatsApp order messages", () => {
  it("builds the Russian dress message exactly as specified", () => {
    expect(buildOrderMessage({ lang: "ru", kind: "dress", name: "Коктейль Шанель", sku: "LB-001", size: "L" })).toBe(
      'Здравствуйте! Хочу заказать платье "Коктейль Шанель", артикул LB-001, размер L. Подскажите, пожалуйста, доступно ли оно для заказа?',
    );
  });

  it("builds the Azerbaijani dress message exactly as specified", () => {
    expect(buildOrderMessage({ lang: "az", kind: "dress", name: "Kokteyl Şanel", sku: "LB-001", size: "L" })).toBe(
      'Salam! "Kokteyl Şanel" donunu sifariş etmək istəyirəm. Artikül: LB-001, ölçü: L. Zəhmət olmasa, sifariş üçün mövcud olub-olmadığını bildirin.',
    );
  });

  it("includes the chosen colour and size in both languages", () => {
    expect(
      buildOrderMessage({ lang: "ru", kind: "dress", name: "Коктейль Шанель", sku: "LB-001", size: "L", color: "Чёрный" }),
    ).toBe(
      'Здравствуйте! Хочу заказать платье "Коктейль Шанель", артикул LB-001, цвет чёрный, размер L. Подскажите, пожалуйста, доступно ли оно для заказа?',
    );
    expect(
      buildOrderMessage({ lang: "az", kind: "dress", name: "Kokteyl Şanel", sku: "LB-001", size: "L", color: "Qara" }),
    ).toBe(
      'Salam! "Kokteyl Şanel" donunu sifariş etmək istəyirəm. Artikül: LB-001, rəng: qara, ölçü: L. Zəhmət olmasa, sifariş üçün mövcud olub-olmadığını bildirin.',
    );
  });

  it("gives every catalog colour at least one photo", () => {
    for (const p of PRODUCTS) for (const c of p.colors) expect(c.images.length).toBeGreaterThan(0);
  });

  it("links to the boutique number with the text encoded", () => {
    const url = whatsappLink('Salam! "Kokteyl Şanel" ölçü: L');
    expect(url.startsWith("https://wa.me/994706520292?text=")).toBe(true);
    expect(decodeURIComponent(url.split("?text=")[1] ?? "")).toBe('Salam! "Kokteyl Şanel" ölçü: L');
  });
});

describe("catalog data", () => {
  it("keeps every demo price within 100–200 AZN and discounted", () => {
    for (const p of PRODUCTS) {
      expect(p.price).toBeGreaterThanOrEqual(100);
      expect(p.oldPrice).toBeLessThanOrEqual(200);
      expect(p.price).toBeLessThan(p.oldPrice);
    }
  });

  it("computes the LB-001 discount (180 → 145 = 19%)", () => {
    expect(discountPercent(180, 145)).toBe(19);
  });

  it("'new' filter shows only new arrivals and suits use 'костюм'", () => {
    expect(filterProducts(PRODUCTS, "new").every((p) => p.isNew)).toBe(true);
    const suit = PRODUCTS.find((p) => p.category === "suits")!;
    expect(productKind(suit)).toBe("suit");
  });
});
