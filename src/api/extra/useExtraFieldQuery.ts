import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
export default function useExtraFieldQuery(id: string | null) {
  const axios = useAxios();
  const getExtra = (id: string | null) =>
    id ? axios.get(`extra_field/${id}`) : Promise.reject("id is null");
  const {
    data,
    isLoading,
    error,
    isError,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery({
    queryKey: queryKeys.getExtra(id),
    queryFn: () => getExtra(id),
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
