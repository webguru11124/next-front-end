
"use client"

import useGetProfile from "@/api/user/useGetProfile";
import Avatar from "@/components/Avatar"
import { ModalType, useModal } from "@/store/useModalStore";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function ProfileCard() {

    const { data, error, isError, isLoading } = useGetProfile();
    const openModal = useModal();
    if ((isLoading))
        return <><Spinner></Spinner></>
    return <>
        <div className="rounded-md bg-white shadow-lg  w-[920px] p-7">
            <div className="flex justify-between items-center mb-5 ">
                <div className="flex items-center">
                    <Avatar size="md" />
                    <div className="ml-7 flex justify-between">
                        <div >
                            <h2 className="text-blue-main  font-bold text-2xl">{data.f_name}</h2>
                            <h4 className="text-gray-lighter">{data.email}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white font-bold"
                        onClick={() => openModal({ modalType: ModalType.PorfileEditModal, id: data.id })}>Edit</button>
                </div>

            </div >
            <div className="flex space-x-36 mb-5">
                <div >
                    <div className="text-gray-lighter text-xl">
                        Full Name:
                    </div>
                    <div className="mt-2 text-xl">
                        {`${data.f_name} ${data.l_name}`}
                    </div>
                </div>

                <div >
                    <div className="text-gray-lighter text-xl">
                        Gender:
                    </div>
                    <div className="mt-2 text-xl">
                        Male
                    </div>
                </div>
                <div >
                    <div className="text-gray-lighter text-xl">
                        Language:
                    </div>
                    <div className="mt-2 text-xl">
                        {data.language ?? "english"}
                    </div>
                </div>
            </div>
            <div className="flex space-x-36 mb-5">
                <div >
                    <div className="text-gray-lighter text-xl">
                        Timezone:
                    </div>
                    <div className="mt-2 text-xl">
                        (GMT +5:00) Pakistan Time ( Asia/Karachi )
                    </div>
                </div>
            </div>
            <div className="flex space-x-36 mb-5">
                <div >
                    <div className="text-gray-lighter text-xl">
                        Email:
                    </div>
                    <div className="mt-2 text-xl">
                        {data.email}
                    </div>
                </div>

                <div >
                    <div className="text-gray-lighter text-xl">
                        Phone:
                    </div>
                    <div className="mt-2 text-xl">
                        {data.phone ?? "no phone"}
                    </div>
                </div>
            </div>

        </div >
    </>
}