"use client";

import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SelectBox from "@/components/SelectBox";
import {
  ModalType,
  useClose,
  useModalType,
  useOpen,
  useSelected,
} from "@/store/useModalStore";
import { GrClose } from "react-icons/gr";
import RoleSelect from "./roleSelection";
import { Roles } from "@/constants/forms";
import { FormProvider, useForm } from "react-hook-form";
import {
  InviteUserForm,
  InviteUserSchema,
  convFromAPIToForm,
  convertInviteUserToServer,
  initalInviteUser,
} from "@/types/invite";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";
import useOrganizationInvite from "@/api/organization_access/useOrganizationInvite";
import Spinner from "@/components/Spinner";
import useOrganizationsAccessQuery from "@/api/organization_access/useOrganizationsAccessQuery";
import { useEffect } from "react";
import useOrganizationUpdate from "@/api/organization/useOrganizationUpdate";
import useOrganizationAccessUpdate from "@/api/organization_access/useOrganizationAccessUpdate";

export default function InviteUserModal() {
  const close = useClose();
  const modal = useModalType();
  const id = useSelected();
  const methods = useForm<InviteUserForm>({
    defaultValues: initalInviteUser(),
    resolver: zodResolver(InviteUserSchema),
    mode: "onChange",
  });
  const { mutate: invite, isLoading: mutateLoading } = useOrganizationInvite();
  const { mutate: update, isLoading: updateLoading } =
    useOrganizationAccessUpdate();
  const { data, isLoading } = useOrganizationsAccessQuery(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = methods;

  useEffect(() => {
    if (id && data) {
      reset(convFromAPIToForm(data));
    }
    if (!id) {
      reset(initalInviteUser());
    }
  }, [data, id, reset]);

  const onSubmit = (data: InviteUserForm) => {
    const sent = convertInviteUserToServer(data);
    if (!id) invite(sent);
    else update({ ...sent, id });
  };
  if (modal !== ModalType.InviteUser) return <div></div>;
  if (id && isLoading) return <Spinner />;
  return (
    <Modal width="md" className="h-[714px] px-10 py-4 ">
      <div className="flex flex-col h-full ">
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <Input
                label="Name"
                name="name"
                placeholder="Enter first Name"
                register={register}
                error={errors.name}
              />
            </div>
            <div className="mt-5">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter last Name"
                register={register}
                error={errors.email}
              />
            </div>
            <div className="mt-5">
              <SelectBox
                name="role"
                control={control}
                label="Role"
                options={Roles}
                placeholder={`${"Select your role"}`}
              />
            </div>
            <RoleSelect />
            <div className="py-10 flex justify-center">
              {mutateLoading ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className="btn rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white mr-12 font-bold"
                >{`${!id ? "Create" : "Save"}`}</button>
              )}
              <button
                className="rounded-md text-[18px] border-2 border-red py-2.5 px-7 text-red  font-bold"
                onClick={close}
              >
                Cancel
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
}
