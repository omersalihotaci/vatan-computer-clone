import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "../../hooks/useAuthMutations";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate, isPending } = useLogin();

    const { login } = useAuth();

    const handleLogin = () => {
        mutate(
            {
                email,
                password,
            },
            {
                onSuccess: (data) => {
                    login(data);
                    navigate("/", { replace: true });
                },
            }
        );
    };

    return (
        <div className="space-y-5">
            {/* Email */}
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="E-mail"
                className="w-full h-12 px-4 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-900"
            />

            {/* Password */}
            <div className="relative">
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            <button
                onClick={handleLogin}
                disabled={isPending}
                className="w-full h-12 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
            >
                Giriş Yap
            </button>
        </div>
    );
}
