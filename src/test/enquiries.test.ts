import { describe, expect, it, vi } from "vitest";

const insert = vi.fn(() => Promise.resolve({ error: null }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: vi.fn(() => ({ insert })) },
}));

import { saveEnquiry } from "@/lib/enquiries";

describe("saveEnquiry", () => {
  it("stores the item and the size the customer picked", () => {
    saveEnquiry({ sku: "LB-001", productName: "Коктейль Шанель", size: "L", color: "Чёрный", price: 145, lang: "ru", source: "modal" });
    expect(insert).toHaveBeenCalledWith({
      sku: "LB-001",
      product_name: "Коктейль Шанель",
      size: "L",
      color: "Чёрный",
      price: 145,
      lang: "ru",
      source: "modal",
    });
  });
});
