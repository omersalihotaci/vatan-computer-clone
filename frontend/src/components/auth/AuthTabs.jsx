import { useNavigate } from "react-router-dom";

export default function AuthTabs({ activeTab, setActiveTab }) {
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`/auth?tab=${tab}`);
    };
    return (
        <div className="flex border-b mb-8">
            {/* Giriş Yap */}
            <button
                onClick={() => handleTabChange("login")}
                className={`flex-1 py-4 text-center font-semibold
                    ${
                        activeTab === "login"
                            ? "text-blue-900 border-b-2 border-blue-900"
                            : "text-gray-500"
                    }`}
            >
                Giriş Yap
            </button>

            {/* Üye Ol */}
            <button
                onClick={() => handleTabChange("register")}
                className={`flex-1 py-4 text-center font-semibold
                    ${
                        activeTab === "register"
                            ? "text-blue-900 border-b-2 border-blue-900"
                            : "text-gray-500"
                    }`}
            >
                Üye Ol
            </button>
        </div>
    );
}
