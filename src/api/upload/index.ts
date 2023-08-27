import { useMutation } from "@tanstack/react-query";
import useAxios from "../instance";
import { toast } from "react-toastify";

export default function useFileUpload() {
    const axios = useAxios();
    

    const uploadFile = (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post("/upload", formData);
    }
    const { mutate, isLoading, isError, error, data } = useMutation({
        mutationFn: uploadFile,
        onSuccess: (data, variables, context) => {
            toast.error(`File uploaded Successfully`, {
                hideProgressBar: true,
                autoClose: 5000,
                type: "success",
                position: "top-right",
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

    return { mutate, isLoading, isError, error, data: data?.data };
}