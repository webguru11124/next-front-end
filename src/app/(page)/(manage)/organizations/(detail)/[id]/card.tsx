"use client";

import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import { ModalType, useModal } from "@/store/useModalStore";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useRouter } from "next/navigation";
import useOrganizationQuery from "@/api/organization/useOrganizationQuery";
import Spinner from "@/components/Spinner";
import {
  Countries,
  Currencies,
  Languages,
  OrgTypes,
  Province,
  Roles,
  Timezones,
} from "@/constants/forms";
import useOrganizationDelete from "@/api/organization/useOrganizationDelete";
export default function OrganiaztionCard({ id }: { id: string }) {
  const router = useRouter();
  const open = useModal();
  const { data, isLoading } = useOrganizationQuery(id);
  const { mutate } = useOrganizationDelete();
  if (isLoading) return <Spinner />;
  return (
    <>
      <Card size="lg">
        <div className="w-full flex justify-between items-center mb-3 ">
          <div className="w-full  flex justify-between items-center">
            <div>
              <h2 className="text-blue-main  font-bold text-2xl">
                {data?.name}
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
          <div className="text-xl">{OrgTypes[data?.type]}</div>
          <div className="text-gray-lighter text-xl">Your Role</div>
          <div className="text-xl">{Roles[data?.role]}</div>
          <div className="text-gray-lighter text-xl">Country</div>
          <div className="text-xl">{Countries[data?.country]}</div>
          <div className="text-gray-lighter text-xl">State/Province</div>
          <div className="text-xl">{data?.province}</div>
          <div className="text-gray-lighter text-xl">Currency</div>
          <div className="text-xl">{Currencies[data?.currency]}</div>
          <div className="text-gray-lighter text-xl">Language</div>
          <div className="text-xl">{Languages[data?.language]}</div>
          <div className="text-gray-lighter text-xl">Timezone</div>
          <div className="text-xl">{data?.time_zone}</div>
        </div>
      </Card>
    </>
  );
}
