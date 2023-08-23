import useAxios from "../instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ExtraFormWithServer } from "@/types/extra";
import { useClose } from "@/store/useModalStore";
import { useCurrentOrganizationId } from "@/store/useOrganizationStore";
import { VendorFormWithServer } from "@/types/vendor";
export default function useVendorCreate() {
  const axios = useAxios();
  const queryClient = useQueryClient(); // Create a queryClient instance
  const close = useClose();
  const { id } = useCurrentOrganizationId();
  const vendorCreate = (formData: VendorFormWithServer) => {
    return axios.post(`vendors`, { ...formData });
  };
  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: vendorCreate,
    onSuccess: (data, variables, context) => {
      toast.error(`Vendor Created Successfully`, {
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