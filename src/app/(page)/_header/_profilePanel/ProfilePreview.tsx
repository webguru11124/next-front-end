"use client"

import Avatar from "@/components/Avatar";
import { signOut } from "next-auth/react";
import { GoSignOut } from "react-icons/go"
import { LuEdit, } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { PanelCloseType } from "./types";
import useGetProfile from "@/api/user/useGetProfile";
import Spinner from "@/components/Spinner";

export default function ProfilePreview({ close }: { close: PanelCloseType }) {
    const router = useRouter();

    const { data, error, isError, isLoading } = useGetProfile();
    if ((isLoading))
        return <><Spinner></Spinner></>
    return (<> <div className="flex gap-6 self-baseline">
        <div>
            <Avatar size="md" />
        </div>
        <div className="flex flex-col gap-y-1">
            <span className=" text-blue-main font-semibold text-2xl">
                {data.f_name}
            </span>
            <div className="mt-1">
                <span className="text-gray-lighter">Role:</span> Admin
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
            <span>{data.id}</span>
        </div>
        <div className="mt-4">
            <span className="text-gray-lighter">Organization ID: </span>
            <span>224353543523</span>
        </div>
        <div className="mt-4">
            <span className="text-gray-lighter">Email: </span>
            <span>{data.email}</span>
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
        </div></>)
}