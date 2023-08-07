"use client"

import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SelectBox from "@/components/SelectBox";
import { ModalType, useClose, useModalType, useOpen } from "@/store/useModalStore"
import { GrClose } from "react-icons/gr"


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

export default function InviteUserModal() {
    const close = useClose();
    const modal = useModalType();
    return (modal === ModalType.InviteUser && <Modal width="md" className="h-[714px] py-4 px-20">
        <div className="flex flex-col h-full">
            <div className="flex relative justify-center">
                <div className="flex flex-col  mr-[50px]">
                    <span className="font-bold  text-blue-main text-2xl">
                        Invite User
                    </span>
                    <div className="mt-5 mb-4">
                        <Avatar size="md" />
                    </div>
                </div>
                <button
                    className="h-10 w-10 flex justify-center items-center rounded bg-white text-grayscale-secondary absolute right-0"
                    onClick={close}
                >
                    <GrClose />
                </button>

            </div>
            <form >
                <div className="mt-5">
                    <Input label="Name" name="name" placeholder="Enter first Name" />
                </div>
                <div className="mt-5">
                    <Input label="Email" type="email" name="email" placeholder="Enter last Name" />
                </div>
                <div className="mt-5">
                    <SelectBox
                        label="Role"
                        options={COMPLETION_STATUSES}
                        placeholder={`${('Select your role')}`}
                        onChange={(val) => ({})}
                    />
                </div>

                <div className="py-10 flex justify-center">
                    <button className="btn rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white mr-12 font-bold" >Save</button>
                    <button className="rounded-md text-[18px] border-2 border-red py-2.5 px-7 text-red  font-bold" >Cancel</button>
                </div>
            </form>
        </div >
    </Modal >)
}