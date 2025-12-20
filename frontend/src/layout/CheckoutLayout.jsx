import { CartSteps } from "../components/cartPage/CartSteps";
import { CheckoutProvider } from "../context/CheckoutContext";
import { Outlet } from "react-router-dom";

export default function CheckoutLayout() {
    return (
        <CheckoutProvider>
            <div className="min-h-screen bg-gray-50">
                <CartSteps />
                <Outlet />
            </div>
        </CheckoutProvider>
    );
}
