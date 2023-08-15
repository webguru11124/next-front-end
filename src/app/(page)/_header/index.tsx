"use client"

import { LogoSvg } from "@/assets/icons/logo";
import Input from "@/components/Input";
import { BiSearch } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io"

import Avatar from "@/components/Avatar";
import ProfilePanel from "./_profilePanel";
import { formatDate } from "@/lib/util";
import { Popover } from '@headlessui/react'
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import useUserQuery from "@/api/user/useUserQuery";
export default function Header() {
    // Get the current date
    const currentDate = new Date();

    // Format the current date as "Sat, Mar 25"
    const formattedDate = formatDate(currentDate);

    const { data: session } = useSession();
    const { data, error } = useUserQuery(session?.user?.id);

    return <>
        <div className="flex items-center px-6 pt-7 pb-6  bg-white shadow-xl">
            <div className="w-header">
                <LogoSvg />
            </div>
            <div className="relative grow flex justify-between mobile-only:justify-end">
                <div className="text-xl mobile-only:hidden">
                    <div className="font-semibold">Welcome!</div>
                    <div className="text-lg mt-2">{formattedDate}</div >
                </div>
                <div className="hidden md:block">
                    <Input icon={<BiSearch />} name="search" placeholder="Search here" className="bg-gray-white border-none  rounded-md placeholder:text-black" />
                </div>
                <div className="flex items-center ">
                    <button><IoIosNotificationsOutline size={26} className="mr-6" /></button>

                    <Popover className="relative ">
                        <Popover.Button className="focus:outline-none ">
                            <div className="rounded-md bg-gray-white flex py-1.5 w-[165px] text-blue-primary items-center">
                                <Avatar size="sm" />
                                <span className="">Sam D.</span>
                            </div>
                        </Popover.Button>

                        <Popover.Panel className="absolute right-0 z-50">
                            {({ close }) => (
                                <ProfilePanel close={close} />
                            )}
                        </Popover.Panel>
                    </Popover>


                </div>
            </div>
        </div>
    </>
}