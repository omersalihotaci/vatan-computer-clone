import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [kvkkAccepted, setKvkkAccepted] = useState(false);

    return (
        <div className="space-y-5">
            {/* Ad Soyad */}
            <input
                type="text"
                placeholder="Ad Soyad"
                className="w-full h-12 px-4 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-900"
            />

            {/* Email */}
            <input
                type="email"
                placeholder="E-mail"
                className="w-full h-12 px-4 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-blue-900"
            />

            {/* Şifre */}
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

            {/* Cinsiyet */}
            <select
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
                disabled={!kvkkAccepted}
                className={`w-full h-12 font-semibold rounded-lg transition
                    ${
                        kvkkAccepted
                            ? "bg-blue-900 text-white hover:bg-blue-800"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                Üyeliği Tamamla
            </button>
        </div>
    );
}
