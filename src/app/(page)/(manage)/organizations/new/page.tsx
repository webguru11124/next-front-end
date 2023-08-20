"use client"

import useOrganizationCreate from "@/api/organization/useOrganizationCreate";
import Card from "@/components/Card";
import Input from "@/components/Input";
import SelectBox from "@/components/SelectBox";
import { Countries, Currencies, Genders, Languages, OrgTypes, Province, Roles, Timezones } from "@/constants/forms";
import { OrgForm, OrgSchema, convertOrgToServerFormat, initalOrg } from "@/types/organization";
import { LanguageIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function CreateOrganization() {
    const router = useRouter();
    let initalData: OrgForm = initalOrg();
    const { register, handleSubmit, control, formState: { errors: formErrors, isSubmitted }, watch, reset } = useForm({
        defaultValues: initalData,
        resolver: zodResolver(OrgSchema),
        mode: 'onChange',
    });
    const { mutate } = useOrganizationCreate();
    const onSubmit = (data: OrgForm) => {
        mutate(convertOrgToServerFormat(data));
    }

    return (<div >
        <form onSubmit={handleSubmit(onSubmit)}>
            < div className="flex flex-col gap-y-5">
                <Card size="lg">
                    <div className="mb-5">
                        <h2 className="text-blue-main  font-bold text-2xl text-center">
                            Organization Details
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-x-14  gap-y-6 px-6  ">
                        <Input label="Organization Name" name="name" placeholder="Enter Name here" register={register} error={formErrors.name} />
                        <SelectBox
                            name="country"
                            control={control}
                            label="Country"
                            options={Countries}
                            placeholder={`${('Select a country')}`}
                        />
                        <SelectBox
                            name="province"
                            control={control}
                            label="State/Province"
                            options={Province}
                            placeholder={`${('Select hazard')}`}
                        />
                        <SelectBox
                            name="type"
                            control={control}
                            label="Type"

                            options={OrgTypes}
                            placeholder={`${('Select type of organization')}`}
                        />
                    </div>
                </Card>
                <Card size="lg">
                    <div className="mb-5">
                        <h2 className="text-blue-main  font-bold text-2xl text-center">
                            Invite User</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-x-14  gap-y-6 px-6  ">
                        <Input label="Name" name="invite_name" placeholder="Enter the name of user " register={register} />
                        <Input label="Email" name="invite_email" placeholder="Enter the email of user" register={register} error={formErrors.invite_email} />
                        <SelectBox
                            name="invite_role"
                            control={control}
                            label="Role"
                            options={Roles}
                            placeholder={`${('Select role of user')}`}
                        />
                    </div>
                </Card>
                <Card size="lg">
                    <div className="mb-5">
                        <h2 className="text-blue-main  font-bold text-2xl text-center">Regional Settings </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-x-14  gap-y-6 px-6  ">
                        <SelectBox
                            name="currency"
                            control={control}
                            label="currency"
                            options={Currencies}
                            placeholder={`${('Select a currency')}`}
                        />
                        <SelectBox
                            name="language"
                            control={control}
                            label="Language"
                            options={Languages}
                            placeholder={`${('Select a language')}`}
                        />
                        <div className="col-span-2">
                            <SelectBox
                                name="time_zone"
                                control={control}
                                label="Time Zone"
                                options={Timezones}
                                placeholder={`${('Select your timezone')}`}
                            /></div>
                    </div>
                </Card>
            </div>
            <div className='mt-9 w-full flex justify-between'>
                <button onClick={() => router.back()} className="text-light-color"> Skip For Later</button>
                <button className="rounded-md text-2lg bg-blue-primary py-2.5 px-10 text-white font-bold " >Get Started</button>
            </div>
        </form>
    </div >

    );
}