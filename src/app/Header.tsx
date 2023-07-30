
import { LogoSvg } from "@/assets/icons/logo";
import Input from "@/components/common/Input";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io"
import Avatar from "@/assets/img/avatar.png"
export default function Header() {
    return <header>
        <div className="flex justify-between  items-center px-6 pt-7 pb-6  bg-white ">
            <LogoSvg />

            <Input icon={<BiSearch />} name="search" placeholder="Search here" className="bg-gray-white border-none placeholder:text-black" />
            <div className="flex items-center ">
                <IoIosNotificationsOutline size={26} className="mr-6" />

                <button className="rounded-md bg-gray-white flex py-1.5 w-[165px] text-blue-primary items-center">
                    <Image src={Avatar} alt="avatar" width={30} height={30} className="rounded-full mx-3" />
                    <span className="">Sam D.</span>
                </button></div>
        </div>
    </header >
}