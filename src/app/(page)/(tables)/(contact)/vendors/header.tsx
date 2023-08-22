"use client";
import { ModalType, useModal } from "@/store/useModalStore";
import { BsPlus } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
export default function Header() {
  const openModal = useModal();
  return (
    <div className="flex justify-between">
      <h1 className="text-blue-main text-4xl">Vendors</h1>
      <div>
        <div className=" flex gap-x-6">
          <button className="bg-blue-primary p-3 rounded-sm shadow-md">
            <BsPlus
              size={22}
              className="bg-white text-blue-primary font-bold"
            ></BsPlus>
          </button>
          <button
            className="bg-white p-3 rounded-sm shadow-md"
            onClick={() => openModal({ modalType: ModalType.VendorEditModal })}
          >
            <SlOptions size={22} className="text-black font-bold"></SlOptions>
          </button>
        </div>
      </div>
    </div>
  );
}
