"use client"

import { relative } from 'path';
import OrganizationSelect from "./OrganizationSelect";
import { PanelCloseType } from './types';
import { signOut } from 'next-auth/react';
import Spinner from '@/components/Spinner';
import { GoSignOut } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import useGetProfile from '@/api/user/useGetProfile';
import { LuEdit } from 'react-icons/lu';
import Avatar from '@/components/Avatar';
import useOrganizationsByUserQuery from '@/api/organization/useOrganizationsByUserQuery';
import { useState } from 'react';
import { Roles } from '@/constants/forms';
import { useCurrentOrganization, useCurrentOrganizationIndex, useSetCurrentOrganizationIndex } from '@/store/useOrganizationStore';


export default function ProfilePanel({ close }: { close: PanelCloseType }) {

    const router = useRouter();

    const { data, error, isError, isLoading: ProfileLoading, id } = useGetProfile();
    const { data: organizations, isLoading: OrganizationLoading } = useOrganizationsByUserQuery(`${id}`);
    const currentOrganizationIndex = useCurrentOrganizationIndex();
    const setCurrentOrganization = useSetCurrentOrganizationIndex();
    const { data: currentOrganization, isLoading } = useCurrentOrganization();
    if ((ProfileLoading || OrganizationLoading))
        return <>
        </>
    return <div className="h-[714px] w-[400px] py-4 rounded-md  bg-white shadow-md overflow-y-auto ">
        <div className="flex flex-col h-full px-8 py-10">

            <div className="flex gap-6 self-baseline">
                <div>
                    <Avatar size="md" />
                </div>
                <div className="flex flex-col gap-y-1">
                    <span className=" text-blue-main font-semibold text-2xl">
                        {data?.f_name}
                    </span>
                    <div className="mt-1">
                        <span className="text-gray-lighter">Role:</span> {Roles[currentOrganization?.role]}
                    </div>
                    <div>
                        <button className="flex text-xl text-blue-primary font-bold" onClick={() => { close(); router.push("/profile"), close(); }}>
                            <LuEdit className="mr-1" />
                            <div>Edit Profile</div>
                        </button>
                    </div>
                    <div className="mt-1">
                        <button className="flex text-xl text-red  font-bold" onClick={() => {
                            close();
                            signOut({ redirect: true, callbackUrl: "/login" })
                        }}>
                            <GoSignOut className="mr-1" />
                            <div>Sign Out</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <span className="text-gray-lighter">User ID: </span>
                <span>{data?.id}</span>
            </div>
            <div className="mt-4">
                <span className="text-gray-lighter">Organization ID: </span>
                <span>{currentOrganization?.id}</span>
            </div>
            <div className="mt-4">
                <span className="text-gray-lighter">Email: </span>
                <span>{data?.email}</span>
            </div>
            <div className="mt-4">
                <button className="flex text-xl text-blue-primary  font-bold" onClick={() => { close(); router.push("/users"), close(); }}>
                    <LuEdit className="mr-1" />
                    <div>Manage user</div>
                </button>
            </div>
            <div className="mt-7">
                <button className="flex text-xl text-blue-primary  font-bold" onClick={() => { close(); router.push("/organizations"), close(); }}>
                    <LuEdit className="mr-1" />
                    <div>Manage Organization</div>
                </button>
            </div>

            <OrganizationSelect close={close} value={currentOrganizationIndex} organizations={organizations} onChange={setCurrentOrganization} />

        </div>
    </div>
}