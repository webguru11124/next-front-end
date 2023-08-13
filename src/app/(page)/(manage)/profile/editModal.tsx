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

export default function EditProfileModal() {
    const close = useClose();
    const modal = useModalType();
    return (modal === ModalType.PorfileEditModal && <Modal width="xl" className="h-[714px] py-4">
        <div className="flex flex-col h-full">
            <div className="flex relative justify-center">
                <div className="flex flex-col  mr-[50px]">
                    <span className="font-bold  text-blue-main text-2xl">
                        Edit Profile
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
                <div className="grid grid-cols-2 gap-x-14  gap-y-6 px-6  ">
                    <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                        Personal Details
                    </div>
                    <div className="col-start-1">
                        <Input label="First Name" name="first_name" placeholder="Enter first Name" />
                    </div>
                    <Input label="Last Name" name="last_name" placeholder="Enter last Name" />
                    <Input label="Email" name="email" placeholder="Enter email here" />
                    <Input label="Phone" name="phone" placeholder="Enter phone here" />
                    <SelectBox
                        label="Gender"
                        options={COMPLETION_STATUSES}
                        placeholder={`${('Select your gender')}`}
                    />
                    <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                        Regional Settings
                    </div>
                    <div className="col-start-1">
                        <SelectBox
                            label="Country"
                            options={COMPLETION_STATUSES}
                            placeholder={`${('Select a country')}`}
                        />
                    </div>
                    <SelectBox
                        label="Language"
                        options={COMPLETION_STATUSES}
                        placeholder={`${('Select a language')}`}
                    />
                    <div className="col-span-2">
                        <SelectBox
                            label="Time Zone"
                            options={COMPLETION_STATUSES}
                            placeholder={`${('Select your timezone')}`}
                        />
                    </div>
                </div>
                <div className="py-10 flex justify-center">
                    <button className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white mr-12 font-bold" >Save</button>
                    <button className="rounded-md text-[18px] border-2 border-red py-2.5 px-7 text-red  font-bold" >Cancel</button>
                </div>
            </form>
        </div>
    </Modal>)
}