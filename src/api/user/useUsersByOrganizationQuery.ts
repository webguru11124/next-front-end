import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
export default function useUsersByOrganizatinoQuery(id: string | null) {
  const axios = useAxios();
  const getUsersByOrganization = (id: string | null) =>
    id ? axios.get(`organization/${id}/users`) : Promise.reject("id is null");
  const {
    data,
    isLoading,
    error,
    isError,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery({
    queryKey: queryKeys.getUsers(id),
    queryFn: () => getUsersByOrganization(id),
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
