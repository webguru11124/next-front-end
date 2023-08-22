import useAxios from "../instance";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Organization } from "@/types/organization";
export default function useOrganizationDelete() {
  const axios = useAxios();
  const router = useRouter();
  let id: string | null;
  const orgUpdate = (id: string | null) => {
    return axios.delete(`organization/${id}`);
  };
  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: orgUpdate,
    onSuccess: (data, variables, context) => {
      toast.error(`Organization Deleted Successfully`, {
        hideProgressBar: true,
        autoClose: 5000,
        type: "success",
        position: "top-right",
      });
      router.push("/organizations");
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
