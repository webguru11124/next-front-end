

import useAxios from "../instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import queryKeys from "./queryKeys";
import { ExtraForm } from "@/types/extra";
import { useClose } from "@/store/useModalStore";
export default function useExtraFieldCreate() {
    const axios = useAxios();
    const queryClient = useQueryClient(); // Create a queryClient instance
    const close = useClose()
    const extraCreate = (formData: ExtraForm) => {
        return axios.post(`extra_field`, { ...formData })
    };
    const { mutate, isLoading, isError, error, data } = useMutation({
        mutationFn: extraCreate,
        onSuccess: (data, variables, context) => {
            toast.error(`Extra Field Created Successfully`, { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'top-right' })
            close();
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            toast.error(`Server Error: ${error}`, { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'top-right' })
        }
    });

    return { mutate, isLoading, isError, error, data };




}

