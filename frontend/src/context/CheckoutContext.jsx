
import {useState } from "react";
import { CheckoutContext } from "./checkout-context";


export function CheckoutProvider({ children }) {
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    return (
        <CheckoutContext.Provider
            value={{ selectedAddressId, setSelectedAddressId }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}
