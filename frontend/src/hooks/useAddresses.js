import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { AdressApi } from "../api/adress.api";

export const useAddAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: AdressApi.addAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    });
};
export const useAddresses = () =>
    useQuery({
        queryKey: ["addresses"],
        queryFn: AdressApi.fetchAddresses,
    });
export const useDeleteAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: AdressApi.deleteAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["addresses"],
            });
        },
    });
};
export const useUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: AdressApi.updateAdress,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["addresses"],
            });
        },
    });
};
