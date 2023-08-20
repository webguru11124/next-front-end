

import useAxios from "../instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useClose } from "@/store/useModalStore";
import { Extra } from "@/types/extra";
import queryKeys from "./queryKeys";
export default function useExtraFieldUpdate() {
    const axios = useAxios();
    const queryClient = useQueryClient(); // Create a queryClient instance
    const close = useClose()
    let id: string | null;
    const extraUpdate = (formData: Extra) => {
        id = formData.id;
        return axios.put(`extra_field/${formData.id}`, { ...formData })
    };
    const { mutate, isLoading, isError, error, data } = useMutation({
        mutationFn: extraUpdate,
        onSuccess: (data, variables, context) => {
            toast.error(`Extra Field Updated Successfully`, { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'top-right' })
            close();
            if (id)
                queryClient.invalidateQueries([queryKeys.getExtra(id), queryKeys.getExtrasWithOrganization(id)]);

        },
        onError: (error) => {
            toast.error(`Server Error: ${error}`, { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'top-right' })
        }
    });

    return { mutate, isLoading, isError, error, data };




}

