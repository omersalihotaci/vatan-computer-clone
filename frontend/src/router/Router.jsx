import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import FeaturedProducts from "../components/FeaturedProducts";
import Slider from "../components/Slider";
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
                    </>
                ),
            },
            {
                path: "product/:productId",
                //element: <ProductDetailPage />,
            },
            {
                path: "category/:categoryId",
                // element: <CategoryProductsPage />,
            },
        ],
    },
]);