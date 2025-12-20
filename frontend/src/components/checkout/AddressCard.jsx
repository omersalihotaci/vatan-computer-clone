import { useState } from "react";
import { useDeleteAddress } from "../../hooks/useAddresses";

function AddressCard({ address, selected, onSelect, onEdit }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const { mutate: deleteAddress, isPending } = useDeleteAddress();

    return (
        <div className="relative">
            <div className="flex justify-end gap-4 text-sm mb-1">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(address);
                    }}
                    className="text-gray-600 hover:text-blue-900 transition"
                >
                    ✏️ Düzenle
                </button>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowConfirm(true);
                    }}
                    className="text-gray-600 hover:text-red-600 transition"
                >
                    🗑️ Sil
                </button>
            </div>
            <button
                type="button"
                onClick={onSelect}
                className={`
                    w-full text-left rounded-xl border p-4 transition
                    ${
                        selected
                            ? "border-blue-900 bg-blue-50"
                            : "border-gray-300 bg-gray-100 hover:border-blue-900"
                    }
                `}
            >
                <div className="flex items-center gap-3 mb-2">
                    <div
                        className={`
                            w-5 h-5 rounded-full border flex items-center justify-center
                            ${selected ? "border-blue-900" : "border-gray-400"}
                        `}
                    >
                        {selected && (
                            <div className="w-3 h-3 bg-blue-900 rounded-full" />
                        )}
                    </div>

                    <span className="font-medium text-gray-900">
                        {address.title}
                    </span>
                </div>

                {/* USER INFO */}
                <div className="flex justify-between text-sm text-gray-700 mb-1">
                    <span>👤 {address.fullName}</span>
                    <span>📞 {address.phone}</span>
                </div>

                {/* ADDRESS LINE */}
                <p className="text-sm text-gray-600 leading-snug line-clamp-2">
                    {address.fullAddress}
                </p>

                {/* CITY */}
                <p className="text-sm font-medium text-gray-800 mt-1">
                    {address.city}
                    {address.district && ` / ${address.district}`}
                </p>
            </button>

            {/* CONFIRM OVERLAY */}
            {showConfirm && (
                <div
                    className="absolute inset-0 z-10 bg-white/95 backdrop-blur
                               rounded-xl border flex flex-col items-center
                               justify-center gap-4 p-4"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="text-sm font-medium text-center text-gray-800">
                        Bu adresi silmek istediğine emin misin?
                    </p>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={() =>
                                deleteAddress(address.id, {
                                    onSuccess: () => setShowConfirm(false),
                                })
                            }
                            className="px-4 py-1.5 rounded-lg bg-blue-900
                                       text-white hover:bg-blue-700 transition"
                        >
                            Evet, Sil
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowConfirm(false)}
                            className="px-4 py-1.5 rounded-lg border
                                       hover:bg-gray-100 transition"
                        >
                            Vazgeç
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddressCard;
