

import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import queryKeys from "./queryKeys"
export default function useExtraFieldQuery(id: string) {
    const axios = useAxios();
    const getExtraValue = (id: string) => axios.get(`extra_value/${id}`);
    const { data, isLoading, error, isError, isFetching, isPreviousData, refetch } =
        useQuery({
            queryKey: queryKeys.getExtraValue(id),
            queryFn: () => getExtraValue(id)
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
