import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center mt-10 bg-gray-50">
            <FaCheckCircle size={80} className="text-green-500 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Ödeme Başarılı 🎉</h2>
            <p className="text-gray-600 mb-6">
                Siparişiniz başarıyla alınmıştır.
            </p>

            <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-primary text-white rounded-lg"
            >
                Ana Sayfaya Dön
            </button>
        </div>
    );
}
