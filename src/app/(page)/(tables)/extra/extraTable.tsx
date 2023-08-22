"use client";
import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";
import { ModalType, useModal } from "@/store/useModalStore";
import {
  Extra,
  ExtraForm,
  ExtraFormWithServer,
  ExtraWithServer,
  formExtraToForm,
} from "@/types/extra";
import useExtraFieldQueryWithOrganization from "@/api/extra/useExtraFieldQueryWithOrganization";
import Spinner from "@/components/Spinner";
import { CheckMark } from "@/assets/icons";

const extras: Array<Extra> = [];

export default function ExtraTable() {
  const open = useModal();
  const { data: extra_fields, isLoading } =
    useExtraFieldQueryWithOrganization();
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({ total: false });

  useEffect(() => {
    if (extra_fields) {
      const newSelected: { [key: string]: boolean } = { total: false };
      extra_fields.forEach((extra: Extra) => {
        newSelected[extra.name] = false;
      })
      setSelected({ ...newSelected })
    }
  }, [extra_fields])

  if (isLoading) return <Spinner />;
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
                  console.log(newState)
                }}>{selected["total"] && <CheckMark />}</div>
            </th>
            <th className=" border border-light-border  py-3">Name</th>
            <th className=" border border-light-border  py-3">Table</th>
            <th className=" border border-light-border  py-3">Show in Table</th>
            <th className=" border border-light-border  py-3">Required</th>
            <th className=" border border-light-border  py-3">Drop Down</th>
            <th className=" border border-light-border  py-3">
              Drop down values
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {extra_fields &&
            extra_fields
              .map((extra: ExtraWithServer) => ({
                id: extra.id,
                extra: formExtraToForm(extra),
                dropdowns: extra.dropdowns.filter((e) => e),
              }))
              .map(
                ({
                  extra,
                  id,
                  dropdowns,
                }: {
                  extra: ExtraForm;
                  id: string;
                  dropdowns: Array<string>;
                }) => (
                  <tr className="py-3  cursor-pointer" key={id}>
                    <td className="border border-lighter-border py-3">
                      <div className="mx-auto w-6 h-6 border border-gray-light rounded-sm bg-white flex justify-center items-center"
                        onClick={() => {
                          setSelected({ ...selected, [extra.name]: !selected[extra.name] })
                        }}
                      >
                        {selected[extra.name] && <CheckMark />}
                      </div>
                    </td>
                    <td
                      className="border border-lighter-border py-3"
                      onClick={() => {
                        open({ modalType: ModalType.ExtraEditModel, id });
                      }}
                    >
                      {extra.name}
                    </td>
                    <td
                      className="border border-lighter-border py-3"
                      onClick={() => {
                        open({ modalType: ModalType.ExtraEditModel, id });
                      }}
                    >
                      {extra.table}
                    </td>
                    <td
                      className="border border-lighter-border py-3"
                      onClick={() => {
                        open({ modalType: ModalType.ExtraEditModel, id });
                      }}
                    >
                      {extra.show_in_table}
                    </td>
                    <td
                      className="border border-lighter-border py-3"
                      onClick={() => {
                        open({ modalType: ModalType.ExtraEditModel, id });
                      }}
                    >
                      {extra.required}
                    </td>
                    <td
                      className="border border-lighter-border py-3"
                      onClick={() => {
                        open({ modalType: ModalType.ExtraEditModel, id });
                      }}
                    >
                      {extra.drop_down}
                    </td>
                    <td
                      className={`border border-lighter-border py-3 ${extra.drop_down === "false" ? "cursor-default" : ""
                        }`}
                      onClick={() => {
                        extra.drop_down === "true" &&
                          open({ modalType: ModalType.DropdownEditModal, id });
                      }}
                    >
                      {dropdowns.length > 0
                        ? JSON.stringify(dropdowns)
                        : "No data"}
                    </td>
                  </tr>
                ),
              )}
        </tbody>
      </table >
    </>
  );
}
