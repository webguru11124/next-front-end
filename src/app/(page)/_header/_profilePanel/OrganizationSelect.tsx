"use client"

import { RadioGroup } from '@headlessui/react'
import { useState } from 'react'

import { LuSettings } from "react-icons/lu"
import o1 from "@/assets/img/o1.png";
import o2 from "@/assets/img/o2.png";
import o3 from "@/assets/img/o3.png";
import o4 from "@/assets/img/o4.png";
import o5 from "@/assets/img/o5.png";
import Image from 'next/image';
import { relative } from 'path';
import Link from 'next/link';
import { PanelCloseType } from './types';

const orgs = [
    { id: 1, name: 'Startup', image: o1 },
    { id: 2, name: 'Business', image: o2 },
    { id: 3, name: 'Enterprise', image: o3 },
    { id: 4, name: 'Enterprise', image: o4 },
    { id: 5, name: 'Enterprise', image: o5 },
]

export default function OrganizationSelect({ close }: { close: PanelCloseType }) {
    const [org, setOrg] = useState(orgs[0])
    return (
        <>
            <div className="mt-9 flex justify-between mb-2.5">
                <div className=" text-xl text-blue-main  font-bold" >
                    My Organization
                </div>
                <Link href={`/organizations/${org.id}`} className="text-blue-primary text-xl flex items-center" onClick={() => close()}>
                    <LuSettings className="mr-2" /> <span>Manage</span>
                </Link>
            </div>
            <RadioGroup value={org} onChange={setOrg}>
                <RadioGroup.Label className="sr-only">org</RadioGroup.Label>
                {orgs.map((org) => (
                    <RadioGroup.Option key={org.id} value={org}>
                        {({ active, checked }) => (
                            <div className='bg-gray-white rounded-sm mt-2 py-2 px-4 cursor-pointer'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <div className='w-[34px] h-[34px] relative mr-2'>
                                            <Image alt="org" src={org.image} fill className='rounded-full' />
                                        </div>
                                        <span> My Organizations</span>
                                    </div>
                                    <div className='flex items-center '>
                                        <span className={`w-5 h-5 border-3 border-light-border rounded-full inline-block ${active ? "bg-blue-primary" : "bg-none"}`}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </RadioGroup.Option>

                ))}
            </RadioGroup>
        </>)
}