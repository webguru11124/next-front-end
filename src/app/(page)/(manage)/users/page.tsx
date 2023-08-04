"use client"

import Avatar from "@/components/Avatar"
import { ModalType, useModal } from "@/store/useModalStore";
import UsersTable from "./table";

export default function ProfilePage() {
    const openModal = useModal();
    return <div className="rounded-md bg-white shadow-lg  w-[920px] p-7">
        <UsersTable></UsersTable>
    </div >
}