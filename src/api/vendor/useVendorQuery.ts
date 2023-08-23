import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
import { useCurrentOrganizationId } from "@/store/useOrganizationStore";
export default function useVendorQuery(id: string | null) {
  const axios = useAxios();
  const getVendor = () =>
    id
      ? axios.get(`vendors/${id}`)
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
    queryKey: queryKeys.getVendor(id),
    queryFn: () => getVendor(),
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
