import {useMemo} from 'react'
import { getRankedProducts } from '../services/productService'

export function useRankingProducts(categoryId) {
  const rankedProducts = useMemo(() => getRankedProducts(categoryId), [categoryId]);
  return {rankedProducts};
}
