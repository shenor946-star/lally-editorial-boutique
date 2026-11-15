import { supabase } from "@/integrations/supabase/client";
import type { Lang } from "@/i18n/translations";

export type Enquiry = {
  sku: string;
  productName: string;
  size: string | null;
  color: string | null;
  price: number;
  lang: Lang;
  source: "modal" | "card";
};

/** Records a WhatsApp order click so the boutique can follow up. Never blocks the WhatsApp link. */
export function saveEnquiry(e: Enquiry): void {
  void supabase
    .from("product_enquiries")
    .insert({
      sku: e.sku,
      product_name: e.productName,
      size: e.size,
      color: e.color,
      price: e.price,
      lang: e.lang,
      source: e.source,
    })
    .then(({ error }) => {
      if (error) console.error("Could not save enquiry", error.message);
    });
}
