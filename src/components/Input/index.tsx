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
import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  placeholder: string;
  label?: string;
  register?: UseFormRegister<any>;
  error?: FieldError | undefined;
}

const Input = ({ icon, name, placeholder, type, className, error, register, label, ...rest }: InputProps) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <div className="relative mt-2">
        {icon && <div className="absolute inset-y-0 px-3 py-3">
          {icon}
        </div>}
        <input
          {...(register && name ? register(name) : {})}
          type={type ?? "text"}
          name={name}
          className={cx(`w-full rounded-md border border-[#e2e2e2] outline-none py-2 text-lg  ${className}`, { "px-[3em]": !!icon, "px-[1em]": !!!icon })}
          placeholder={placeholder}
          {...rest}
        />
        {type === "password" && (
          <div className="absolute right-0 inset-y-0 px-3 py-3">
            <EyeSvg />
          </div>
        )}
        {error && <span className='text-red'>{error.message}</span>}
      </div>
    </div>
  );
};

export default Input;