import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import FeaturedProducts from "../components/product-card/FeaturedProducts";
import Slider from "../components/Slider";
import BestSellerProducts from "../components/product-card/BestSellerProducts";
import CategoryLayout from "../components/categoryPage/CategoryLayout";
import AuthLayout from "../components/auth/AuthLayout";
import ProductDetailPage from "../components/product-detail-page/ProductDetailPage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true, //Bu, parent path (/) için varsayılan (default) child sayfadır
                element: (
                    <>
                        <Slider />
                        <FeaturedProducts />
                        <BestSellerProducts />
                    </>
                ),
            },
            {
                path: "product/:id",
                element: <ProductDetailPage />,
            },
            {
                path: "category/:categoryId",
                element: <CategoryLayout />,
            },
            {
                path: "auth",
                element:<AuthLayout/>,
            }
        ],
    },
]);