import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CategoryPage from '../pages/CategoryPage'
import PromotionPage from '../pages/PromotionPage'
import SearchPage from '../pages/SearchPage'
import StoreReadyPage from '../pages/StoreReadyPage'
import NotFoundPage from '../pages/NotFoundPage'
import { PATHS } from './paths'

export const router = createBrowserRouter(
  [
    {
      path: PATHS.home,
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: PATHS.productDetail,
          element: <ProductDetailPage />,
        },
        {
          path: PATHS.category,
          element: <CategoryPage />,
        },
        {
          path: PATHS.search,
          element: <SearchPage />,
        },
        {
          path: 'store',
          element: <StoreReadyPage />,
        },
        {
          path: PATHS.promotion,
          element: <PromotionPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
  },
)
