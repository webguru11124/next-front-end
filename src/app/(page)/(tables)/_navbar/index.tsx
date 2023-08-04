import { LuLayoutDashboard } from "react-icons/lu"
import { BsPersonVcard, BsFillGeoFill } from "react-icons/bs"
import { HiOutlineUserGroup } from "react-icons/hi"

import { BsPeople } from "react-icons/bs"
import NavItem from "@/app/(page)/(tables)/_navbar/item"
import NavItemOpenable from "@/app/(page)/(tables)/_navbar/item/openable"

export default function Navbar() {
    return <div className=" bg-white h-screen">
        <div className="flex flex-col justify-center pt-14 ">
            <NavItem icon={<LuLayoutDashboard />} name="Dashboard" url="/dashboard" ></NavItem>
            <NavItem icon={<LuLayoutDashboard />} name="Extra Fields" url="/extra"></NavItem>
            <NavItem icon={<LuLayoutDashboard />} name="Items" url="/items"></NavItem>
            <NavItemOpenable icon={<BsPersonVcard />} name="Contacts" >
                <NavItem icon={<HiOutlineUserGroup />} name="Customers" url="/customers" sub />
                <NavItem icon={<BsPeople />} name="Vendors" url="/vendors" sub />
                <NavItem icon={<BsFillGeoFill />} name="Forwarders" url="/forwarders" sub />
            </NavItemOpenable>
        </div>
    </div>
}