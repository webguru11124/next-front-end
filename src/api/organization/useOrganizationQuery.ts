

import { LoginFormData, RegisterFormData } from "@/types";
import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys"
export default function useOrganizationQuery(id: string) {
    const axios = useAxios();
    const getOrganization = (id: string) => axios.get(`organization/${id}`);
    const { data, isLoading, error, isError, isFetching, isPreviousData, refetch } =
        useQuery({
            queryKey: queryKeys.getOrganization(id),
            queryFn: () => getOrganization(id)
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
