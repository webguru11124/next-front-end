import { useCurrentOrganizationId } from "@/store/useOrganizationStore";
import useExtraFieldsQuery from "./useExtraFieldsQuery";
export default function useExtraFieldQueryWithOrganization() {
  const { id, isLoading: isOrgLoading } = useCurrentOrganizationId();

  const {
    data,
    isLoading,
    error,
    isError,
    isFetching,
    isPreviousData,
    refetch,
  } = useExtraFieldsQuery(id);
  return {
    data,
    isLoading: isOrgLoading || isLoading,
    error,
    isError,
    isFetching,
    isPreviousData,
    refetch,
  };
}
