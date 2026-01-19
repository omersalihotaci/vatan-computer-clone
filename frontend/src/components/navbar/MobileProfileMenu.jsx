import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useEffect } from "react";

function MobileProfileMenu({ open, onClose }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    if (!open) return null;

    const handleLogout = () => {
        logout();
        onClose();
        navigate("/auth?tab=login", { replace: true });
    };

    return (
        <div className="fixed inset-0 z-[999] bg-white flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b">
                <span className="text-lg font-semibold">
                    {user ? "Hesabım" : "Hoş Geldin"}
                </span>
                <button onClick={onClose} className="text-2xl">
                    ✕
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center items-center gap-4 px-6">
                {!user ? (
                    <>
                        <button
                            onClick={() => {
                                onClose();
                                navigate("/auth?tab=login");
                            }}
                            className="w-full py-3 rounded-lg bg-primary text-white text-lg"
                        >
                            Giriş Yap
                        </button>

                        <button
                            onClick={() => {
                                onClose();
                                navigate("/auth?tab=register");
                            }}
                            className="w-full py-3 rounded-lg border border-black text-black text-lg"
                        >
                            Üye Ol
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                onClose();
                               // navigate("/profile");
                            }}
                            className="w-full py-3 rounded-lg bg-black text-white text-lg"
                        >
                            Profilim
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full py-3 rounded-lg border border-red-600 text-red-600 text-lg"
                        >
                            Çıkış Yap
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default MobileProfileMenu;
