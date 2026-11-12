/** Discount in whole percent, e.g. 180 → 145 gives 19. */
export function discountPercent(oldPrice: number, price: number): number {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function formatPrice(value: number): string {
  return `${value} AZN`;
}
