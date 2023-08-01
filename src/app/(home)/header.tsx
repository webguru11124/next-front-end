"use client"

import { LogoSvg } from "@/assets/icons/logo";
import Input from "@/components/Input";
import { BiSearch } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io"

import Avatar from "@/components/Avatar";
import { ModalType, useModal } from "@/store/useModalStore";
import ProfilePanel from "./profilePanel";
export default function Header() {
    const openModal = useModal();
    return <header>
        <div className="flex justify-between  items-center px-6 pt-7 pb-6  bg-white ">
            <LogoSvg />

            <Input icon={<BiSearch />} name="search" placeholder="Search here" className="bg-gray-white border-none  rounded-md placeholder:text-black" />
            <div className="flex items-center ">
                <IoIosNotificationsOutline size={26} className="mr-6" />

                <button className="rounded-md bg-gray-white flex py-1.5 w-[165px] text-blue-primary items-center" onClick={() => openModal({ modalType: ModalType.ProfileModal })}>
                    <Avatar size="sm" />
                    <span className="">Sam D.</span>
                </button>
            </div>
        </div>
        <ProfilePanel></ProfilePanel>
    </header >
}