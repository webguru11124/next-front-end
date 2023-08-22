"use client";

import { Tables } from "@/constants/forms";
import { InviteUserForm } from "@/types/invite";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import { Control, useController, useFormContext } from "react-hook-form";

export default function RoleSelect() {
  const { control, setValue, getValues } = useFormContext<InviteUserForm>();
  return (
    <div className="mt-7">
      <div className="grid grid-cols-5 px-2 mb-3">
        <div className="col-span-3">Access</div>
        {["Read", "Write"].map((permission) => (
          <div className="text-center" key={permission}>
            {permission}
          </div>
        ))}
      </div>
      {Tables.slice(0, 3)
        .concat(Tables.slice(-1))
        .map((table, index) => (
          <div className="bg-gray-white rounded-sm mb-5 py-4 px-2 " key={table}>
            <RadioGroup
              defaultValue={getValues(`access.${Tables.indexOf(table)}.access`)}
              onChange={(value) => {
                setValue(`access.${Tables.indexOf(table)}.access`, value);
              }}
            >
              <div className="grid grid-cols-5  items-center">
                <div className="col-span-3">
                  <span> {table}</span>
                </div>
                <RadioGroup.Label className="sr-only">{table}</RadioGroup.Label>
                {[1, 2].map((permision) => (
                  <RadioGroup.Option
                    key={`${table}-${permision} `}
                    value={permision}
                  >
                    {({ active, checked }) => (
                      <div className="text-center cursor-pointer">
                        <div className=" flex items-center justify-center">
                          <span
                            className={`w-5 h-5 border-3 border-light-border rounded-full inline-block 
                                        ${checked
                                ? "bg-blue-primary"
                                : "bg-none"
                              }`}
                          ></span>
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        )
        )}
    </div>
  );
}
