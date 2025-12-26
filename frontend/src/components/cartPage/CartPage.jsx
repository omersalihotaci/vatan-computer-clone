import { CartItemList } from "./CartItemList";
import { CartSummary } from "./CartSummary";
import { useCart } from "../../hooks/useCartApi";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



export default function CartPage() {
    const navigate = useNavigate();
    const { data: cart, isLoading } = useCart();
        console.log(cart);
    if (isLoading) return <div>Yükleniyor...</div>;
    if (!cart?.items?.length) {
        return (
            <div className="min-h-screen flex flex-col items-center mt-24">
                <div className="bg-primary rounded-full w-24 h-24 flex items-center justify-center mb-4">
                    <FaShoppingCart className="text-white" size={48} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
                        Sepetim
                    </h2>
                    <p className="text-center text-xl text-gray-800">
                        Sepetinizde Ürün Bulunmuyor.
                    </p>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-4 py-2 bg-primary hover:bg-indigo-950 text-white rounded-lg"
                >
                    Alışverişe Başla
                </button>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <h2 className="text-xl font-bold text-primary mx-auto px-4 max-w-7xl py-4">Ürünlerim</h2>
            <div className="max-w-7xl mx-auto px-4  grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                    <CartItemList cart={cart} />
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <CartSummary />
                </div>
            </div>
        </div>
    );
}
