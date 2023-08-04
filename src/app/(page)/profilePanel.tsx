"use client"

import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Popup from "@/components/Popup";
import SelectBox from "@/components/SelectBox";
import { ModalType, useClose, useModalType, useOpen } from "@/store/useModalStore"
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoSignOut } from "react-icons/go"
import { LuEdit } from "react-icons/lu"

const COMPLETION_STATUSES = [
    {
        value: 'male',
        label: 'male',
    },
    {
        value: 'female',
        label: 'female',
    },
];

export default function ProfilePanel() {
    const router = useRouter();
    const close = useClose();
    const modal = useModalType();
    return (modal === ModalType.ProfileModal && <Popup width="md" className="h-[714px] py-4">
        <div className="flex flex-col h-full">
            <div className="flex gap-6 self-baseline">
                <div>
                    <Avatar size="md" />
                </div>
                <div className="flex flex-col gap-y-1">
                    <span className=" text-blue-main font-semibold text-2xl">
                        Sam D.
                    </span>
                    <div className="mt-1">
                        <span className="text-gray-lighter">Role:</span> Admin
                    </div>
                    <div>
                        <button className="flex text-xl text-blue-primary" onClick={() => { router.push("/profile"), close(); }}>
                            <LuEdit className="mr-1" />
                            <div>Edit Profile</div>
                        </button>
                    </div>
                    <div className="mt-1">
                        <button className="flex text-xl text-red" onClick={() => {
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
                <span>224353543523</span>
            </div>
            <div className="mt-4">
                <span className="text-gray-lighter">Organization ID: </span>
                <span>224353543523</span>
            </div>
            <div className="mt-4">
                <span className="text-gray-lighter">Email: </span>
                <span>go@go.com</span>
            </div>
            <div className="mt-4">
                <button className="flex text-xl text-blue-primary font-semibold" onClick={() => { router.push("/users"), close(); }}>
                    <LuEdit className="mr-1" />
                    <div>Manage user</div>
                </button>
            </div>
            <div className="mt-7">
                <button className="flex text-xl text-blue-primary font-semibold" onClick={() => { router.push("/organizations"), close(); }}>
                    <LuEdit className="mr-1" />
                    <div>Manage Organization</div>
                </button>
            </div>
        </div>
    </Popup>)
}