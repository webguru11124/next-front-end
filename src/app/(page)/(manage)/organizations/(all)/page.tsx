"use client"

import { Card } from "@nextui-org/react"
import OrganiaztionCard from "./card"
import useOrganizationCreate from "@/api/organization/useOrganizationCreate"
import useOrganizationByUserQuery from "@/api/organization/useOrganizationsByUserQuery"
import { useSession } from "next-auth/react"
import { OrganizationCardType } from "./types"
import Spinner from "@/components/Spinner"


export default function OragnizationsPage() {
    const { data } = useSession();
    const { data: organizations, isLoading } = useOrganizationByUserQuery(`${data?.user?.id}`);
    if (isLoading) return <Spinner />
    return <div className="w-full flex flex-wrap justify-center">
        {organizations && organizations.map((organization: OrganizationCardType) => (
            <div className="mr-32 mb-32" key={organization.id}>
                <OrganiaztionCard organization={organization} />
            </div>))}
    </div >
}