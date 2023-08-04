"use client"

import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import Link from "next/link";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs"

export default function NavItemOpenable({ name, icon, children, }: { children?: React.ReactNode, icon: React.ReactNode, name: string, }) {
    const [open, setOpen] = useState(true)
    const content = (<div className="flex items-center">{icon} <span className="ml-2">{name}</span></div>)
    return <div><div className={`flex my-3.5  mx-7  text-blue-main  text-xl`}>
        <button className=" grow flex  justify-between" onClick={() => setOpen(!open)}>
            {content}
            <div className="ml-4"><BsChevronDown /></div>
        </button>
    </div>
        {open && <div className="ml-8 mt-7">
            {children}
        </div>}
    </div>
}