import { LoginFormData, RegisterFormData } from "@/types";
import apiInstance from "@/api";


export const registerUser = (formData: RegisterFormData) => apiInstance.post("http://localhost:8080/api/v1/users", { ...formData, f_name: formData.name });


export const loginUser = (formData: LoginFormData) => apiInstance.post("http://localhost:8080/api/v1/users/login", { ...formData });

