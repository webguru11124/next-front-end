"use client"
import Avatar from "@/components/Avatar";
import { useState } from "react";
import { ModalType, useModal } from "@/store/useModalStore";
import { Extra, ExtraForm, ExtraFormWithServer, formExtraToForm } from "@/types/extra";
import useExtraFieldQueryWithOrganization from "@/api/extra/useExtraFieldQueryWithOrganization";
import Spinner from "@/components/Spinner";
import { Tables } from "@/constants/tables";

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
                {extra_fields && extra_fields.map((extra: Extra) => ({ id: extra.id, extra: formExtraToForm(extra) })).
                    map(({ extra, id }: { extra: ExtraForm, id: string }) => (<tr className="py-3  cursor-pointer" key={id}
                        onClick={() => {
                            open({ modalType: ModalType.ExtraEditModel, id })
                        }}>
                        <td className="border border-lighter-border py-3">{extra.name}</td>
                        <td className="border border-lighter-border py-3">{extra.table}</td>
                        <td className="border border-lighter-border py-3">{extra.show_in_table}</td>
                        <td className="border border-lighter-border py-3">{extra.required}</td>
                        <td className="border border-lighter-border py-3">{extra.drop_down}</td>
                    </tr>))
                }

            </tbody>
        </table>
        {/* <extraDetailModal extra={currentextra} /> */}
    </>
}