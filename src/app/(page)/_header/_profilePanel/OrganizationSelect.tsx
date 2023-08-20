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
import Link from 'next/link';
import { PanelCloseType } from './types';
import useOrganizationsByUserQuery from '@/api/organization/useOrganizationsByUserQuery';
import { useSession } from 'next-auth/react';
import { Organization } from '@/types/organization';
import Spinner from '@/components/Spinner';

// const data = [
//     { id: 1, name: 'Startup', image: o1 },
//     { id: 2, name: 'Business', image: o2 },
//     { id: 3, name: 'Enterprise', image: o3 },
//     { id: 4, name: 'Enterprise', image: o4 },
//     { id: 5, name: 'Enterprise', image: o5 },
// ]

export default function OrganizationSelect({ close, onChange, value, organizations }: {
    close: PanelCloseType,
    organizations: Array<Organization>;
    value: number;
    onChange: (id: number) => void;
}) {
    return (
        <>
            <div className="mt-9 flex justify-between mb-2.5">
                <div className=" text-xl text-blue-main  font-bold" >
                    My Organization
                </div>
                {organizations && organizations[value]?.id &&
                    <Link href={`/organizations/${organizations[value]?.id}`} className="text-blue-primary text-xl flex items-center" onClick={() => close()}>
                        <LuSettings className="mr-2" /> <span>Manage</span>
                    </Link>
                }
            </div>

            <RadioGroup value={value} onChange={onChange}>
                <RadioGroup.Label className="sr-only">org</RadioGroup.Label>
                {organizations && organizations.map((org: Organization, index: number) => (
                    <RadioGroup.Option key={org.id} value={index}>
                        {({ active, checked }) => (
                            <div className='bg-gray-white rounded-sm mt-2 py-2 px-4 cursor-pointer'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <div className='w-[34px] h-[34px] relative mr-2'>
                                            <Image alt="org" src={o1} fill className='rounded-full' />
                                        </div>
                                        <span> {org.name}</span>
                                    </div>
                                    <div className='flex items-center '>
                                        <span className={`w-5 h-5 border-3 border-light-border rounded-full inline-block ${checked ? "bg-blue-primary" : "bg-none"}`}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </RadioGroup.Option>

                ))}
            </RadioGroup>
            <div className='mt-9 w-full flex justify-center'>
                <Link href="/organizations/new"
                    className="rounded-md text-[18px] bg-blue-primary py-2.5 px-7 text-white font-bold "
                    onClick={() => close()}
                >
                    Add Organization
                </Link>
            </div>
        </>)
}