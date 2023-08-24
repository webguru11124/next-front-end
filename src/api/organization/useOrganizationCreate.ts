import useAxios from "../instance";
import { useMutation } from "@tanstack/react-query";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { OrgForm, OrganizationFormServer } from "@/types/organization";
export default function useOrganizationCreate() {
  const axios = useAxios();

  const router = useRouter();
  const orgCreate = (formData: OrganizationFormServer) =>
    axios.post("organization", { ...formData, email: "abc@abc.com" });
  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: orgCreate,
    onSuccess: (data, variables, context) => {
      toast.error(`Organization Created Successfully`, {
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
