export function getDiscountRate(originalPrice, salePrice) {
  if (!originalPrice || originalPrice <= salePrice) {
    return 0
  }

  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}
