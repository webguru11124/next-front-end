"use client"

import useGetProfile from "@/api/user/useGetProfile";
import Avatar from "@/components/Avatar";


export default function ProfileButton() {
    const { data, error, isError, isLoading } = useGetProfile();
    return (<div className="rounded-md bg-gray-white flex py-1.5 w-[165px] text-blue-primary items-center">
        <Avatar size="sm" />
        {<span className="">{data?.f_name}</span>}
    </div>)
}