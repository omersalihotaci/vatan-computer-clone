import { useAddresses } from "../../hooks/useAddresses";
import { useCheckout } from "../../hooks/useCheckout";
import { CartSummary } from "../cartPage/CartSummary";
import { useState } from "react";

export default function PaymentPage() {
      const { selectedAddressId } = useCheckout();
      const { data: addresses = [] } = useAddresses();
      const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    const [card, setCard] = useState({
        cardNumber: "4242 4242 4242 4242",
        cardHolder: "ÖMER SALİH OTACI",
        expireMonth: "12",
        expireYear: "26",
        cvc: "123",
    });
    if (!selectedAddressId || !selectedAddress) {
        return (
            <div className="max-w-7xl mx-auto px-4 mt-10">
                <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded">
                    Teslimat adresi bulunamadı. Lütfen adres seçiniz.
                </div>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-6 mt-10">
            <div className="col-span-12 lg:col-span-7 space-y-4 border border-gray-300 rounded p-6 ">
                <div>
                    <label className="block text-sm mb-1 text-gray-700">
                        Kart Numarası *
                    </label>
                    <input
                        value={card.cardNumber}
                        onChange={(e) =>
                            setCard({ ...card, cardNumber: e.target.value })
                        }
                        className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Kart Numarası"
                    />
                </div>

                {/* Kart Üzerindeki İsim */}
                <div>
                    <label className="block text-sm mb-1 text-gray-700">
                        Kart Üzerindeki İsim *
                    </label>
                    <input
                        value={card.cardHolder}
                        onChange={(e) =>
                            setCard({ ...card, cardHolder: e.target.value })
                        }
                        className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Kart Üzerindeki İsim"
                    />
                </div>

                {/* Son Kullanma Tarihi */}
                <div>
                    <label className="block text-sm mb-2 text-gray-700">
                        Son Kullanma Tarihi *
                    </label>

                    <div className="flex gap-4">
                        <select
                            value={card.expireMonth}
                            onChange={(e) =>
                                setCard({
                                    ...card,
                                    expireMonth: e.target.value,
                                })
                            }
                            className="border rounded-md p-3 w-1/2"
                        >
                            <option value="">AY</option>
                            {Array.from({ length: 12 }, (_, i) => {
                                const month = String(i + 1).padStart(2, "0");
                                return (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                );
                            })}
                        </select>

                        <select
                            value={card.expireYear}
                            onChange={(e) =>
                                setCard({
                                    ...card,
                                    expireYear: e.target.value,
                                })
                            }
                            className="border rounded-md p-3 w-1/2"
                        >
                            <option value="">YIL</option>
                            {Array.from({ length: 10 }, (_, i) => {
                                const year = String(25 + i);
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                {/* CVC */}
                <div className="flex items-center gap-4">
                    <div className="w-1/2">
                        <label className="block text-sm mb-1 text-gray-700">
                            Kart Güvenlik Kodu (CVC) *
                        </label>
                        <input
                            value={card.cvc}
                            onChange={(e) =>
                                setCard({ ...card, cvc: e.target.value })
                            }
                            className="w-full border rounded-md p-3"
                            placeholder="CVC"
                        />
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-4 ">
                <CartSummary />
                    <div className="border rounded-lg p-4 mt-6">
                        <h3 className="font-semibold mb-2">Teslimat Adresi</h3>
                        <p>{selectedAddress.title}</p>
                        <p>
                            {selectedAddress.city} / {selectedAddress.district}
                        </p>
                        <p>{selectedAddress.addressLine}</p>
                    </div>
            </div>
        </div>
    );
}
