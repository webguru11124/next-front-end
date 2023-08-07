"use client"

import { LogoSvg } from "@/assets/icons/logo";
import Input from "@/components/Input";
import { BiSearch } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io"

import Avatar from "@/components/Avatar";
import { ModalType, useModal } from "@/store/useModalStore";
import ProfilePanel from "./_profilePanel";
import { formatDate } from "@/lib/util";
export default function Header() {
    const openModal = useModal();

    // Get the current date
    const currentDate = new Date();

    // Format the current date as "Sat, Mar 25"
    const formattedDate = formatDate(currentDate);


    return <>
        <div className="flex items-center px-6 pt-7 pb-6  bg-white shadow-xl">
            <div className="w-header">
                <LogoSvg />
            </div>
            <div className="relative grow flex justify-between">
                <div className="text-xl mobile-only:hidden">
                    <div className="font-semibold">Welcome!</div>
                    <div className="text-lg mt-2">{formattedDate}</div >
                </div>
                <div className="hidden md:block">
                    <Input icon={<BiSearch />} name="search" placeholder="Search here" className="bg-gray-white border-none  rounded-md placeholder:text-black" />
                </div>
                <div className="flex items-center ">
                    <IoIosNotificationsOutline size={26} className="mr-6" />

                    <button className="rounded-md bg-gray-white flex py-1.5 w-[165px] text-blue-primary items-center" onClick={() => openModal({ modalType: ModalType.ProfileModal })}>
                        <Avatar size="sm" />
                        <span className="">Sam D.</span>
                    </button>


                </div>

                <ProfilePanel />
            </div>
        </div>
    </>
}