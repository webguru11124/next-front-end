"use client"
import { useCurrentOrganization } from "@/store/useOrganizationStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react"; // Import useEffect
import { toast } from "react-toastify";

export default function HaveOrganization({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: organization, isLoading } = useCurrentOrganization();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (organization === null || typeof organization === "undefined")) {
            toast.error(`No organization please create one first`, {
                hideProgressBar: true,
                autoClose: 5000,
                type: "error",
                position: "top-right",
            });
            router.push('/organizations/new');
        }
    }, [isLoading, organization, router]); // Run the effect when isLoading, organization, or router changes

    return <>{children}</>;
}
