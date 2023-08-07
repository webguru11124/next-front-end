
"use client"

import Avatar from "@/components/Avatar"
import Card from "@/components/Card";
import { ModalType, useModal } from "@/store/useModalStore";
import { useRouter } from "next/navigation";

export default function OrganiaztionCard() {
    const router = useRouter();
    const id = "675687568"
    return <><Card size="md">
        <div className="flex justify-between items-center mb-5 ">
            <div className="flex items-center">
                <div className="ml-7 flex justify-between">
                    <div >
                        <h2 className="text-blue-main  font-bold text-2xl">Organization Name</h2>
                    </div>
                </div>
            </div>

        </div >
        <div className="grid grid-cols-2 gap-y-2  mb-3 ">
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
        </div>
        <div className="italic text-lg mb-7 text-gray-lighter">Organization created on 28 Mar, 2023</div>

        <div className="flex flex-row-reverse">
            <button className="rounded-md text-[18px] border-2 border-blue-primary py-2.5 px-7 text-blue-primary font-bold"
                onClick={() => router.push(`/organizations/${id}`)} >Go to Ogranization</button>
        </div>

    </Card >
    </>
}