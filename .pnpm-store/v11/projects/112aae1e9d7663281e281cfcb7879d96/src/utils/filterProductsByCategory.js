export function filterProductsByCategory(products, categoryId) {
  return products.filter((product) => product.categoryId === categoryId)
}
