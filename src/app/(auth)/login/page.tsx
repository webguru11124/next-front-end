"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Input from "@/components/common/Input";
import { LogoSvg } from "@/assets/icons/logo";
import { CheckMark, LineSvg, LoginSvg, SignUpSvg } from "@/assets/icons";
import {
  LanguageOptionArr,
  LinksArr,
  SocialLinksArr,
} from "@/lib/util";
import { ILinks, ISocialLinks } from "@/types";
import Link from "next/link";
import { USFlagSvg } from "@/assets/icons/flag/flag.d";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [activeLanguage, setActiveLanguage] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = {
      contactName: target.value,
      contactEmail: target.value,
      contactUsername: target.value,
    };
  };
  return (
    <section className="flex md:px-0 xs:px-4 font-sans md:min-h-screen flex-col justify-start xs:justify-center xs:h-[100vh] md:h-auto md:flex-row">
      <div className="absolute z-1 left-0 top-0 bg-blue-light w-[100vw] h-[60vh] xs:block md:hidden " />
      <div className="xl:px-24 md:block hidden lg:px-10 md:max-w-[40vw] lg:max-w-[48vw] lg:py-10 bg-blue-light md:rounded-r-3xl p-6">
        <div className=" max-w-[30vw] md:block hidden sm:max-w-[15vw]">
          <LogoSvg />
        </div>
        <div className="py-10 lg:py-10 ">
          <h1 className="text-blue-main pb-14 mt-2 lg:text-[2em] lg:pr-[1em] text-2xl font-[6] tracking-wide">
            Welcome To Freight Diary
          </h1>
          <div className="md:block hidden">
            <LoginSvg />
          </div>
        </div>
        <div className="hidden md:block ">
          <p className="text-blue-main text-md font-bold mt-[15px] tracking-[.5px]">
            What will you avail
          </p>
          <ul className="flex-col gap-2 pt-4 text-text-color md:flex hidden font-semibold lg:text-lg text-sm">
            <li className="flex flex-row items-start gap-4 font-[500]  text-[14px] tracking-[.5px]">
              <div className="mt-[6px]">
                <CheckMark />
              </div>
              Discover the fastest and easiest way to manage your freight
              shipments
            </li>
            <li className="flex flex-row items-start gap-4 font-[500]  text-[14px] tracking-[.5px]">
              <div className="mt-[6px]">
                <CheckMark />
              </div>
              Get access to exclusive features and personalized support
            </li>
            <li className="flex flex-row items-start gap-4 font-[500]  text-[14px] tracking-[.5px]">
              <div className="mt-[6px]">
                <CheckMark />
              </div>
              Join the elite group of satisfied customers
            </li>
          </ul>
        </div>
      </div>
      <div className="px-4 sm:px-20 lg:px-6 xl:px-24 flex flex-col items-center w-full mx-auto md:py-10 relative">
        <div className="md:flex hidden flex-row items-center justify-between gap-6 lg:gap-12">
          <div className="flex flex-row justify-between items-center gap-6 lg:gap-12">
            {LinksArr.map((link: ILinks) => (
              <Link
                key={link.id}
                href={link.linkUrl}
                className="text-blue text-lg font-semibold"
              >
                {link.linkName}
              </Link>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={() => setActiveLanguage((prev) => !prev)}
              className="flex flex-row gap-2 items-center"
            >
              <USFlagSvg />
              <ChevronDownIcon className="h-4 w-4 text-gray-dark" />
            </button>
            {activeLanguage && (
              <div className="absolute ">
                <ul className="box-shadow border-white py-2 flex-col flex ">
                  {LanguageOptionArr ? (
                    LanguageOptionArr.map((language) => (
                      <li
                        key={language.id}
                        className="hover:bg-gray-light py-4 rounded-md px-4"
                      >
                        {language.image}{" "}
                      </li>
                    ))
                  ) : (
                    <li>No Specified language</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="box-shadow rounded-md bg-white w-full xl:max-w-[30vw] py-8 -mt-20 md:mt-12 px-12 md:px-12">
          <h2 className="text-[#032D60] font-semibold text-xl">Welcome!</h2>
          <p className="text-gray-lighter font-light mt-2">
            Enter your details to get started
          </p>
          <div>
            <form
              onSubmit={handleSubmit}
              method="post"
              className="bg-white flex flex-col gap-2 pt-8"
            >
              <Input name="email" placeholder="Your Email" />
              <Input name="password" placeholder="Your Password" />
              <div className="flex justify-end text-sm text-[#6F74DD]">
                Forget Password?
              </div>
              <div className="py-4">
                <button
                  type="submit"
                  className="text-white rounded-[5px] bg-blue-primary text-[14px] rounded-xl flex flex-row justify-center py-2 w-full text-center font-semibold"
                >
                  Login
                </button>
              </div>
              <div className="flex flex-row items-center justify-center gap-5 text-[10px]">
                <LineSvg />
                <span>Or</span>
                <LineSvg />
              </div>
              <div className="flex  flex-row justify-center place-items-center md:justify-center gap-4 md:gap-4">
                {SocialLinksArr ? (
                  SocialLinksArr.map((social) => (
                    <div
                      key={social.id}
                      className="px-[8px] py-[8px] rounded-[4px] mt-2 border-[1px] border-blue"
                    >
                      {social.linkIcon}
                    </div>
                  ))
                ) : (
                  <span>No Relevant Links Data</span>
                )}
              </div>
              <div className="flex flex-col mt-2 justify-center">
                <span className="text-center pt-3 pb-5 text-sm font-medium text-[#828282]">
                  Already have an Account ?
                </span>
                <button className="text-blue-primary border-[1px] font-semibold border-blue-primary bg-transparent rounded-[5px] text-[14px] py-2 w-full flex flex-row items-center justify-center">
                  <Link href={"/auth/signup"}>Signup Now</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="py-2 flex flex-col justify-center items-center">
          <span className="md:absolute text-center bottom-4 text-[12px] text-gray-lighter left-[10em] xl:left-[20em]">
            ©2023 - Freight Diary. All right reserved
          </span>
        </div>
      </div>
    </section>
  );
};
export default Login;
