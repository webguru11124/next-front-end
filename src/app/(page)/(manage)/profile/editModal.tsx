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
import { useEffect } from "react";
import useGetProfile from "@/api/user/useGetProfile";
import { Spinner } from "@nextui-org/react";
import { Countries, Genders, Languages, Timezones } from "@/constants/forms";
import useUserMutation from "@/api/user/useUserMutation";
import { UserForm, UserSchema, getUserFromSource } from "@/types/user";



export default function EditProfileModal() {
    const close = useClose();
    const modal = useModalType();
    let initalData: UserForm = {
        email: "jack@test.com",
        f_name: "jai",
        l_name: "smith",
        number: "123-4567",
        gender: "male",
        country: "US",
        language: "english",
        timezone: "EST",
    };
    const { data, error, isError, isLoading, id, refetch } = useGetProfile();
    const { register, handleSubmit, control, formState: { errors: formErrors, isSubmitted }, watch, reset } = useForm({
        defaultValues: initalData,
        resolver: zodResolver(UserSchema),
        mode: 'onChange',
    });
    useEffect(() => {
        if (data) {
            reset(getUserFromSource(data));
        }
    }, [data, reset]);
    const { mutate, isLoading: updateLoading, isError: updateError } = useUserMutation();
    const onSubmit = async (data: UserForm) => {
        if (id)
            mutate({ id, ...data });
    };

    if ((isLoading))
        return <><Spinner></Spinner></>;

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
                        name="gender"
                        options={Genders}
                        control={control}
                        placeholder={`${('Select your gender')}`}
                    />
                    <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                        Regional Settings
                    </div>
                    <div className="col-start-1">
                        <SelectBox
                            name="country"
                            label="Country"
                            options={Countries}
                            control={control}
                            placeholder={`${('Select a country')}`}
                        />
                    </div>
                    <SelectBox
                        name="language"
                        label="Language"
                        options={Languages}
                        control={control}
                        placeholder={`${('Select a language')}`}
                    />
                    <div className="col-span-2">
                        <SelectBox
                            name="timezone"
                            label="Time Zone"
                            options={Timezones}
                            control={control}
                            placeholder={`${('Select your timezone')}`}
                        />
                    </div>
                </div>
                <div className="py-10 flex justify-center">
                    <button type="submit" className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white mr-12 font-bold" >Save</button>

                    <button onClick={() => close()} className="rounded-md text-[18px] border-2 border-red py-2.5 px-7 text-red  font-bold" >Cancel</button>
                </div>
            </form>
        </div >
    </Modal >)
}
