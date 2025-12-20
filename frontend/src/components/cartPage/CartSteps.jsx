import { useLocation } from "react-router-dom";

export function CartSteps() {
    const { pathname } = useLocation();

    const isCart = pathname === "/cart";
    const isShipping = pathname.startsWith("/checkout/shipping");
    const isPayment = pathname.startsWith("/checkout/payment");

    return (
        <div className="bg-blue-900 text-white py-4">
            <div className="max-w-xl mx-auto flex items-center gap-6">
                <Step active={isCart} label="Sepetim" />
                <Line />
                <Step active={isShipping} label="Teslimat" />
                <Line />
                <Step active={isPayment} label="Ödeme" />
            </div>
        </div>
    );
}

function Step({ label, active }) {
    return (
        <div
            className={`flex items-center gap-2 ${
                active ? "font-semibold" : "opacity-60"
            }`}
        >
            <div className="w-8 h-8 rounded-full bg-white text-blue-900 flex items-center justify-center">
                ✓
            </div>
            <span>{label}</span>
        </div>
    );
}

const Line = () => <div className="flex-1 h-px bg-white/40" />;
