import { useMemo, useState, useEffect } from 'react';
import { 
  getProducts,
  getRecommendedProducts,
  getNewProducts,
  getProductById,
  getProductsByIds,
  getProductsByCategory,
  getRankedProducts,
  searchProducts
} from '../services/productService';

export function useProducts(categoryId) {
  const products = useMemo(()=> getProducts(), []);
  const recommendedProducts = useMemo(()=> getRecommendedProducts(categoryId), [categoryId]);
  const productsByCategory = useMemo(()=>getProductsByCategory(categoryId),[categoryId]);
  
  const newProducts = useMemo(() => getNewProducts(), []);
  
  /*-- searchPorducts --*/
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProducts = useMemo(() => {
    if(!searchQuery || !searchQuery.trim()){
      return[];
    }
    return searchProducts(searchQuery);
  }, [searchQuery]);
  
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }
  

  return{
    products,
    recommendedProducts,
    newProducts,
    searchQuery,
    filteredProducts,
    handleInputChange,

    getProductById,
    getProductsByIds,
    productsByCategory,
    getRankedProducts,
  }
}
