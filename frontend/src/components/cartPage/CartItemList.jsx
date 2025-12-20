import { useCart } from "../../hooks/useCartApi";
import { CartItemCard } from "./CartItemCard";


export function CartItemList() {
    const { data:cart, isLoading } = useCart();
    console.log(cart);
    if (isLoading) return <div>Yükleniyor...</div>;

    return (
        <div className="space-y-4">
            

            {cart.items.map((item) => (
                <CartItemCard key={item.cartItemId} item={item} />
            ))}
        </div>
    );
}
