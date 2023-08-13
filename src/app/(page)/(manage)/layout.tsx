import Header from "@/app/(page)/(manage)/header";
import EditModal from "./profile/editModal";

export default function ManageLayout({ children }: { children: React.ReactNode }) {
    return <>
        <div className="mx-20 my-10">
            <div>
                <Header></Header>
            </div>
            {children}
            <EditModal />
        </div>
    </>
}