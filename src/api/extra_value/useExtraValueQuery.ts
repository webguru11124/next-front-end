import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
export default function useExtraValueQuery(id: string | null) {
  const axios = useAxios();
  const getExtraValue = (id: string | null) =>
    id ? axios.get(`extra_value/${id}`) : Promise.reject("id is null");
  const {
    data,
    isLoading,
    error,
    isError,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery({
    queryKey: queryKeys.getExtraValue(id),
    queryFn: () => getExtraValue(id),
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
