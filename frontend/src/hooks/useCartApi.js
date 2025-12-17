import { useMutation } from "@tanstack/react-query";
import { cartApi } from "../api/cart.api";

export const useAddToCart = () => {
    return useMutation({
        mutationFn: ({ variantId, quantity }) =>
            cartApi.addToCart(variantId, quantity),
        retry: 0,
    });
};