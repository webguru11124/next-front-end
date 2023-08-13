
import EditModal from "./editModal"
export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <section className="">
        <h1 className="text-blue-main text-3xl font-bold mt-5 ">Manage Profile</h1>
        <div className="flex justify-center mt-20">
            {children}
        </div>
        <EditModal />
    </section>
}