import { LuLayoutDashboard } from "react-icons/lu"
import NavItem from "@/app/(home)/_navbar/item"

export default function Navbar() {
    return <div className="w-[271px] bg-white h-screen">
        <div className="flex flex-col justify-center pt-14">
            <NavItem icon={<LuLayoutDashboard />} name="Dashboard" url="/dashboard"></NavItem>
            <NavItem icon={<LuLayoutDashboard />} name="Extra Fields" url="/extra"></NavItem>
            <NavItem icon={<LuLayoutDashboard />} name="Items" url="/items"></NavItem>
            <NavItem icon={<LuLayoutDashboard />} name="Contacts" url="/contact"></NavItem>
        </div>
    </div>
}