"use client"

import { relative } from 'path';
import OrganizationSelect from "./OrganizationSelect";
import { LuSettings } from "react-icons/lu"
import Link from 'next/link';


import o1 from "@/assets/img/o1.png";
import o2 from "@/assets/img/o2.png";
import o3 from "@/assets/img/o3.png";
import o4 from "@/assets/img/o4.png";
import o5 from "@/assets/img/o5.png";
import { PanelCloseType } from './types';
import ProfilePreview from './ProfilePreview';

const orgs = [
    { id: 1, name: 'Startup', image: o1 },
    { id: 2, name: 'Business', image: o2 },
    { id: 3, name: 'Enterprise', image: o3 },
    { id: 4, name: 'Enterprise', image: o4 },
    { id: 5, name: 'Enterprise', image: o5 },
]


export default function ProfilePanel({ close }: { close: PanelCloseType }) {

    return <div className="h-[714px] w-[400px] py-4 rounded-md  bg-white shadow-md overflow-y-auto">
        <div className="flex flex-col h-full px-8 py-10">

            <ProfilePreview close={close}></ProfilePreview>
            <OrganizationSelect close={close} />
        </div>
    </div>
}