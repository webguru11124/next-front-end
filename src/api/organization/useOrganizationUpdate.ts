import useAxios from "../instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useClose } from "@/store/useModalStore";
import { Organization, OrganizationFormServer, OrganizationServer } from "@/types/organization";
import { queryKeys } from "./queryKeys";
import { AxiosError } from "axios";
import { ResponseError } from "@/types";
export default function useOrganizationUpdate() {
  const axios = useAxios();
  const queryClient = useQueryClient(); // Create a queryClient instance
  const close = useClose();
  let id: string | null;
  const orgUpdate = (formData: OrganizationServer) => {
    id = formData.id;
    return axios.put(`organization/${formData.id}`, { ...formData });
  };
  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: orgUpdate,
    onSuccess: (data, variables, context) => {
      toast.error(`Organization Updated Successfully`, {
        hideProgressBar: true,
        autoClose: 5000,
        type: "success",
        position: "top-right",
      });
      close();

      if (id) queryClient.invalidateQueries(queryKeys.getOrganization(id));
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
