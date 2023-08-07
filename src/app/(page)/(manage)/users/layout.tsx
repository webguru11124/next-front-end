
import Header from "./header"
import InviteUserModal from "./inviteUser"
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