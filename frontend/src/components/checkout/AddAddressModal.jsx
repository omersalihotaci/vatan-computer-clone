import { useState } from "react";
import { useAddAddress } from "../../hooks/useAddresses";

export default function AddAddressModal({ onClose }) {
    const { mutate, isPending } = useAddAddress();

    const [form, setForm] = useState({
        title: "",
        fullName: "",
        phone: "",
        city: "",
        district: "",
        neighborhood: "",
        addressLine: "",
        postalCode: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 11) {
            setForm({ ...form, phone: value });
        }
    };

    const isDisabled =
        !form.title ||
        !form.fullName ||
        !form.phone ||
        !form.city ||
        !form.addressLine;

    const handleSubmit = () => {
        mutate(form, {
            onSuccess: onClose,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-lg rounded-xl p-6 space-y-4   max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-semibold">Yeni Adres Ekle</h3>

                {/* Adres Başlığı */}
                <Field label="Adres Başlığı">
                    <input
                        name="title"
                        placeholder="Ev, İş, Ofis"
                        value={form.title}
                        onChange={handleChange}
                        className="input"
                    />
                </Field>

                {/* Ad Soyad */}
                <Field label="Ad Soyad">
                    <input
                        name="fullName"
                        placeholder="Ad Soyad"
                        value={form.fullName}
                        onChange={handleChange}
                        className="input"
                    />
                </Field>

                {/* Telefon */}
                <Field label="Telefon">
                    <input
                        type="tel"
                        inputMode="numeric"
                        name="phone"
                        placeholder="05xxxxxxxxx"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        className="input"
                    />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                    <Field label="İl">
                        <input
                            name="city"
                            placeholder="İl"
                            value={form.city}
                            onChange={handleChange}
                            className="input"
                        />
                    </Field>

                    <Field label="İlçe">
                        <input
                            name="district"
                            placeholder="İlçe"
                            value={form.district}
                            onChange={handleChange}
                            className="input"
                        />
                    </Field>
                </div>

                <Field label="Mahalle">
                    <input
                        name="neighborhood"
                        placeholder="Mahalle"
                        value={form.neighborhood}
                        onChange={handleChange}
                        className="input"
                    />
                </Field>

                <Field label="Açık Adres">
                    <textarea
                        name="addressLine"
                        placeholder="Sokak, bina no, daire no"
                        value={form.addressLine}
                        onChange={handleChange}
                        className="input h-24 resize-none"
                    />
                </Field>

                <Field label="Posta Kodu">
                    <input
                        name="postalCode"
                        placeholder="Posta Kodu"
                        value={form.postalCode}
                        onChange={handleChange}
                        className="input"
                    />
                </Field>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border"
                    >
                        İptal
                    </button>
                    <button
                        disabled={isDisabled || isPending}
                        onClick={handleSubmit}
                        className={`px-5 py-2 rounded-lg text-white ${
                            isDisabled
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-900 hover:bg-blue-800"
                        }`}
                    >
                        Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
}

function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">{label}</label>
            {children}
        </div>
    );
}
