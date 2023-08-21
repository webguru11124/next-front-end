

import useAxios from "../instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from 'react-toastify';
import { useClose } from "@/store/useModalStore";
import { Extra } from "@/types/extra";
import { ExtraValue } from "@/types/extra_value";
export default function useExtraValueMutation() {
    const axios = useAxios();
    const queryClient = useQueryClient(); // Create a queryClient instance
    const close = useClose()
    const extraValueUpdate = (formData: ExtraValue) => {
        return axios.post(`extra_value/${formData.id}`, { ...formData })
    };
    const { mutate, isLoading, isError, error, data } = useMutation({
        mutationFn: extraValueUpdate,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries();
            toast.error(`Extra Drop Value Updated Successfully`, { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'top-right' })
            close();
        },
        onError: (error) => {
            toast.error(`Server Error: ${error}`, { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'top-right' })
        }
    });

    return { mutate, isLoading, isError, error, data };
}

