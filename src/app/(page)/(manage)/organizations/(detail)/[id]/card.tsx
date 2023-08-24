"use client";

import Card from "@/components/Card";
import { ModalType, useModal } from "@/store/useModalStore";
import { FiEdit, FiTrash } from "react-icons/fi";
import useOrganizationQuery from "@/api/organization/useOrganizationQuery";
import Spinner from "@/components/Spinner";

import useOrganizationDelete from "@/api/organization/useOrganizationDelete";
import { fromAPIToOrgForm } from "@/types/organization";
import { useEffect, useMemo } from "react";
export default function OrganiaztionCard({ id }: { id: string }) {
  const open = useModal();
  const { data, isLoading, refetch } = useOrganizationQuery(id);

  useEffect(() => {
    if (id) refetch();
  }, [id])

  const organization = useMemo(() => fromAPIToOrgForm(data), [data]);
  const { mutate } = useOrganizationDelete();
  if (isLoading) return <Spinner />;
  return (
    <>
      <Card size="lg">
        <div className="w-full flex justify-between items-center mb-3 ">
          <div className="w-full  flex justify-between items-center">
            <div>
              <h2 className="text-blue-main  font-bold text-2xl">
                {organization?.name}
              </h2>
            </div>
            <div className="flex gap-x-7">
              <button
                className=" text-2xl p-2 text-blue-primary shadow-3xl rounded-md "
                onClick={() =>
                  open({ modalType: ModalType.OrganizationEditModal, id })
                }
              >
                <FiEdit />
              </button>
              <button
                className=" text-2xl p-2 text-red shadow-3xl rounded-md "
                onClick={() => {
                  if (window.confirm("Are you Sure?")) {
                    mutate(id);
                  }
                }}
              >
                <FiTrash />
              </button>
            </div>
          </div>
        </div>
        <span className="text-green-text bg-green-light px-2 py-1 rounded-sm ">
          Default
        </span>
        <div className="grid grid-cols-2 gap-y-3  mb-3 mt-7">
          <div className="text-gray-lighter text-xl">Organization ID:</div>
          <div className="text-xl">{id}</div>

          <div className="text-gray-lighter text-xl">Type</div>
          <div className="text-xl">{organization?.type?.label}</div>
          <div className="text-gray-lighter text-xl">Your Role</div>
          <div className="text-xl">{organization?.role?.label}</div>
          <div className="text-gray-lighter text-xl">Country</div>
          <div className="text-xl">{organization?.country?.label}</div>
          <div className="text-gray-lighter text-xl">State/Province</div>
          <div className="text-xl">{organization?.province?.label}</div>
          <div className="text-gray-lighter text-xl">Currency</div>
          <div className="text-xl">{organization?.currency?.label}</div>
          <div className="text-gray-lighter text-xl">Language</div>
          <div className="text-xl">{organization?.language?.label}</div>
          <div className="text-gray-lighter text-xl">Timezone</div>
          <div className="text-xl">{organization?.time_zone?.label}</div>
        </div>
      </Card>
    </>
  );
}
