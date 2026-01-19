import { Navigate } from "react-router-dom";
import { useCart } from "../hooks/useCartApi";

export default function CheckoutGuard({ children }) {
    const { data: cart, isLoading } = useCart();

    //  Cart daha gelmediyse karar verme
    if (isLoading) return null;

    //  Sepet yoksa checkout yok
    if (!cart || cart.items.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    return children;
}
