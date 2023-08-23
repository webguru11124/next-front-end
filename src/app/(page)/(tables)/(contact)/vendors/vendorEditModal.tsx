"use client";

import useOrganizationsByUserQuery from "@/api/organization/useOrganizationsByUserQuery";
import useCurrentUser from "@/api/user/useCurrentUser";
import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SelectBox from "@/components/SelectBox";
import { Currencies } from "@/constants/forms";
import {
  ModalType,
  useClose,
  useModalType,
  useOpen,
  useSelected,
} from "@/store/useModalStore";
import { Organization } from "@/types/organization";
import { useForm } from "react-hook-form";
import { BsCloudArrowUp } from "react-icons/bs";
import { GrClose } from "react-icons/gr";



export default function VendorEditModal() {
  const close = useClose();
  const modal = useModalType();
  const id = useSelected();
  const { id: user_id } = useCurrentUser();
  const { data } = useOrganizationsByUserQuery(id);
  const Organizations = data?.map((org: Organization) => org.name) ?? [];
  const { register, control, formState: { errors } } = useForm();
  if (modal !== ModalType.VendorEditModal)
    return <div></div>
  return ((
    <Modal width="xl" className="h-[714px] py-4">
      <div className="flex flex-col h-full">
        <div className="flex relative justify-center">
          <div className="flex flex-col  justify-center">
            <span className="font-bold  text-blue-main text-2xl">
              {`${id ? "Edit" : "ADD New"} Vendor`}
            </span>
            <div className="mt-5 mb-4 flex justify-center">
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
        <form>
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
              name="currency"
              options={Organizations}
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
            <Input
              register={register}
              name="reg_document"
              righticon={<BsCloudArrowUp />}
              label="Reg Documents"
              placeholder={`${('Click to upload')}`}
            />
            <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
              Vendor Address
            </div>
            <div className="col-start-1">
              <Input
                register={register}
                name="billing_address"
                label="Billing Address"
                placeholder={`${('Enter registration number')}`}
              />
            </div>
            <Input
              register={register}
              name="shipping_address"
              label="Shipping Address"
              placeholder={`${('Enter shipping address')}`}
            />
            <div className="col-start-1 bg-gray-max-light text-xl py-2 mt-5 text-blue-main ml-[-48px] px-12">
              Extra Fields
            </div>
            <div className="col-start-1">
              <Input
                register={register}
                name="billing_address"
                label="Billing Address"
                placeholder={`${('Enter registration number')}`}
              />
            </div>
            {/* <SelectBox
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
            </div> */}
          </div>
          <div className="py-10 flex justify-center">
            <button className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white mr-12 font-bold">
              Save
            </button>
            <button className="rounded-md text-[18px] border-2 border-red py-2.5 px-7 text-red  font-bold">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
  );
}
