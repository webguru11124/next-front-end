

import { LoginFormData, RegisterFormData } from "@/types";
import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";

export default function useUserQuery(id: number) {
    const axios = useAxios();
    const getUser = (id: number) => axios.get(`users/${id}`);
    const { data, isLoading, error, isFetching, isPreviousData, refetch } =
        useQuery({
            queryKey: ["getUser", id],
            queryFn: () => getUser(id)
        });

    return {
        data: data?.data?.data,
        meta: data?.data?.meta,
        isFetching,
        isLoading,
        isPreviousData,
        refetch,
        error,
    };
}
