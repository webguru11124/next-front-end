import useAxios from "../instance";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKeys";
export default function useExtraFieldsQuery(id: string | null) {
  const axios = useAxios();
  const getExtra = (id: string | null) =>
    id
      ? axios.get(`extra_field/organization/${id}`)
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
    queryKey: queryKeys.getExtrasWithOrganization(id),
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
