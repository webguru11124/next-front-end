
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import useUserQuery from "@/api/user/useUserQuery";
export default function useGetProfile() {

    const { data: session } = useSession();

    const { data, error, isError, isLoading } = useUserQuery(session?.user?.id ?? "");

    return { data, error, isError, isLoading }
}