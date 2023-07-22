"use client";
import React, { useState } from "react";
import {
  CompanyEmailSvg,
  CompanyHouseSvg,
  CompanyPasswordSvg,
  EyeSvg,
  MenuSideBarIcon,
} from "../(icons)";

interface InputProps {
  name: string;
  placeholder: string;
}

const Input = ({ name, placeholder }: InputProps) => {
  const [valueData, setValueData] = useState<string>("");
  return (
    <div className="relative mt-2">
      <div className="absolute inset-y-0 px-3 py-3">
        {name === "company" ? (
          <CompanyHouseSvg />
        ) : name === "email" ? (
          <CompanyEmailSvg />
        ) : (
          <CompanyPasswordSvg />
        )}
      </div>
      <input
        type="text"
        value={valueData}
        onChange={(e) => setValueData(e.target.value)}
        className="w-full rounded-[5px] border-[1px] border-[#e2e2e2] outline-none py-2 text-lg px-[3em]"
        placeholder={placeholder}
      />
      {name === "password" && (
        <div className="absolute right-0 inset-y-0 px-3 py-3">
          <EyeSvg />
        </div>
      )}
    </div>
  );
};

export default Input;
