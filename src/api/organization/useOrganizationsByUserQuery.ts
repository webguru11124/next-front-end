

import { LoginFormData, RegisterFormData } from "@/types";
import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys"
export default function useOrganizationsByUserQuery(id: string) {
    const axios = useAxios();
    const getOrganizationByUser = (id: string) => axios.get(`organization?user=${id}`);
    const { data, isLoading, error, isError, isFetching, isPreviousData, refetch } =
        useQuery({
            queryKey: queryKeys.getOrganizationByUser(id),
            queryFn: () => getOrganizationByUser(id)
        });

    return {
        data: data?.data,
        meta: data?.data?.meta,
        isFetching,
        isError,
        isLoading,
        isPreviousData,
        refetch,
        error,
    };
}
