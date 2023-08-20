
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import useUserQuery from "@/api/user/useUserQuery";
export default function useGetProfile() {

    const { data: session } = useSession();

    const { data, error, isError, isLoading, refetch, } = useUserQuery(session?.user?.id ?? "");

    return { data, error, isError, isLoading, id: session?.user?.id, refetch }
}
export const useCurrentUser = () => {
    const { data: session } = useSession();
    return { id: session?.user?.id }
}