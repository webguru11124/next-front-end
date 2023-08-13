
"use client"

import Avatar from "@/components/Avatar"
import { ModalType, useModal } from "@/store/useModalStore";

export default function ProfileCard() {
    const openModal = useModal();
    return <>
        <div className="rounded-md bg-white shadow-lg  w-[920px] p-7">
            <div className="flex justify-between items-center mb-5 ">
                <div className="flex items-center">
                    <Avatar size="md" />
                    <div className="ml-7 flex justify-between">
                        <div >
                            <h2 className="text-blue-main  font-bold text-2xl">Sam D</h2>
                            <h4 className="text-gray-lighter">Sam_fake@gmail.com</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white font-bold"
                        onClick={() => openModal({ modalType: ModalType.PorfileEditModal })}>Edit</button>
                </div>

            </div >
            <div className="flex space-x-36 mb-5">
                <div >
                    <div className="text-gray-lighter text-xl">
                        Full Name:
                    </div>
                    <div className="mt-2 text-xl">
                        Sam d
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
                        English
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
                        Sam_fake@gmail.com
                    </div>
                </div>

                <div >
                    <div className="text-gray-lighter text-xl">
                        Phone:
                    </div>
                    <div className="mt-2 text-xl">
                        0987-
                    </div>
                </div>
            </div>

        </div >
    </>
}