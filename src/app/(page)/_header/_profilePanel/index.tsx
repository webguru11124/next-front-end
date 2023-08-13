"use client"

import { relative } from 'path';
import OrganizationSelect from "./OrganizationSelect";
import { PanelCloseType } from './types';
import ProfilePreview from './ProfilePreview';


export default function ProfilePanel({ close }: { close: PanelCloseType }) {

    return <div className="h-[714px] w-[400px] py-4 rounded-md  bg-white shadow-md overflow-y-auto ">
        <div className="flex flex-col h-full px-8 py-10">

            <ProfilePreview close={close}></ProfilePreview>
            <OrganizationSelect close={close} />

        </div>
    </div>
}