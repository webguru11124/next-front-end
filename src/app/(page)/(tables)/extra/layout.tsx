import DropdownEditModal from "./dropdownEditModal";
import EditExtraModal from "./extraEditModal";
import Header from "./header";

export default function ExtraFieldLayout({ children }: { children: React.ReactNode }) {
    return <>
        <Header />
        <div className="w-full mt-7">
            {children}
        </div>
        <EditExtraModal />
        <DropdownEditModal />
    </>
}