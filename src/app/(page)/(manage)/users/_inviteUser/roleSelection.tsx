"use client"

import { Tables } from '@/constants/tables';
import { RadioGroup } from '@headlessui/react'
import { useState } from 'react'
type PermissionValue = "Read" | "Write";
const permissions: PermissionValue[] = ["Read", "Write"]; // Your permission values

type TablePermissions = {
    [table in typeof Tables[number]]: PermissionValue;
};

export default function RoleSelect() {
    const [values, setValues] = useState<TablePermissions>(Tables.reduce((state, table) => ({ ...state, [table]: "Read" }), {}));
    return (
        <div className='mt-7'>
            <div className='grid grid-cols-5 px-2 mb-3'>
                <div className='col-span-3'>Access</div>
                {permissions.map(permission => <div className='text-center' key={permission} >{permission}</div>)}

            </div>
            {Tables.map((table) => (
                <div className='bg-gray-white rounded-sm mb-5 py-4 px-2 ' key={table}>
                    <RadioGroup value={values[table]} onChange={(value) => setValues({ ...values, [table]: value })}>

                        <div className='grid grid-cols-5  items-center'>
                            <div className='col-span-3'>
                                <span> {table}</span>
                            </div>
                            <RadioGroup.Label className="sr-only">{table}</RadioGroup.Label>
                            {permissions.map((permision) =>
                            (< RadioGroup.Option key={`${table}-${permision} `} value={permision}>
                                {({ active, checked }) => (
                                    <div className='text-center cursor-pointer'>
                                        <div className=' flex items-center justify-center'>
                                            <span className={`w-5 h-5 border-3 border-light-border rounded-full inline-block 
                                        ${active ? "bg-blue-primary" : "bg-none"}`}></span>
                                        </div>
                                    </div>

                                )}
                            </RadioGroup.Option>

                            ))}

                        </div>
                    </RadioGroup>
                </div>
            )
            )
            }
        </div >)
}