"use client";
import Avatar from "@/components/Avatar";
import vendorDetailModal from "./vendorDetailModal";
import { useEffect, useState } from "react";
import { ModalType, useModal } from "@/store/useModalStore";
import { Vendor } from "./types";
import VendorDetailModal from "./vendorDetailModal";
import useExtraFieldByTable from "@/api/extra/useExtraFieldByTable";
import { Extra } from "@/types/extra";
import useVendorsQuery from "@/api/vendor/useVendorsQuery";
import { VendorFormWithServer, VendorFromServer } from "@/types/vendor";
import Spinner from "@/components/Spinner";
import { CheckMark } from "@/assets/icons";



export default function VendorTable() {
  const open = useModal();
  const { data: vendor_extra, isLoading } = useExtraFieldByTable("Vendor");
  const { data: vendors, isLoading: dataLoading } = useVendorsQuery();
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({ total: false });
  useEffect(() => {
    if (vendors) {
      const newSelected: { [key: string]: boolean } = { total: false };
      vendors.forEach((vendor: Vendor) => {
        newSelected[vendor.name] = false;
      })
      setSelected({ ...newSelected })
    }
  }, [vendors])
  if (isLoading || dataLoading) {
    return <Spinner />
  }
  return (
    <>
      <table className=" border-collapse border border-light-border w-full">
        <thead>
          <tr className="text-light-color text-md bg-light-bg">
            <th className=" border border-light-border  py-3 px-3 ">
              <div className="mx-auto w-6 h-6 border border-gray-light rounded-sm bg-white cursor-pointer flex justify-center items-center"
                onClick={() => {
                  const total = !selected["total"];
                  const newState: { [key: string]: boolean } = {};
                  if (total) {
                    for (const key in selected) {
                      newState[key] = true;
                    }
                  }
                  else {
                    for (const key in selected) {
                      newState[key] = false;
                    }
                  }
                  setSelected({ ...newState })
                }}>{selected["total"] && <CheckMark />}</div>
            </th>
            <th className=" border border-light-border  py-3">Image</th>
            <th className=" border border-light-border  py-3">Name</th>
            <th className=" border border-light-border  py-3">Email</th>
            <th className=" border border-light-border  py-3">Phone</th>
            {vendor_extra && vendor_extra?.filter((extra: Extra) => extra.show_in_table).map((extra: Extra) => (
              <th className=" border border-light-border py-3" key={extra.id}>{extra.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {vendors && vendors.map((vendor: VendorFromServer) => (
            <tr
              className="py-3  cursor-pointer"
              key={vendor.id}
            >
              <td className="border border-lighter-border py-3">
                <div className="mx-auto w-6 h-6 border border-gray-light rounded-sm bg-white flex justify-center items-center"
                  onClick={() => {
                    setSelected({ ...selected, [vendor.name]: !selected[vendor.name] })
                  }}
                >
                  {selected[vendor.name] && <CheckMark />}
                </div>
              </td>
              <td className="border border-lighter-border py-3" onClick={() => {
                open({
                  modalType: ModalType.VendorDetail,
                  id: vendor.id,
                });
              }}>
                <div className="flex justify-center">
                  <Avatar size="sm"></Avatar>
                </div>
              </td>
              <td className="border border-lighter-border py-3" onClick={() => {
                open({
                  modalType: ModalType.VendorDetail,
                  id: vendor.id,
                });
              }}>
                {vendor.name}
              </td>
              <td className="border border-lighter-border py-3" onClick={() => {
                open({
                  modalType: ModalType.VendorDetail,
                  id: vendor.id,
                });
              }}>
                {vendor.email}
              </td>
              <td className="border border-lighter-border py-3" onClick={() => {
                open({
                  modalType: ModalType.VendorDetail,
                  id: vendor.id,
                });
              }}>
                {vendor.phone}
              </td>
              {
                vendor.atr && vendor.atr.filter(drop => drop.shown).map((drop, index) => (
                  < td className="border border-lighter-border py-3" onClick={() => {
                    open({
                      modalType: ModalType.VendorDetail,
                      id: vendor.id,
                    });
                  }} key={index}
                  >
                    {drop.drop_name ?? drop.value}
                  </td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table >
    </>
  );
}
