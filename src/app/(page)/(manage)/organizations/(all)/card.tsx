"use client";

import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import { ModalType, useModal } from "@/store/useModalStore";
import { useRouter } from "next/navigation";
import { OrganizationCardType } from "./types";
import { formatDateAsShort } from "@/lib/util";
import { Roles } from "@/constants";
import { useSetCurrentOrgID, useSetCurrentOrganizationIndex } from "@/store/useOrganizationStore";

export default function OrganiaztionCard({
  organization,
}: {
  organization: OrganizationCardType;
}) {
  const router = useRouter();
  const options = { day: "numeric", month: "short", year: "numeric" };
  const { set: setOrg } = useSetCurrentOrgID();
  return (
    <>
      <Card size="md">
        <div className="flex justify-between items-center mb-5 ">
          <div className="flex items-center">
            <div className="ml-7 flex justify-between">
              <div>
                <h2 className="text-blue-main  font-bold text-2xl">
                  {organization?.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-2  mb-3 ">
          <div className="text-gray-lighter text-xl">Organization ID:</div>
          <div className="text-xl">{organization.id}</div>

          <div className="text-gray-lighter text-xl">Type</div>
          <div className="text-xl">{organization.type}</div>
          <div className="text-gray-lighter text-xl">Your Role</div>
          <div className="text-xl">{Roles[organization.role ?? 0].label}</div>
        </div>
        <div className="italic text-lg mb-7 text-gray-lighter">
          {`Organization created on ${formatDateAsShort(
            organization.created_at,
          )}`}
        </div>

        <div className="flex flex-row-reverse">
          <button
            className="rounded-md text-[18px] border-2 border-blue-primary py-2.5 px-7 text-blue-primary font-bold"
            onClick={() => {
              setOrg(organization.id)
              router.push(`/organizations/${organization.id}`)
            }}
          >
            Go to Ogranization
          </button>
        </div>
      </Card>
    </>
  );
}
