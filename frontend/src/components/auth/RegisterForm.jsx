import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRegister } from "../../hooks/useAuthMutations";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [kvkkAccepted, setKvkkAccepted] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const { mutate, isPending } = useRegister();

    const handleRegister = () => {
        if (!kvkkAccepted) return;

        mutate(
            {
                fullName,
                email,
                password,
                gender,
            },
            {
                onSuccess: () => {
                    // register başarılı → login tab’ına geç
                    navigate("/auth?tab=login", { replace: true });
                },
            }
        );
    };

    return (
        <div className="space-y-5">
            {/* Ad Soyad */}
            <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Ad Soyad"
                className="w-full h-12 px-4 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-900"
            />

            {/* Email */}
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="E-mail"
                className="w-full h-12 px-4 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-900"
            />

            {/* Şifre */}
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

            {/* Cinsiyet */}
            <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-900 text-gray-600"
                defaultValue=""
            >
                <option value="" disabled>
                    Cinsiyet
                </option>
                <option value="MALE">Erkek</option>
                <option value="FEMALE">Kadın</option>
                <option value="OTHER">Belirtmek İstemiyorum</option>
            </select>

            {/* KVKK */}
            <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                    type="checkbox"
                    checked={kvkkAccepted}
                    onChange={(e) => setKvkkAccepted(e.target.checked)}
                    className="mt-1"
                />
                <span>
                    Otacı Bilgisayar'ın tarafıma e-posta ile ticari elektronik
                    ileti göndermesine izin veriyorum
                </span>
            </label>

            {/* Üyeliği Tamamla */}
            <button
                onClick={handleRegister}
                disabled={!kvkkAccepted || isPending}
                className={`w-full h-12 font-semibold rounded-lg transition
                    ${
                        kvkkAccepted
                            ? "bg-blue-900 text-white hover:bg-blue-800"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                {isPending ? "Kaydediliyor..." : "Üyeliği Tamamla"}
            </button>
        </div>
    );
}
