"use client";

import Avatar from "@/components/Avatar";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import SelectBox from "@/components/SelectBox";
import {
  ModalType,
  useClose,
  useModal,
  useModalType,
  useOpen,
  useSelected,
} from "@/store/useModalStore";
import { GrClose } from "react-icons/gr";
import { FiEdit, FiTrash } from "react-icons/fi";
import useVendorQuery from "@/api/vendor/useVendorQuery";
import Spinner from "@/components/Spinner";
import { useCurrentOrganization } from "@/store/useOrganizationStore";
import { VendorAtr } from "@/types/vendor";

export default function VendorDetailModal() {
  const close = useClose();
  const id = useSelected();
  const openModal = useModal();
  const { data: organization } = useCurrentOrganization();
  const modal = useModalType();
  const { data: vendor, isLoading } = useVendorQuery(id);

  if (modal !== ModalType.VendorDetail)
    return <></>
  if (isLoading) return <Spinner />
  return ((
    <Modal width="lg" className="h-[751px] py-14 px-20">
      <div className="flex flex-col h-full ">
        <div className="flex relative ">
          <div className="flex   mr-12 items-center mt-5 mb-4">
            <div className="">
              <Avatar size="2md" />
            </div>
            <div className="flex flex-col ">
              <div className="text-2xl text-blue-main font-bold">
                {vendor?.name}
              </div>
              <div className="flex  mt-8 justify-between">
                <button
                  className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white font-bold"
                  onClick={() => {
                    close();
                    openModal({ modalType: ModalType.VendorEditModal, id: vendor?.id })
                  }}
                >
                  <FiEdit className="inline-block" /> Edit vendor
                </button>
                <div className="flex gap-x-7 ml-6">
                  <button className=" text-2xl p-2 text-red shadow-3xl rounded-md ">
                    <FiTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            className="h-10 w-10 flex justify-center items-center rounded bg-white text-grayscale-secondary absolute right-0"
            onClick={close}
          >
            <GrClose />
          </button>
        </div>
        <div className="my-16 flex-grow-0 flex  flex-col mx-auto w-2/3">
          <div className=" flex-col justify-center  ">
            <div className="flex justify-between  mb-2">
              <div className="text-gray-lighter text-xl">Email:</div>
              <div className="text-xl">{vendor?.email}</div>
            </div>
            <div className="flex justify-between  mb-2">
              <div className="text-gray-lighter text-xl">Phone:</div>
              <div className="text-xl">{vendor?.phone}</div>
            </div>
            <div className="flex justify-between  mb-2">
              <div className="text-gray-lighter text-xl">Website:</div>
              <div className="text-xl">{vendor?.website}</div>
            </div>
            <div className="flex justify-between  mb-2">
              <div className="text-gray-lighter text-xl">Organization:</div>
              <div className="text-xl">{organization.name}</div>
            </div>
          </div>
          <div className="my-8">
            <div className="text-xl text-blue-main font-bold">
              Vendor Billing Address
            </div>
            <div className="rounded-md bg-gray-bg p-4 mt-4">
              {"175 Varick St #610, New York, NY 10014, USA"}
            </div>
            <button className="text-blue-primary mt-3">See on Map</button>
            <div className="mt-8">
              <div className="text-xl text-blue-main font-bold">
                Vendor Shipping Address
              </div>
              <div className="rounded-md bg-gray-bg p-4 mt-4">
                {"175 Varick St #610, New York, NY 10014, USA"}
              </div>
              <button className="text-blue-primary mt-3">See on Map</button>
            </div>
          </div>
          <div className=" flex-col justify-center  mb-20">
            {vendor?.atr && vendor?.atr.map((extra: VendorAtr) => (<div className="flex justify-between  mb-2" key={extra.name}>
              <div className="text-gray-lighter text-xl">{extra.name}</div>
              <div className="text-xl">{extra.drop_name ?? extra.value}</div>
            </div>))
            }


          </div>
        </div>

      </div>
    </Modal>
  )
  );
}
