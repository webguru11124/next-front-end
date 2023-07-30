"use client";
import React, { InputHTMLAttributes, useState } from "react";
import {
  CompanyEmailSvg,
  CompanyHouseSvg,
  CompanyPasswordSvg,
  EyeSvg,
  MenuSideBarIcon,
} from "@/assets/icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  placeholder: string;
}

const Input = ({ icon, name, placeholder, type, ...rest }: InputProps) => {
  const [valueData, setValueData] = useState<string>("");
  return (
    <div className="relative mt-2">
      <div className="absolute inset-y-0 px-3 py-3">
        {icon}
      </div>
      <input
        {...rest}
        type={type ?? "text"}
        name={name}
        value={valueData}
        onChange={(e) => setValueData(e.target.value)}
        className={`w-full rounded-[5px] border-[1px] border-[#e2e2e2] outline-none py-2 text-lg px-[3em] ${rest["className"]}`}
        placeholder={placeholder}
      />
      {type === "password" && (
        <div className="absolute right-0 inset-y-0 px-3 py-3">
          <EyeSvg />
        </div>
      )}
    </div>
  );
};

export default Input;
