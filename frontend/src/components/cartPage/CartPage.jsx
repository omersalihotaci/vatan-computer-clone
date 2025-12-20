import { CartItemList } from "./CartItemList";
import { CartSteps } from "./CartSteps";
import { CartSummary } from "./CartSummary";

export default function CartPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <h2 className="text-xl font-bold text-primary mx-auto px-4 max-w-7xl py-4">Ürünlerim</h2>
            <div className="max-w-7xl mx-auto px-4  grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                    <CartItemList />
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <CartSummary />
                </div>
            </div>
        </div>
    );
}
