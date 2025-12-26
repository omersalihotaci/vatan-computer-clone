import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../api/cart.api";


export const useAddToCart = () => {
    return useMutation({
        mutationFn: ({ variantId, quantity }) =>
            cartApi.addToCart(variantId, quantity),
        retry: 0,
    });
};
export const useCart = () => 
   useQuery({
        queryKey: ["cart"],
        queryFn: cartApi.getMyCart,
   });
export const useDeleteCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(itemId) => cartApi.deleteCartItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};
export const useDeleteCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => cartApi.deleteCart(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
};

