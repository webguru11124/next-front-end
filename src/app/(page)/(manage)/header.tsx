"use client"

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi"
export default function ManageHeader() {
    const router = useRouter();
    return <button className="flex items-center text-blue-primary" onClick={() => router.back()}>
        <FiChevronLeft size={46} />
        <span className="text-xl">Go Back</span>
    </button>
}