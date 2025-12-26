import { useNavigate, useLocation } from "react-router-dom";
import { useCart, useDeleteCart } from "../../hooks/useCartApi";
import { useCheckout } from "../../hooks/useCheckout";

export function CartSummary() {
    const navigate = useNavigate();
    const location = useLocation();
    const { data: cart } = useCart();
    const { selectedAddressId } = useCheckout();
    const {mutate: deleteCart} = useDeleteCart();

    if (!cart) return null;

    const kdv = cart.cartTotal * 0.2;
    const araToplam = cart.cartTotal - kdv;

    const isShippingPage = location.pathname === "/checkout/shipping";
    const isPaymentPage = location.pathname === "/checkout/payment";
    const canContinue = !isShippingPage || Boolean(selectedAddressId);

    const handleClick = () => {
        if (isShippingPage) {
            if (!selectedAddressId) return;
            navigate("/checkout/payment");
        } else if (isPaymentPage) {
            deleteCart();
            navigate("/payment-success");
        } else {
            navigate("/checkout/shipping");
     }
    };


    return (
        <div className="bg-white border rounded-lg p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Sipariş Özeti</h3>

            <div className="flex justify-between mb-2">
                <span>Ara Toplam</span>
                <span>{araToplam.toLocaleString("tr-TR")} TL</span>
            </div>

            <div className="flex justify-between mb-4">
                <span>KDV</span>
                <span>{kdv.toLocaleString("tr-TR")} TL</span>
            </div>

            <div className="flex justify-between text-xl font-semibold text-blue-900">
                <span>TOPLAM</span>
                <span>{cart.cartTotal.toLocaleString("tr-TR")} TL</span>
            </div>

            <button
                disabled={!canContinue}
                onClick={handleClick}
                className={`
                    mt-6 w-full py-3 rounded-full text-lg font-semibold transition
                    ${
                        canContinue
                            ? "bg-blue-900 text-white hover:bg-blue-800"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                `}
            >
                {isShippingPage ? "Teslimatı Onayla →" : isPaymentPage ? "Siparişi Onayla →" : "Sepeti Onayla →"}
            </button>

            {isShippingPage && !selectedAddressId && (
                <p className="text-xs text-red-600 mt-2">
                    Lütfen teslimat adresi seçiniz
                </p>
            )}
        </div>
    );
}
