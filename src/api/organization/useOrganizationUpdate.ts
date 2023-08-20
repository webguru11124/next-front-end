

import useAxios from "../instance";
import { useMutation } from "@tanstack/react-query";

import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useClose } from "@/store/useModalStore";
import { Organization } from "@/types/organization";
export default function useOrganizationUpdate() {
    const axios = useAxios();
    const close = useClose()
    const router = useRouter();
    const orgUpdate = (formData: Organization) => axios.put(`organization/${formData.id}`, { ...formData });
    const { mutate, isLoading, isError, error, data } = useMutation({
        mutationFn: orgUpdate,
        onSuccess: (data, variables, context) => {
            toast.error(`Organization Updated Successfully`, { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'top-right' })
            close();
        },
        onError: (error) => {
            toast.error(`Server Error: ${error}`, { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'top-right' })
        }
    });

    return { mutate, isLoading, isError, error, data };




}

