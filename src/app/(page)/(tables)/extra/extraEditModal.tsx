"use client"

import useExtraFieldCreate from "@/api/extra/useExtraFieldCreate";
import useExtraFieldQuery from "@/api/extra/useExtraFieldQuery";
import useExtraFieldUpdate from "@/api/extra/useExtraFieldUpdate";
import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SelectBox from "@/components/SelectBox";
import Spinner from "@/components/Spinner";
import { Tables } from "@/constants/forms";
import { ModalType, useClose, useModalType, useOpen, useSelected } from "@/store/useModalStore"
import { ExtraForm, ExtraFormWithServer, ExtraSchema, convertToExtraToServer, formExtraToForm } from "@/types/extra";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr"


export default function EditExtraModal() {
    const close = useClose();
    const id = useSelected();
    const modal = useModalType();
    let initalData: ExtraForm = {
        name: ""
    };
    const { data, error, isError, isLoading, refetch } = useExtraFieldQuery(`${id}`);
    const { register, handleSubmit, control, formState: { errors: formErrors, isSubmitted }, watch, reset } = useForm({
        defaultValues: initalData,
        resolver: zodResolver(ExtraSchema),
        mode: 'onChange',
    });
    useEffect(() => {
        if (data) {
            reset(formExtraToForm(data));
        }
    }, [data, reset]);
    const { mutate: update, isLoading: updateLoading, isError: updateError } = useExtraFieldUpdate();
    const { mutate: create, isLoading: createLoading, isError: createError } = useExtraFieldCreate();
    const onSubmit = async (data: ExtraForm) => {
        const mutateData: ExtraFormWithServer = convertToExtraToServer(data);
        if (id)
            update({ id, ...mutateData });
        else
            create({ ...mutateData });
    };

    return (modal === ModalType.ExtraEditModel && <Modal width="xl" className="h-[604px] py-4">
        <div className="flex flex-col h-full">
            <div className="flex relative justify-center">
                <div className="flex flex-col  mr-[50px]">
                    <span className="font-bold  text-blue-main text-2xl">
                        {`${id ? "Edit" : "Add"} Extra Field`}
                    </span>
                </div>
                <button
                    className="h-10 w-10 flex justify-center items-center rounded bg-white text-grayscale-secondary absolute right-0"
                    onClick={close}
                >
                    <GrClose />
                </button>

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-x-14  gap-y-6 px-6  ">
                    <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-20 text-blue-main ml-[-48px] px-12 ">
                        Field Details
                    </div>
                    <div className="col-start-1">
                        <Input label="Name" name="name" placeholder="Enter name here" register={register} error={formErrors.name} />
                    </div>
                    <SelectBox
                        name="table"
                        control={control}
                        label="Table"
                        options={Tables}
                        placeholder={`${('Select a table')}`}
                    />
                    <SelectBox
                        name="show_in_table"
                        control={control}
                        label="Show in table"
                        options={["true", "false"]}
                        placeholder={`${('Select a show in table option')}`}
                    />
                    <SelectBox
                        name="required"
                        control={control}
                        label="Required"
                        options={["true", "false"]}
                        placeholder={`${('Select a required option')}`}
                    />

                    <SelectBox
                        name="drop_down"
                        control={control}
                        label="Dropdown"
                        options={["true", "false"]}
                        placeholder={`${('Select a dropdown option')}`}
                    />
                </div>
                <div className="py-10 flex justify-center">
                    <button type="submit" className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white mr-12 font-bold" >Save</button>
                    <button onClick={() => close()} className="rounded-md text-[18px] border-2 border-red py-2.5 px-7 text-red  font-bold" >Cancel</button>
                </div>
            </form>
        </div>
    </Modal>)
}