
import Header from "./header"
import InviteUserModal from "./_inviteUser"
import UserDetailModal from "./userDetailModal"
export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section className="">
        <Header></Header>
        <div className="flex justify-center mt-20">
            {children}
        </div>
    </section>
}