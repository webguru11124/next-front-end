import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { useCurrentOrganizationId } from "@/store/useOrganizationStore";
export default function useVendorsQuery() {
  const axios = useAxios();
  const { id } = useCurrentOrganizationId()
  const getVendors = () =>
    id
      ? axios.get(`vendors/organization/${id}`)
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
    queryKey: queryKeys.getVendors(id),
    queryFn: () => getVendors(),
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
