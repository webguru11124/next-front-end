"use client"
import Avatar from "@/components/Avatar";
import vendorDetailModal from "./vendorDetailModal";
import { useState } from "react";
import { ModalType, useModal } from "@/store/useModalStore";
import { Vendor } from "./types";
import VendorDetailModal from "./vendorDetailModal";

const vendors: Array<Vendor> = [{
    name: "abc",
    avatar: "avatar.png",
    email: "abc@abc.com",
    phone: "12-123",
    gender: "man",
    hobby: "sport",
    id: "1",
}]

export default function VendorTable() {
    const open = useModal();
    const [currentVendor, setCurrentVendor] = useState<Vendor>(vendors[0]);
    return <>
        <table className=" border-collapse border border-light-border w-full">
            <thead>
                <tr className="text-light-color text-md bg-light-bg">
                    <th className=" border border-light-border  py-3">Image</th>
                    <th className=" border border-light-border  py-3">Name</th>
                    <th className=" border border-light-border  py-3">Email</th>
                    <th className=" border border-light-border  py-3">Phone</th>
                    <th className=" border border-light-border  py-3">Gender</th>
                    <th className=" border border-light-border  py-3">Hobby</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {vendors.map((vendor) => (<tr className="py-3  cursor-pointer" key={vendor.id}
                    onClick={() => {
                        setCurrentVendor(vendor);
                        open({ modalType: ModalType.VendorDetail })
                    }}>
                    <td className="border border-lighter-border py-3"><div className="flex justify-center"><Avatar size="sm"></Avatar></div></td>
                    <td className="border border-lighter-border py-3">{vendor.name}</td>
                    <td className="border border-lighter-border py-3">{vendor.email}</td>
                    <td className="border border-lighter-border py-3">{vendor.phone}</td>
                    <td className="border border-lighter-border py-3">{vendor.gender}</td>
                    <td className="border border-lighter-border py-3">{vendor.hobby}</td>
                </tr>))
                }

            </tbody>
        </table>
        <VendorDetailModal vendor={currentVendor} />
    </>
}