"use client"

import Avatar from "@/components/Avatar";
import Popup from "@/components/Popup";
import { ModalType, useClose, useModalType, useOpen } from "@/store/useModalStore"
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoSignOut } from "react-icons/go"
import { LuEdit, LuSettings } from "react-icons/lu";

import { RadioGroup } from '@headlessui/react'

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
                        <button className="flex text-xl text-blue-primary font-bold" onClick={() => { router.push("/profile"), close(); }}>
                            <LuEdit className="mr-1" />
                            <div>Edit Profile</div>
                        </button>
                    </div>
                    <div className="mt-1">
                        <button className="flex text-xl text-red  font-bold" onClick={() => {
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
                <button className="flex text-xl text-blue-primary  font-bold" onClick={() => { router.push("/users"), close(); }}>
                    <LuEdit className="mr-1" />
                    <div>Manage user</div>
                </button>
            </div>
            <div className="mt-7">
                <button className="flex text-xl text-blue-primary  font-bold" onClick={() => { router.push("/organizations"), close(); }}>
                    <LuEdit className="mr-1" />
                    <div>Manage Organization</div>
                </button>
            </div>
            <div className="mt-9 flex justify-between">
                <div className=" text-xl text-blue-main  font-bold" >
                    My Organization
                </div>
                <button className="text-blue-primary text-xl flex items-center">
                    <LuSettings className="mr-2" /> <span>Manage</span>
                </button>
            </div>
            <RadioGroup value={plan} onChange={setPlan}>
                <RadioGroup.Label>Plan</RadioGroup.Label>
                <RadioGroup.Option value="startup">
                    {({ checked }) => (
                        <span className={checked ? 'bg-blue-200' : ''}>Startup</span>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option value="business">
                    {({ checked }) => (
                        <span className={checked ? 'bg-blue-200' : ''}>Business</span>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option value="enterprise">
                    {({ checked }) => (
                        <span className={checked ? 'bg-blue-200' : ''}>Enterprise</span>
                    )}
                </RadioGroup.Option>
            </RadioGroup>
        </div>
    </Popup>)
}