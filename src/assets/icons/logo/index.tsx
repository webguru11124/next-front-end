import Image from "next/image";
import React from "react";
import Logo from "@/assets/img/logo.png"

export const LogoSvg = () => {
  return (
    <Image
      src={Logo}
      alt="Logo Image"
      width={150}
      height={60}
      style={{ objectFit: "contain", minWidth: "80px" }}
      className="xs:w-[100px] sm:w-[120px]"
      priority
    />
  );
};
