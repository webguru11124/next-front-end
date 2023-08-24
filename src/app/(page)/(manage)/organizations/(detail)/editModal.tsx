"use client";

import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SelectBox from "@/components/SelectBox";
import {
  Countries,
  Currencies,
  Genders,
  Languages,
  OrgTypes,
  Province,
  Roles,
  Timezones,
} from "@/constants";
import {
  ModalType,
  useClose,
  useModalType,
  useOpen,
  useSelected,
} from "@/store/useModalStore";
import { GrClose } from "react-icons/gr";
import { zodResolver } from "@hookform/resolvers/zod";
import useOrganizationUpdate from "@/api/organization/useOrganizationUpdate";
import {
  OrgForm,
  OrgSchema,
  Organization,
  convertOrgToServerFormat,
  fromAPIToOrgForm,
  initalOrg,
} from "@/types/organization";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useOrganizationQuery from "@/api/organization/useOrganizationQuery";

export default function OrganizationEditModal() {
  const close = useClose();
  const modal = useModalType();
  let initalData: OrgForm = initalOrg();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors, isSubmitted },
    watch,
    reset,
  } = useForm<Organization>({
    defaultValues: initalData,
    resolver: zodResolver(OrgSchema),
    mode: "onChange",
  });
  const id = useSelected();
  const { data } = useOrganizationQuery(id);
  useEffect(() => {
    const form = fromAPIToOrgForm(data);
    console.log(form, data);
    if (form) {
      reset(form);
    }
  }, [data, reset]);
  const { mutate } = useOrganizationUpdate();
  const onSubmit = (data: OrgForm) => {
    const mutateData = { id, ...convertOrgToServerFormat(data) };
    mutate(mutateData);
  };
  return (
    modal === ModalType.OrganizationEditModal && (
      <Modal width="xl" className="h-[714px] py-4">
        <div className="flex flex-col h-full">
          <div className="flex relative justify-center">
            <div className="flex flex-col  mr-[50px]">
              <span className="font-bold  text-blue-main text-2xl">
                {data?.name}
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
              <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                Organization Details
              </div>
              <div className="col-start-1">
                <Input
                  label="Organization Name"
                  name="name"
                  placeholder="Enter Name here"
                  register={register}
                  error={formErrors.name}
                />
              </div>
              <SelectBox
                name="country"
                control={control}
                label="Country"
                options={Countries}
                placeholder={`${"Select a country"}`}
              />
              <SelectBox
                name="province"
                control={control}
                label="State/Province"
                options={Province}
                placeholder={`${"Select hazard"}`}
              />
              <SelectBox
                name="type"
                control={control}
                label="Type"
                options={OrgTypes}
                placeholder={`${"Select type of organization"}`}
              />
              <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                Invite User
              </div>
              <div className="col-start-1">
                <Input
                  label="Name"
                  name="invite_name"
                  placeholder="Enter the name of user "
                  register={register}
                />
              </div>
              <Input
                label="Email"
                name="invite_email"
                placeholder="Enter the email of user"
                register={register}
                error={formErrors.invite_email}
              />
              <SelectBox
                name="invite_role"
                control={control}
                label="Role"
                options={Roles}
                placeholder={`${"Select role of user"}`}
              />
              <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                Regional Settings
              </div>
              <div className="col-start-1">
                <SelectBox
                  name="currency"
                  control={control}
                  label="currency"
                  options={Currencies}
                  placeholder={`${"Select a currency"}`}
                />
              </div>
              <SelectBox
                name="language"
                control={control}
                label="Language"
                options={Languages}
                placeholder={`${"Select a language"}`}
              />
              <div className="col-span-2">
                <SelectBox
                  name="time_zone"
                  control={control}
                  label="Time Zone"
                  options={Timezones}
                  placeholder={`${"Select your timezone"}`}
                />
              </div>
            </div>
            <div className="py-10 flex justify-center">
              <button className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white mr-12 font-bold">
                Save
              </button>
              <button
                className="rounded-md text-[18px] border-2 border-red py-2.5 px-7 text-red  font-bold"
                onClick={() => close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  );
}
