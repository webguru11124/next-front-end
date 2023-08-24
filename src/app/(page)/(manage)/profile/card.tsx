"use client";

import useGetProfile from "@/api/user/useGetProfile";
import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";
import { ModalType, useModal } from "@/store/useModalStore";
import { User, getUserFromSource } from "@/types/user";
import { useMemo } from "react";

export default function ProfileCard() {
  const { data, error, isError, isLoading, id } = useGetProfile();
  const openModal = useModal();

  const user: User | null = useMemo(() => getUserFromSource(data), [data]);
  if (!user || isLoading) return <Spinner />
  return (
    <>
      <div className="rounded-md bg-white shadow-lg  w-[920px] p-7">
        <div className="flex justify-between items-center mb-5 ">
          <div className="flex items-center">
            <Avatar size="md" />
            <div className="ml-7 flex justify-between">
              <div>
                <h2 className="text-blue-main  font-bold text-2xl">
                  {user.f_name}
                </h2>
                <h4 className="text-gray-lighter">{user.email}</h4>
              </div>
            </div>
          </div>
          <div>
            <button
              className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white font-bold"
              onClick={() =>
                openModal({ modalType: ModalType.PorfileEditModal, id })
              }
            >
              Edit
            </button>
          </div>
        </div>
        <div className="flex space-x-36 mb-5">
          <div>
            <div className="text-gray-lighter text-xl">Full Name:</div>
            <div className="mt-2 text-xl">
              {`${user.f_name} ${user.l_name}`}
            </div>
          </div>

          <div>
            <div className="text-gray-lighter text-xl">Gender:</div>
            <div className="mt-2 text-xl">{user.gender?.label}</div>
          </div>
          <div>
            <div className="text-gray-lighter text-xl">Language:</div>
            <div className="mt-2 text-xl">{user.language?.label}</div>
          </div>
        </div>
        <div className="flex space-x-36 mb-5">
          <div>
            <div className="text-gray-lighter text-xl">Timezone:</div>
            <div className="mt-2 text-xl">{user.timezone?.label}</div>
          </div>
        </div>
        <div className="flex space-x-36 mb-5">
          <div>
            <div className="text-gray-lighter text-xl">Email:</div>
            <div className="mt-2 text-xl">{user.email}</div>
          </div>

          <div>
            <div className="text-gray-lighter text-xl">Phone:</div>
            <div className="mt-2 text-xl">{user.number}</div>
          </div>
        </div>
      </div>
    </>
  );
}
