import { LoginFormData, RegisterFormData } from "@/types";
import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
export default function useUserQuery(id: string | null) {
  const axios = useAxios();
  const getUser = (id: string | null) =>
    id ? axios.get(`users/${id}`) : Promise.reject("id is null");
  const {
    data,
    isLoading,
    error,
    isError,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery({
    queryKey: queryKeys.getUser(id),
    queryFn: () => getUser(id),
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
