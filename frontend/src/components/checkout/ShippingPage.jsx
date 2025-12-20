import { useState } from "react";
import { useAddresses } from "../../hooks/useAddresses";
import { useCheckout } from "../../hooks/useCheckout";
import AddAddressModal from "./AddAddressModal";
import { CartSummary } from "../cartPage/CartSummary";
import AddressCard from "./AddressCard";
import AddAddressCard from "./AddAddressCard";

export default function ShippingPage() {
    const { data: addresses = [], isLoading } = useAddresses();
    const { setSelectedAddressId, selectedAddressId } = useCheckout();
    const [showAddModal, setShowAddModal] = useState(false);

    if (isLoading) return <div>Yükleniyor...</div>;

    return (
        <div>
            <h1 className="text-xl font-bold text-primary mx-auto px-4 max-w-7xl py-4">
                Teslimat Adresi
            </h1>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AddAddressCard onClick={() => setShowAddModal(true)} />
                        {addresses.map((address) => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                selected={selectedAddressId === address.id}
                                onSelect={() => setSelectedAddressId(address.id)}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-4">
                    <CartSummary />
                </div>
            </div>

            {showAddModal && (
                <AddAddressModal onClose={() => setShowAddModal(false)} />
            )}
        </div>
    );
}
