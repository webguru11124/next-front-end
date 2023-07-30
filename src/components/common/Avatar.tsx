import Img from "@/assets/img/avatar.png"
import Image from "next/image";
export enum AvatarSize {
    xl = 30, md = 100, lg = 200
}

export default function Avatar({ size }: { size: AvatarSize }) {

    return <Image src={Img} alt="avatar" width={size} height={size} className="rounded-full mx-3" />

}