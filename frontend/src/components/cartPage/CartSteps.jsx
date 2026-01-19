import { Link, useLocation, useNavigate } from "react-router-dom";
import logoB from "../../assets/logo/logoBlue.png";

export function CartSteps() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isCart = pathname === "/cart";
    const isShipping = pathname.startsWith("/checkout/shipping");
    const isPayment = pathname.startsWith("/checkout/payment");

    return (
        <div className="bg-blue-900 text-white py-4">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[auto_1fr] items-center gap-4">
                {/* LOGO */}
                <Link to="/" className="flex justify-center lg:justify-start">
                    <img
                        src={logoB}
                        alt="Vatan Logo"
                        className="w-[108px] h-auto"
                    />
                </Link>

                {/* STEPS */}
                <div className="flex items-center justify-center gap-6">
                    <Step
                        active={isCart}
                        label="Sepetim"
                        onClick={() => navigate("/cart")}
                    />
                    <Line />
                    <Step
                        active={isShipping}
                        label="Teslimat"
                        onClick={() => navigate("/checkout/shipping")}
                    />
                    <Line />
                    <Step
                        active={isPayment}
                        label="Ödeme"
                        onClick={() => navigate("/checkout/payment")}
                    />
                </div>
            </div>
        </div>
    );
}
function Step({ label, active, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-2 cursor-pointer select-none transition
                ${active ? "font-semibold" : "opacity-60 hover:opacity-100"}
            `}
        >
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${
                        active
                            ? "bg-white text-blue-900"
                            : "bg-white/70 text-blue-900"
                    }
                `}
            >
                ✓
            </div>
            <span className="whitespace-nowrap">{label}</span>
        </div>
    );
}
const Line = () => <div className="w-8 h-px bg-white/40 hidden sm:block" />;
