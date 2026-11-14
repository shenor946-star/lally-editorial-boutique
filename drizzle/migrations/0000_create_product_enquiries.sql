CREATE TABLE public.product_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  sku text NOT NULL CHECK (char_length(sku) BETWEEN 1 AND 32),
  product_name text NOT NULL CHECK (char_length(product_name) BETWEEN 1 AND 200),
  size text CHECK (size IN ('S', 'M', 'L', 'XL')),
  price numeric(8,2) CHECK (price >= 0 AND price < 100000),
  lang text NOT NULL DEFAULT 'ru' CHECK (lang IN ('ru', 'az')),
  source text NOT NULL DEFAULT 'modal' CHECK (source IN ('modal', 'card'))
);

GRANT INSERT ON public.product_enquiries TO anon, authenticated;
GRANT ALL ON public.product_enquiries TO service_role;

ALTER TABLE public.product_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can submit enquiries"
ON public.product_enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX product_enquiries_created_at_idx ON public.product_enquiries (created_at DESC);