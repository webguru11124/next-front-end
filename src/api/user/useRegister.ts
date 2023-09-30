import { LoginFormData, RegisterFormData } from "@/types";
import useAxios from "../instance";
import { useMutation } from "@tanstack/react-query";

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
export default function useRegisterUser() {
  const axios = useAxios();
  let credentials: RegisterFormData;

  const registerUser = (formData: RegisterFormData) => { credentials = formData; return axios.post("users", { ...formData, f_name: formData.name }); }
  const { mutate, isLoading, isError, error, data } = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data, variables, context) => {
      toast.error(`User registered Successfully`, {
        hideProgressBar: true,
        autoClose: 5000,
        type: "success",
        position: "top-right",
      });
      const res = await signIn("credentials", {
        redirect: true,
        email: credentials.email,
        password: credentials.password,
        callbackUrl: '/'
      });
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
