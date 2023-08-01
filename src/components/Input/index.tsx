"use client";
import { cx, css } from '@emotion/css';
import React, { InputHTMLAttributes, useState } from "react";
import {
  CompanyEmailSvg,
  CompanyHouseSvg,
  CompanyPasswordSvg,
  EyeSvg,
  MenuSideBarIcon,
} from "@/assets/icons";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  placeholder: string;
  label?: string,
}

const Input = ({ icon, name, placeholder, type, label, ...rest }: InputProps) => {
  const [valueData, setValueData] = useState<string>("");
  return (
    <div>
      {label && <label>{label}</label>}
      <div className="relative mt-2">
        {icon && <div className="absolute inset-y-0 px-3 py-3">
          {icon}
        </div>}
        <input
          {...rest}
          type={type ?? "text"}
          name={name}
          value={valueData}
          onChange={(e) => setValueData(e.target.value)}
          className={cx(`w-full rounded-md border border-[#e2e2e2] outline-none py-2 text-lg  ${rest["className"]}`, { "px-[3em]": !!icon, "px-[1em]": !!!icon })}
          placeholder={placeholder}
        />
        {type === "password" && (
          <div className="absolute right-0 inset-y-0 px-3 py-3">
            <EyeSvg />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
