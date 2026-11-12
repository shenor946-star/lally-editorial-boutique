import { cva, type VariantProps } from "class-variance-authority";

/** Editorial buttons: square corners, spaced capitals, fill slides in on hover. */
export const editorialButton = cva(
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden px-7 py-4 type-eyebrow transition-colors duration-500 ease-[var(--ease-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-40 before:absolute before:inset-0 before:-z-0 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:ease-[var(--ease-soft)] hover:before:scale-y-100 disabled:hover:before:scale-y-0 [&>*]:relative",
  {
    variants: {
      variant: {
        solid: "bg-ink text-milk before:bg-graphite",
        outline: "border border-ink text-ink before:bg-ink hover:text-milk",
        light: "border border-milk/60 text-milk before:bg-milk hover:text-ink",
        milk: "bg-milk text-ink before:bg-silver",
      },
      size: {
        md: "",
        lg: "px-9 py-5",
        sm: "px-4 py-3",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

export type EditorialButtonProps = VariantProps<typeof editorialButton>;
