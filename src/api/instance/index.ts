import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
export default function useAxios() {
  const { data: session } = useSession();
  const apiUrl = process.env.API_URL || "http://localhost:4000/api/v1";
  const instance = axios.create({
    baseURL: apiUrl,
  });
  const queryClient = useQueryClient(); // Create a queryClient instance
  const API_HOSTNAME_VERSION = "v2";
  const contentLanguage = "en";
  const token = session?.user?.token;
  instance.interceptors.request.use((requestConfig) => {
    const updatedConfig = { ...requestConfig };

    updatedConfig.withCredentials = true;

    if (contentLanguage) {
      updatedConfig.headers["content-language"] = contentLanguage;
    }

    updatedConfig.headers["Hostname-Version"] = API_HOSTNAME_VERSION;
    updatedConfig.headers["Accept"] = "application/json";

    if (token) {
      updatedConfig.headers.authorization = `Bearer ${token}`;
    } else if (updatedConfig.method === "get") {
      // Stop the GET request when no authorization header is present
      return Promise.reject(new Error("Authorization header is missing"));
    }

    if (apiUrl) {
      updatedConfig.headers.tenant = apiUrl;
    }
    updatedConfig.headers["api-name"] = "barge_diary";
    return updatedConfig;
  });
  return instance;
}
