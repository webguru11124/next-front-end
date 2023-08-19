

import { LoginFormData } from "@/types";
import useAxios from "../instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';
import { useClose } from "@/store/useModalStore";
import { User } from "@/app/(page)/(manage)/users/types";
import { UserForm } from "@/app/(page)/(manage)/profile/editModal";
import useUserQuery from "./useUserQuery";
import queryKeys from "./queryKeys";
export default function useUserMutation() {
    const axios = useAxios();
    const close = useClose();
    let id: string | null;
    const registerUser = (formData: User) => { id = formData.id; return axios.put(`users/${formData.id}`, { ...formData }) };
    const queryClient = useQueryClient(); // Create a queryClient instance

    const { mutate, isLoading, isError, error, data } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data, variables, context) => {
            toast.error(`User updated Successfully`, { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'top-right' })

            // Refetch useUserQuery with the same id
            if (id)
                queryClient.invalidateQueries(queryKeys.getUser(id));

            close();
        },
        onError: (error) => {
            toast.error(`Server Error: ${error}`, { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'top-right' })
        }
    });

    return { mutate, isLoading, isError, error, data };




}

