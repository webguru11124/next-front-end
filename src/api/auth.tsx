import { LoginFormData, RegisterFormData, loginResult } from "@/types";
import apiInstance from "@/api";
import { AxiosPromise } from "axios";


export const registerUser = (formData: RegisterFormData) => apiInstance.post("users", { ...formData, f_name: formData.name });


export const loginUser = (formData: LoginFormData) => apiInstance.post("users/login", { ...formData });

