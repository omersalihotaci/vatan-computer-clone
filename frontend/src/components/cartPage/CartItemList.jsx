import { CartItemCard } from "./CartItemCard";


export function CartItemList({ cart }) {
    
    return (
        <div className="space-y-4">
            {cart.items.map((item) => (
                <CartItemCard key={item.cartItemId} item={item} />
            ))}
        </div>
    );
}
