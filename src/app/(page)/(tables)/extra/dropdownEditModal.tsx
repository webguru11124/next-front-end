"use client"

import useExtraFieldCreate from "@/api/extra/useExtraFieldCreate";
import useExtraFieldQuery from "@/api/extra/useExtraFieldQuery";
import useExtraFieldUpdate from "@/api/extra/useExtraFieldUpdate";
import useExtraValueMutation from "@/api/extra_value/useExtraValueMutation";
import useExtraValueQuery from "@/api/extra_value/useExtraValueQuery";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SelectBox from "@/components/SelectBox";
import Spinner from "@/components/Spinner";
import { Tables } from "@/constants/forms";
import { ModalType, useClose, useModalType, useSelected } from "@/store/useModalStore"
import { ExtraValueForm, formExtraValueToForm } from "@/types/extra_value";
import { randomUUID } from "crypto";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr"


export default function DropdownEditModal() {
    const close = useClose();
    const id = useSelected();
    const modal = useModalType();
    let initalData: ExtraValueForm = {
        field: "",
        table: "",
        values: [],
    };
    const { data: values, error, isError, isLoading, refetch, } = useExtraValueQuery(id);
    const { data: extra_field, isLoading: extraLoading, } = useExtraFieldQuery(id);
    const { register, handleSubmit, control, formState: { errors: formErrors, isSubmitted }, watch, reset } = useForm<ExtraValueForm>({
        defaultValues: initalData,
        mode: 'onChange',
    });
    const { fields, remove, append } = useFieldArray({
        control,
        name: "values",
    })

    useEffect(() => {
        if (extra_field || values) {
            reset(formExtraValueToForm({ extra_field, values }));
        }
    }, [values, extra_field, reset]);
    const { mutate, isLoading: mutateLoading, isError: updateError } = useExtraValueMutation();
    const onSubmit = async (data: ExtraValueForm) => {
        mutate({ name: data.field, place: Tables.indexOf(data.table) + 1, id, values: data.values });
    };
    const addButton = (<button
        type="button"
        onClick={() => {
            append({ value: '', id: null })
        }}
        className="rounded-md text-[18px] bg-blue-primary py-2.5 px-6 text-white mr-12 font-bold" >
        add extra value
    </button>);

    return (modal === ModalType.DropdownEditModal && <Modal width="xl" className="h-[604px] py-4">
        <div className="flex flex-col h-full">
            <div className="flex relative justify-center">
                <div className="flex flex-col  mr-[50px]">
                    <span className="font-bold  text-blue-main text-2xl">
                        {`Add drops value`}
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
                        <SelectBox label="Table" name="table" placeholder="Enter table here" options={Tables} control={control} />
                    </div>
                    <Input label="Field" name="field" placeholder="Enter field here" register={register} />
                    <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12 ">
                        Values
                    </div>
                    {fields.length > 0 ?
                        <>
                            {fields.length > 0 && <div className="col-start-1">
                                <Input label={`Value 1`} name="values.0.value" placeholder="Enter field here" register={register} />
                            </div>
                            }{fields.slice(1).map((field, index) =>
                            (<Input label={`Value ${index + 2}`} name={`values.${index + 1}.value`}
                                placeholder="Enter field here" register={register}
                                key={field.id}
                            />
                            ))}

                            {addButton}

                        </> : <div className="col-start-1">
                            {addButton}
                        </div>
                    }
                </div>
                <div className="mt-5 py-10 flex justify-center">
                    {mutateLoading ? <Spinner /> : <button type="submit" className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white mr-12 font-bold" >Save</button>
                    }
                    <button onClick={() => close()} className="rounded-md text-[18px] border-2 border-red py-2.5 px-7 text-red  font-bold" >Cancel</button>
                </div>
            </form>
        </div>
    </Modal>)
}