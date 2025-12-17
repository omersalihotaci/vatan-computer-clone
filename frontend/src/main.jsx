import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router.jsx";

const queryClient = new QueryClient();

import { AuthProvider } from "./context/AuthContext"; 


createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <RouterProvider router={router} />
            <ToastContainer />
        </AuthProvider>
    </QueryClientProvider>
);
