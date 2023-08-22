import Img from "@/assets/img/avatar.png";
import Image from "next/image";

export enum AvatarSize {
  sm = 30,
  md = 100,
  "2md" = 140,
  lg = 200,
}

export default function Avatar({
  size,
  href,
}: {
  size: keyof typeof AvatarSize;
  href?: string;
}) {
  // 'keyof typeof AvatarSize' ensures the 'size' prop can only be one of the keys (sm, md, lg) of the AvatarSize enum.

  // Access the actual size value using the size prop.
  const imageSize = AvatarSize[size];

  return (
    <Image
      src={Img}
      alt="avatar"
      width={imageSize}
      height={imageSize}
      className="rounded-full mx-3"
    />
  );
}
