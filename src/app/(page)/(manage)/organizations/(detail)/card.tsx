
"use client"

import Avatar from "@/components/Avatar"
import Card from "@/components/Card";
import { ModalType, useModal } from "@/store/useModalStore";
import { FiEdit, FiTrash } from "react-icons/fi"
import { useRouter } from "next/navigation";

export default function OrganiaztionCard() {
    const router = useRouter();
    const id = "675687568"
    const open = useModal();
    return <>
        <Card size="lg">
            <div className="w-full flex justify-between items-center mb-3 ">
                <div className="w-full  flex justify-between items-center">
                    <div >
                        <h2 className="text-blue-main  font-bold text-2xl">Organization Name</h2>
                    </div>
                    <div className="flex gap-x-7">
                        <button className=" text-2xl p-2 text-blue-primary shadow-3xl rounded-md " onClick={() => open({ modalType: ModalType.OrganizationEditModal })}>
                            <FiEdit />
                        </button>
                        <button className=" text-2xl p-2 text-red shadow-3xl rounded-md ">
                            <FiTrash />
                        </button>
                    </div>
                </div>
            </div >
            <span className="text-green-text bg-green-light px-2 py-1 rounded-sm ">
                Default
            </span>
            <div className="grid grid-cols-2 gap-y-3  mb-3 mt-7">
                <div className="text-gray-lighter text-xl">
                    Organization ID:
                </div>
                <div className="text-xl">
                    {id}
                </div>

                <div className="text-gray-lighter text-xl">
                    Type
                </div>
                <div className="text-xl">
                    Trading
                </div>
                <div className="text-gray-lighter text-xl">
                    Your Role
                </div>
                <div className="text-xl">
                    Admin
                </div>
                <div className="text-gray-lighter text-xl">
                    Country
                </div>
                <div className="text-xl">
                    Turkey
                </div>
                <div className="text-gray-lighter text-xl">
                    State/Province
                </div>
                <div className="text-xl">
                    Turkey
                </div>
                <div className="text-gray-lighter text-xl">
                    Currency
                </div>
                <div className="text-xl">
                    USD                </div>
                <div className="text-gray-lighter text-xl">
                    Language
                </div>
                <div className="text-xl">
                    English
                </div>
                <div className="text-gray-lighter text-xl">
                    Timezone
                </div>
                <div className="text-xl">
                    GMT +5 Turkey
                </div>
            </div></Card>
    </>
}