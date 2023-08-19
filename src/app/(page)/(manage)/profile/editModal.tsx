"use client"

import useUserQuery from "@/api/user/useUserQuery";
import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SelectBox from "@/components/SelectBox";
import { ModalType, useClose, useModalType, useOpen, useSelected, } from "@/store/useModalStore"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr"
import { z } from "zod";
import { User } from "../users/types";
import { Vendor } from "../../(tables)/(contact)/vendors/types";


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

const schema = z.object({
    email: z.string().email(),
    f_name: z.string().min(1),
    l_name: z.string(),
    phone: z.string(),
    gender: z.string(),
    country: z.string(),
    language: z.string(),
    timezone: z.string(),
});

type FormFields = z.infer<typeof schema>;
export default function EditProfileModal() {
    const close = useClose();
    const modal = useModalType();
    const data = useSelected();

    let initialData: User | null = null;
    if (data instanceof User) {
        initialData = data;
    }

    const { register, handleSubmit, control, formState: { errors: formErrors, isSubmitted }, watch, reset } = useForm({
        defaultValues: {
            email: initalData?.email,
            f_name: initalData?.f_name,
            l_name: initalData?.l_name,
            phone: initalData?.number,
            gender: "",
            country: "",
            language: "",
            timezone: "",
        },
        resolver: zodResolver(schema),
        mode: 'onChange',
    });
    const onSubmit = async (data: FormFields | any) => {
        console.log(data)
    };

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
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="grid grid-cols-2 gap-x-14  gap-y-6 px-6  ">
                    <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                        Personal Details
                    </div>
                    <div className="col-start-1">
                        <Input label="First Name" name="f_name" placeholder="Enter first Name" register={register}
                            error={isSubmitted ? formErrors.f_name : undefined} />
                    </div>
                    <Input label="Last Name" name="l_name" placeholder="Enter last Name" register={register}
                        error={isSubmitted ? formErrors.l_name : undefined} />
                    <Input label="Email" name="email" placeholder="Enter email here" register={register}
                        error={isSubmitted ? formErrors.email : undefined} />
                    <Input label="Phone" name="number" placeholder="Enter phone here" register={register} />
                    <SelectBox
                        label="Gender"
                        options={COMPLETION_STATUSES}
                        register={register}
                        placeholder={`${('Select your gender')}`}
                    />
                    <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                        Regional Settings
                    </div>
                    <div className="col-start-1">
                        <SelectBox
                            label="Country"
                            options={COMPLETION_STATUSES}
                            register={register}
                            placeholder={`${('Select a country')}`}
                        />
                    </div>
                    <SelectBox
                        label="Language"
                        options={COMPLETION_STATUSES}
                        register={register}
                        placeholder={`${('Select a language')}`}
                    />
                    <div className="col-span-2">
                        <SelectBox
                            label="Time Zone"
                            options={COMPLETION_STATUSES}
                            register={register}
                            placeholder={`${('Select your timezone')}`}
                        />
                    </div>
                </div>
                <div className="py-10 flex justify-center">
                    <button className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white mr-12 font-bold" >Save</button>
                    <button onClick={() => close()} className="rounded-md text-[18px] border-2 border-red py-2.5 px-7 text-red  font-bold" >Cancel</button>
                </div>
            </form>
        </div >
    </Modal >)
}
