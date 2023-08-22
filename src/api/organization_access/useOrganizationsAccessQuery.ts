import { LoginFormData, RegisterFormData } from "@/types";
import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { useCurrentOrganizationId } from "@/store/useOrganizationStore";
export default function useOrganizationsAccessQuery(id: string | null) {
  const axios = useAxios();
  const { id: org_id } = useCurrentOrganizationId();
  const getOrganizationAccess = (id: string | null) =>
    id
      ? axios.get(`organization/${org_id}/users/${id}`)
      : Promise.reject("id is null");
  const {
    data,
    isLoading,
    error,
    isError,
    isFetching,
    isPreviousData,
    refetch,
  } = useQuery({
    queryKey: queryKeys.getOrganizationAccess(id),
    queryFn: () => getOrganizationAccess(id),
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
