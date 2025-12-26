
import {useEffect, useState } from "react";
import { CheckoutContext } from "./checkout-context";


export function CheckoutProvider({ children }) {
    const [selectedAddressId, setSelectedAddressId] = useState(() => {
         const id = localStorage.getItem("selectedAddressId");
         return id ? Number(id) : null;
    });

    useEffect(() => {
        if (selectedAddressId) {
            localStorage.setItem("selectedAddressId", selectedAddressId);
        } else {
            localStorage.removeItem("selectedAddressId");
        }
    }, [selectedAddressId]);

    return (
        <CheckoutContext.Provider
            value={{ selectedAddressId, setSelectedAddressId }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}
