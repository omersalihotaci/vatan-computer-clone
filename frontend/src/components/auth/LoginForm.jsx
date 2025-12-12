import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-5">
            {/* Email */}
            <input
                type="email"
                placeholder="E-mail"
                className="w-full h-12 px-4 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-900"
            />

            {/* Password */}
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifre"
                    className="w-full h-12 px-4 pr-10 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-900"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            {/* Şifremi Unuttum */}
            <div className="text-right">
                <button className="text-sm text-blue-700 hover:underline">
                    Şifremi Unuttum
                </button>
            </div>

            {/* Giriş Yap */}
            <button className="w-full h-12 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition">
                Giriş Yap
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-gray-400">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm">Veya</span>
                <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social Login */}
            <div className="space-y-3 bg-gray-100 p-4 rounded-lg">
                <button className="w-full h-11 bg-white border rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">
                        Google ile oturum açın
                    </span>
                </button>

                <button className="w-full h-11 bg-white border rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
                    <img
                        src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                        alt="facebook"
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-blue-700">
                        Facebook ile oturum açın
                    </span>
                </button>
            </div>
        </div>
    );
}
