import useAxios from "../instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { useClose } from "@/store/useModalStore";
import { useCurrentOrganizationId } from "@/store/useOrganizationStore";
import { InviteUser } from "@/types/invite";
export default function useOrganizationAccessUpdate() {
  const axios = useAxios();
  const queryClient = useQueryClient(); // Create a queryClient instance
  const close = useClose();
  const { id } = useCurrentOrganizationId();
  const orgAcessUpdate = (formData: InviteUser) => {
    return axios.put(`organization/${id}/users/${formData.id}`, {
      ...formData,
    });
  };
  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: orgAcessUpdate,
    onSuccess: (data, variables, context) => {
      toast.error(`Update  Successfully`, {
        hideProgressBar: true,
        autoClose: 5000,
        type: "success",
        position: "top-right",
      });
      close();
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(`Server Error: ${error}`, {
        hideProgressBar: true,
        autoClose: 5000,
        type: "error",
        position: "top-right",
      });
    },
  });

  return { mutate, isLoading, isError, error, data };
}
