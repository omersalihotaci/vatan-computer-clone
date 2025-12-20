import { useContext } from "react";
import { CheckoutContext } from "../context/checkout-context";

export const useCheckout = () => {
    return useContext(CheckoutContext);
};
