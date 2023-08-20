"use client"

import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SelectBox from "@/components/SelectBox";
import { ModalType, useClose, useModal, useModalType, useOpen } from "@/store/useModalStore"
import { GrClose } from "react-icons/gr"
import { FiTrash } from "react-icons/fi"
import { Vendor } from "./types";


export default function VendorDetailModal({ vendor }: { vendor: Vendor }) {
    const close = useClose();
    const openModal = useModal()
    const modal = useModalType();
    return (modal === ModalType.VendorDetail && <Modal width="lg" className="h-[451px] py-4 px-20">
        <div className="flex flex-col h-full">
            <div className="flex relative ">
                <div className="flex   mr-12 items-center mt-5 mb-4">
                    <div className="">
                        <Avatar size="2md" />
                    </div>
                    <div className="flex flex-col ">
                        <div className="text-2xl text-blue-main font-bold">
                            {vendor.name}
                        </div>
                        <div className="flex  mt-8 justify-between">
                            <button className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white font-bold"
                                onClick={() => { close(); openModal({ modalType: ModalType.PorfileEditModal }) }}>
                                Edit vendor
                            </button>
                            <div className="flex gap-x-7 ml-6">
                                <button className=" text-2xl p-2 text-red shadow-3xl rounded-md ">
                                    <FiTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="h-10 w-10 flex justify-center items-center rounded bg-white text-grayscale-secondary absolute right-0"
                    onClick={close}
                >
                    <GrClose />
                </button>

            </div>
            <div className="mt-16  flex justify-center">
                <div className="flex-col ">
                    <div className="flex gap-x-5 mb-2">
                        <div className="text-gray-lighter text-xl">
                            Email:
                        </div>
                        <div className="text-xl">
                            {vendor.email}
                        </div>
                    </div>
                    <div className="flex gap-x-5">
                        <div className="text-gray-lighter text-xl">
                            Role:
                        </div>
                        <div className="text-xl">
                            {vendor.role}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </Modal >)
}