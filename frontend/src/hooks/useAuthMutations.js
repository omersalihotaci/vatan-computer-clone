import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "../api/auth.api";

export const useLogin = () =>
    useMutation({
        mutationFn: AuthApi.login,
        retry: 0,
    });
export const useRegister = () =>
    useMutation({
        mutationFn: AuthApi.register,
        retry: 0,
    });