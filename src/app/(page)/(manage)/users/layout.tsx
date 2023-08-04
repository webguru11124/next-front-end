
import Header from "./header"
import EditModal from "./editModal"
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
        <EditModal></EditModal>
    </section>
}