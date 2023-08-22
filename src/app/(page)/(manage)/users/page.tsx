"use client";

import UsersTable from "./table";
import InviteUserModal from "./_inviteUser";

export default function ProfilePage() {
  return (
    <div className="rounded-md bg-white shadow-lg  w-[920px] p-7">
      <UsersTable></UsersTable>
      <InviteUserModal />
    </div>
  );
}
