import useAxios from "../instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { useClose } from "@/store/useModalStore";
import { useCurrentOrganizationId } from "@/store/useOrganizationStore";
import { ResponseError } from "@/types";
import { AxiosError } from "axios";
export default function useOrganizationUserRemove() {
  const axios = useAxios();
  const queryClient = useQueryClient(); // Create a queryClient instance
  const close = useClose();
  const { id: orgId } = useCurrentOrganizationId();
  const orgRemoveUser = (id: string) => {
    return axios.delete(`organization/${orgId}/users/${id}`);
  };
  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: orgRemoveUser,
    onSuccess: (data, variables, context) => {
      toast.error(`Remove user from organization Successfully`, {
        hideProgressBar: true,
        autoClose: 5000,
        type: "success",
        position: "top-right",
      });
      close();
      queryClient.invalidateQueries();
    },
    onError: (error: AxiosError<ResponseError>) => {
      toast.error(`Server Error: ${error?.response?.data?.message}`, {
        hideProgressBar: true,
        autoClose: 5000,
        type: "error",
        position: "top-right",
      });
    },
  });

  return { mutate, isLoading, isError, error, data };
}
