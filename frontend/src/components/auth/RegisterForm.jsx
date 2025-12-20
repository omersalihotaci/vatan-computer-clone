import { useMemo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRegister } from "../../hooks/useAuthMutations";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export default function RegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [kvkkAccepted, setKvkkAccepted] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");

    const [touched, setTouched] = useState({
        fullName: false,
        email: false,
        password: false,
        gender: false,
        kvkk: false,
    });

    const [formError, setFormError] = useState("");

    const { mutate, isPending } = useRegister();
    const { login } = useAuth();

    const errors = useMemo(() => {
        const e = {};

        const fn = fullName.trim();
        const em = email.trim();

        if (!fn) e.fullName = "Ad Soyad zorunlu";
        else if (fn.length < 3) e.fullName = "Ad Soyad en az 3 karakter olmalı";

        if (!em) e.email = "E-mail zorunlu";
        else if (!emailRegex.test(em)) e.email = "Geçerli bir e-mail gir";

        if (!password) e.password = "Şifre zorunlu";
        else if (!passwordRegex.test(password)) {
            e.password =
                "Şifre en az 8 karakter olmalı ve en az 1 harf + 1 rakam içermeli";
        }

        if (!gender) e.gender = "Cinsiyet seçmelisin";

        if (!kvkkAccepted) e.kvkk = "KVKK onayı gerekli";

        return e;
    }, [fullName, email, password, gender, kvkkAccepted]);

    const isValid = Object.keys(errors).length === 0;

    const handleRegister = () => {
        setFormError("");
        setTouched({
            fullName: true,
            email: true,
            password: true,
            gender: true,
            kvkk: true,
        });

        if (!isValid) return;

        mutate(
            {
                fullName: fullName.trim(),
                email: email.trim(),
                password,
                gender,
            },
            {
                onSuccess: (data) => {
                    login(data);
                    navigate("/", { replace: true });
                },
            }
        );
    };

    const showErr = (field) => touched[field] && errors[field];

    return (
        <div className="space-y-5">
            {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
                    {formError}
                </div>
            )}

            {/* Ad Soyad */}
            <div className="space-y-1">
                <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                    type="text"
                    placeholder="Ad Soyad"
                    className={`w-full h-12 px-4 rounded-lg bg-gray-100 outline-none focus:ring-2
                        ${
                            showErr("fullName")
                                ? "ring-2 ring-red-400"
                                : "focus:ring-blue-900"
                        }
                    `}
                />
                {showErr("fullName") && (
                    <p className="text-xs text-red-600">{errors.fullName}</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-1">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    type="email"
                    placeholder="E-mail"
                    className={`w-full h-12 px-4 rounded-lg bg-gray-100 outline-none focus:ring-2
                        ${
                            showErr("email")
                                ? "ring-2 ring-red-400"
                                : "focus:ring-blue-900"
                        }
                    `}
                />
                {showErr("email") && (
                    <p className="text-xs text-red-600">{errors.email}</p>
                )}
            </div>

            {/* Şifre */}
            <div className="space-y-1">
                <div className="relative">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() =>
                            setTouched((t) => ({ ...t, password: true }))
                        }
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifre"
                        className={`w-full h-12 px-4 pr-10 rounded-lg bg-gray-100 outline-none focus:ring-2
                            ${
                                showErr("password")
                                    ? "ring-2 ring-red-400"
                                    : "focus:ring-blue-900"
                            }
                        `}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {showErr("password") && (
                    <p className="text-xs text-red-600">{errors.password}</p>
                )}
            </div>

            {/* Cinsiyet */}
            <div className="space-y-1">
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, gender: true }))}
                    className={`w-full h-12 px-4 rounded-lg bg-gray-100 outline-none focus:ring-2 text-gray-600
                        ${
                            showErr("gender")
                                ? "ring-2 ring-red-400"
                                : "focus:ring-blue-900"
                        }
                    `}
                >
                    <option value="" disabled>
                        Cinsiyet
                    </option>
                    <option value="MALE">Erkek</option>
                    <option value="FEMALE">Kadın</option>
                    <option value="OTHER">Belirtmek İstemiyorum</option>
                </select>
                {showErr("gender") && (
                    <p className="text-xs text-red-600">{errors.gender}</p>
                )}
            </div>

            {/* KVKK */}
            <div className="space-y-1">
                <label className="flex items-start gap-2 text-sm text-gray-600">
                    <input
                        type="checkbox"
                        checked={kvkkAccepted}
                        onChange={(e) => setKvkkAccepted(e.target.checked)}
                        onBlur={() => setTouched((t) => ({ ...t, kvkk: true }))}
                        className="mt-1"
                    />
                    <span>
                        Otacı Bilgisayar'ın tarafıma e-posta ile ticari
                        elektronik ileti göndermesine izin veriyorum
                    </span>
                </label>
                {touched.kvkk && errors.kvkk && (
                    <p className="text-xs text-red-600">{errors.kvkk}</p>
                )}
            </div>

            {/* Üyeliği Tamamla */}
            <button
                type="button"
                onClick={handleRegister}
                disabled={!kvkkAccepted || isPending}
                className={`w-full h-12 font-semibold rounded-lg transition
                    ${
                        kvkkAccepted && !isPending
                            ? "bg-blue-900 text-white hover:bg-blue-800"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                {isPending ? "Kaydediliyor..." : "Üyeliği Tamamla"}
            </button>
        </div>
    );
}
