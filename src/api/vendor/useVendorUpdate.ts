import useAxios from "../instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useClose } from "@/store/useModalStore";
import { Extra } from "@/types/extra";
export default function useVendorUpdate() {
  const axios = useAxios();
  const queryClient = useQueryClient(); // Create a queryClient instance
  const close = useClose();
  let id: string | null;
  const vendorUpdate = (formData: Extra) => {
    id = formData.id;
    return axios.put(`vendors/${formData.id}`, { ...formData });
  };
  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: vendorUpdate,
    onSuccess: (data, variables, context) => {
      if (id) queryClient.invalidateQueries();
      toast.error(`Vendor Field Updated Successfully`, {
        hideProgressBar: true,
        autoClose: 5000,
        type: "success",
        position: "top-right",
      });
      close();
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