import { products } from '../data/products';

export function getProducts() {
  return products;
}

export function getProductById(productId) {
  return products.find((product) => String(product.id) === String(productId)) || null;
}

export function getProductsByIds(productIds) {
  if (!productIds || productIds.length === 0) return [];
  const stringIds = productIds.map(id => String(id))
  return products.filter((product) => stringIds.includes(String(product.id)))
}

export function getProductsByCategory(categoryId) {
  if(!categoryId) return products
  return products.filter((product) => String(product.categoryId) === String(categoryId))
}

export function getRecommendedProducts(){
  const recommend = products.filter(product => product.isRecommended === true);
  return [...recommend].sort((a, b) => (a.recommendOrder || 0) - (b.recommendOrder || 0));
}

export function getNewProducts(){
  return products.filter((product) => product.isNew === true);
}

export function searchProducts(query){
  if(!query || !query.trim()) return products;
  const trimQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    const isNameMatch = product.name.toLowerCase().includes(trimQuery);
    const isKeywordMatch = product.keywords.some((k)=>k.toLowerCase().includes(trimQuery));

    return isNameMatch || isKeywordMatch;
  }); 
}

export function getRankedProducts(categoryId){
  if(!products) return [];
  return products.filter(product => product.categoryId === categoryId).sort((a, b) => a.rank - b.rank);
}