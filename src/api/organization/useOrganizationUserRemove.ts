

import useAxios from "../instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useClose } from "@/store/useModalStore";
import { Organization } from "@/types/organization";
import queryKeys from "./queryKeys";
import { useCurrentOrganizationId } from "@/store/useOrganizationStore";
import { InviteUserServer } from "@/types/invite";
export default function useOrganizationUserRemove() {
    const axios = useAxios();
    const queryClient = useQueryClient(); // Create a queryClient instance
    const close = useClose()
    const { id: orgId } = useCurrentOrganizationId();
    const orgRemoveUser = (id: string) => {
        return axios.delete(`organization/${orgId}/users/${id}`)
    };
    const { mutate, isLoading, isError, error, data } = useMutation({
        mutationFn: orgRemoveUser,
        onSuccess: (data, variables, context) => {
            toast.error(`Remove user from organization Successfully`, { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'top-right' })
            close();
            queryClient.invalidateQueries();

        },
        onError: (error) => {
            toast.error(`Server Error: ${error}`, { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'top-right' })
        }
    });

    return { mutate, isLoading, isError, error, data };




}

