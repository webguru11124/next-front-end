"use client";

import useExtraFieldByTable from "@/api/extra/useExtraFieldByTable";
import useExtraFieldsQuery from "@/api/extra/useExtraFieldsQuery";
import useOrganizationsByUserQuery from "@/api/organization/useOrganizationsByUserQuery";
import useCurrentUser from "@/api/user/useCurrentUser";
import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SelectBox from "@/components/SelectBox";
import { Currencies } from "@/constants";
import {
  ModalType,
  useClose,
  useModalType,
  useOpen,
  useSelected,
} from "@/store/useModalStore";
import { useCurrentOrganizationId, useCurrentOrganizationIndex } from "@/store/useOrganizationStore";
import { Extra, ExtraWithServer } from "@/types/extra";
import { Organization } from "@/types/organization";
import { VendorForm, VendorSchema, convertVendorToServer, fromExtraToForm, initialVendorForm } from "@/types/vendor";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { BsCloudArrowUp, BsMap } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import ExtraItem from "./extraItem";
import { useEffect, useMemo } from "react";
import useVendorCreate from "@/api/vendor/useVendorCreate";
import useVendorQuery from "@/api/vendor/useVendorQuery";
import useVendorUpdate from "@/api/vendor/useVendorUpdate";
import FileUpload from "@/components/Upload";



export default function VendorEditModal() {
  const close = useClose();
  const modal = useModalType();
  const id = useSelected();
  const { id: user_id } = useCurrentUser();
  const { data } = useOrganizationsByUserQuery(user_id ?? null);
  const organizations =
    useMemo(
      () => data?.map((org: Organization) =>
        ({ label: org.name, value: org.id })) ?? [], [data]);
  const org_id = useCurrentOrganizationIndex();
  const { data: vendor } = useVendorQuery(id);
  const methods = useForm<VendorForm>({
    defaultValues: { ...initialVendorForm(), organization: organizations[org_id] },
    resolver: zodResolver(VendorSchema),
    mode: "onChange",
  });
  const { register, control, formState: { errors }, handleSubmit, reset, watch } = methods; ``
  const { data: vendor_extra, isLoading } = useExtraFieldByTable("Vendor");

  useEffect(() => {
    if (id && vendor) {
      reset(fromExtraToForm(vendor, organizations))
    }
    if (!id) {
      reset({ ...initialVendorForm(), organization: organizations[org_id] })
    }
  }, [vendor_extra, vendor, reset, watch, id, org_id, organizations])

  const { mutate: create, isLoading: createLoading } = useVendorCreate();
  const { mutate: update, isLoading: updateLoading } = useVendorUpdate();
  const onSubmit = async (data: VendorForm) => {
    if (!id)
      create(convertVendorToServer(data, vendor_extra));
    if (id)
      update({ id, ...convertVendorToServer(data, vendor_extra) });
  }
  if (modal !== ModalType.VendorEditModal)
    return <div></div>
  return ((
    <Modal width="xl" className="h-[714px] py-4">
      <div className="flex flex-col h-full">

        <FormProvider {...methods}>
          <div className="flex relative justify-center">
            <div className="flex flex-col  justify-center">
              <span className="font-bold  text-blue-main text-2xl">
                {`${id ? "Edit" : "ADD New"} Vendor`}
              </span>
              <div className="mt-5 mb-4 flex justify-center">
                <FileUpload name="imgUrl" placeholder="Click to upload Image" type="image" >
                  {
                    ({ value, placeholder }) =>
                    (!value ? <div className="rounded mt-3 w-[140px] h-[140px] bg-gray-back rounded-full flex justify-center items-center">
                      {<span className="text-center">{placeholder}</span>}
                    </div>
                      :
                      < Avatar size="2md" href={value} />
                    )
                  }
                </FileUpload>
              </div>
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
                Vendor Details
              </div>
              <div className="col-start-1">
                <Input
                  label="Name"
                  name="name"
                  placeholder="Enter name here"
                  register={register}
                  error={errors.name}
                />
              </div>
              <Input
                label="Email"
                name="email"
                register={register}
                error={errors.email}
                placeholder="Enter email here"
              />
              <Input
                label="Phone"
                name="phone"
                register={register}
                error={errors.phone}
                placeholder="Enter phone here"
              />
              <Input
                label="Website"
                name="website"
                register={register}
                error={errors.website}
                placeholder="Paste url"
              />
              <SelectBox
                label="Currency"
                name="currency"
                options={Currencies}
                control={control}
                placeholder={`${('Enter Currency')}`}
              />
              <SelectBox
                label="Organization"
                name="organization"
                options={organizations}
                control={control}
                placeholder={`${('Select an organization')}`}
              />
              <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                Vendor Registration
              </div>
              <div className="col-start-1">
                <Input
                  register={register}
                  name="reg_number"
                  label="Reg Number"
                  placeholder={`${('Enter registration number')}`}
                />
              </div>

              <FileUpload name="reg_document"
                label="Registration Documents"
                placeholder="Click to upload">
                {
                  ({ value, placeholder }) =>
                  (<div className="relative mt-2">
                    <div
                      className="w-full rounded-md border border-gray-border px-[1em] outline-none py-2 text-lg"
                    >
                      {!value ? <span className="text-gray-placeholder">{placeholder}</span> :
                        <span>{value.originalname}</span>}
                    </div>
                    {<div className="absolute  inset-y-0 right-3  py-3 text-blue-primary">< BsCloudArrowUp /></div>}
                  </div>)
                }
              </FileUpload>
              <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                Vendor Address
              </div>
              <div className="col-start-1">
                <Input
                  register={register}
                  name="billing_address"
                  righticon={<BsMap />}
                  label="Billing Address"
                  placeholder={`${('Enter Billing Address ')}`}

                />
              </div>
              <Input
                register={register}
                name="shipping_address"
                righticon={<BsMap />}
                label="Shipping Address"
                placeholder={`${('Enter shipping address')}`}
              />
              {vendor_extra && vendor_extra.length > 0 &&
                <>
                  <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
                    Extra Fields
                  </div>
                  <div className="col-start-1">
                    <ExtraItem extra={vendor_extra[0]} index={0} />
                  </div>
                  {vendor_extra.length > 1 &&
                    vendor_extra.slice(1).map((extra: ExtraWithServer, index: number) => (
                      <div key={extra.id}>
                        <ExtraItem extra={extra} index={index + 1}></ExtraItem>
                      </div>))}</>
              }
            </div>
            <div className="py-10 flex justify-center">
              <button type="submit" className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white mr-12 font-bold">
                Save
              </button>
              <button className="rounded-md text-[18px] border-2 border-red py-2.5 px-7 text-red  font-bold"
                onClick={() => close()}>
                Cancel
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal >
  )
  );
}
