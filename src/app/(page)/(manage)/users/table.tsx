import Avatar from "@/components/Avatar";
import UserDetailModal from "./userDetailModal";
import { useState } from "react";
import { ModalType, useModal } from "@/store/useModalStore";
import { User } from "@/types/user";

const users: Array<User> = [{
    f_name: "abc",
    img_url: "avatar.png",
    email: "abc@abc.com",
    // role: "Admin",
    id: "1",
    // orga
}]

export default function UsersTable() {
    const open = useModal();
    const [currentUser, setCurrentUser] = useState<User>(users[0]);
    return <>
        <table className=" border-collapse border border-light-border w-full">
            <thead>
                <tr className="text-light-color text-md bg-light-bg">
                    <th className=" border border-light-border  py-3">Image</th>
                    <th className=" border border-light-border  py-3">Name</th>
                    <th className=" border border-light-border  py-3">Email</th>
                    <th className=" border border-light-border  py-3">Organiaztion</th>
                    <th className=" border border-light-border  py-3">Role</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {users.map((user) => (<tr className="py-3  cursor-pointer" key={user.id}
                    onClick={() => {
                        setCurrentUser(user);
                        open({ modalType: ModalType.UserDetail })
                    }}>
                    <td className="border border-lighter-border py-3"><div className="flex justify-center"><Avatar size="sm"></Avatar></div></td>
                    <td className="border border-lighter-border py-3">{user.f_name}</td>
                    <td className="border border-lighter-border py-3">{user.email}</td>
                    <td className="border border-lighter-border py-3">ABc</td>
                    <td className="border border-lighter-border py-3">Admin</td>
                </tr>))
                }

            </tbody>
        </table>
        <UserDetailModal user={currentUser} />
    </>
}