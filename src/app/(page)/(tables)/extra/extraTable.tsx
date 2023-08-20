"use client"
import Avatar from "@/components/Avatar";
import { useState } from "react";
import { ModalType, useModal } from "@/store/useModalStore";
import { Extra } from "@/types/extra";
import useExtraFieldQueryWithOrganization from "@/api/extra/useExtraFieldQueryWithOrganization";
import Spinner from "@/components/Spinner";

const extras: Array<Extra> = []

export default function ExtraTable() {
    const open = useModal();
    const { data: extra_fields, isLoading, } = useExtraFieldQueryWithOrganization();
    if (isLoading) return <Spinner />
    return <>
        <table className=" border-collapse border border-light-border w-full">
            <thead>
                <tr className="text-light-color text-md bg-light-bg">
                    <th className=" border border-light-border  py-3">Name</th>
                    <th className=" border border-light-border  py-3">Table</th>
                    <th className=" border border-light-border  py-3">Show in Table</th>
                    <th className=" border border-light-border  py-3">Required</th>
                    <th className=" border border-light-border  py-3">Drop Down</th>
                    <th className=" border border-light-border  py-3">Drop down values</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {extras.map((extra) => (<tr className="py-3  cursor-pointer" key={extra.id}
                    onClick={() => {
                        open({ modalType: ModalType.ExtraEditModel, id: extra.id })
                    }}>
                    <td className="border border-lighter-border py-3">
                        <div className="flex justify-center">
                            <Avatar size="sm"></Avatar>
                        </div>
                    </td>
                    <td className="border border-lighter-border py-3">{extra.name}</td>
                    <td className="border border-lighter-border py-3">{extra.email}</td>
                    <td className="border border-lighter-border py-3">{extra.phone}</td>
                    <td className="border border-lighter-border py-3">{extra.gender}</td>
                    <td className="border border-lighter-border py-3">{extra.hobby}</td>
                </tr>))
                }

            </tbody>
        </table>
        {/* <extraDetailModal extra={currentextra} /> */}
    </>
}