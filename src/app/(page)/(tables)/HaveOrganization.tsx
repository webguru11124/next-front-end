"use client"

import { useCurrentOrganization } from "@/store/useOrganizationStore"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function HaveOrganization({ children }: { children: React.ReactNode }) {
    const { data: organization } = useCurrentOrganization();
    const router = useRouter();
    if (organization === null || typeof organization === "undefined") {
        toast.error(`No organization please create one first`, {
            hideProgressBar: true,
            autoClose: 5000,
            type: "error",
            position: "top-right",
        });
        router.push('/organizations/new');
    }
    else return <>{children}</>
}