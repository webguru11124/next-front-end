import Image from "next/image"
import { FiChevronLeft } from "react-icons/fi"
import Avatar from "@/assets/img/avatar.png"
export default function ProfilePage() {
    return <div className="rounded-md bg-white shadow-sm  p-7">
        <Image
            src={Avatar}
            alt="Avatar"
            width={100}
            height={100}

        ></Image>
    </div>
}