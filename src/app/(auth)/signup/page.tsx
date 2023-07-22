"use client";
import React, { useState } from "react";
import Header from "../../(common)/Header";
import Input from "../../(common)/Input";
import { LogoSvg } from "../../(icons)/logo";
import { LineSvg, SignUpSvg } from "../../(icons)";
import {
  LanguageOptionArr,
  LinksArr,
  SocialLinksArr,
} from "../../(lib)/util.d";
import { ILinks, ISocialLinks } from "../../(types)";
import Link from "next/link";
import { USFlagSvg } from "../../(icons)/flag/flag.d";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function SignUp() {
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
    <section className="flex font-sans md:min-h-screen flex-col justify-start md:flex-row">
      <div className="xl:px-24 lg:px-10 md:max-w-[40vw] lg:max-w-[48vw] lg:py-10 bg-blue-light md:rounded-r-3xl p-6">
        <div className="py-4 max-w-[30vw] md:block hidden sm:max-w-[15vw]">
          <LogoSvg />
        </div>
        <div className="py-6 lg:py-16">
          <h1 className="text-blue-main pb-14 lg:text-[2em] lg:pr-[1em] text-2xl font-semibold">
            Sign up to enjoy hassle-free freight management
          </h1>
          <div className="md:block hidden">
            <SignUpSvg />
          </div>
        </div>
        <p className="text-text-color md:block hidden font-semibold lg:text-lg text-sm">
          Our online freight administration software simplifies your freight
          operations and saves your valuable time and money. Try it out today
          and see how it can benefit your business!
        </p>
      </div>
      <div className="bg-white px-4 sm:px-10 lg:px-6 xl:px-24 flex flex-col items-center w-full mx-auto md:py-10 relative">
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
                <ul className="box-shadow border-white py-2 flex-col flex bg-white">
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
        <div className="box-shadow rounded-xl bg-white w-full xl:max-w-[30vw] py-6 -mt-20 md:mt-6 px-8 md:px-10">
          <h2 className="text-[#032D60] font-semibold text-xl">Welcome!</h2>
          <p className="text-gray-lighter font-light">
            Enter your details to get started
          </p>
          <div>
            <form
              onSubmit={handleSubmit}
              method="post"
              className="bg-white flex flex-col gap-3 pt-8"
            >
              <Input name="company" placeholder="Your Company" />
              <Input name="email" placeholder="Your Email" />
              <Input name="password" placeholder="Your Password" />
              <div className="py-4">
                <button
                  type="submit"
                  className="text-white bg-blue-primary text-[14px] rounded-md flex flex-row justify-center py-3 w-full text-center font-semibold"
                >
                  Create Account
                </button>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                <LineSvg />
                <span>Or</span>
                <LineSvg />
              </div>
              <div className="flex flex-col md:flex-row justify-center place-items-center md:justify-between gap-4 md:gap-10">
                {SocialLinksArr ? (
                  SocialLinksArr.map((social: ISocialLinks) => (
                    <div
                      key={social.id}
                      className="px-5 py-2 rounded-md border-2 border-blue"
                    >
                      {social.linkIcon}
                    </div>
                  ))
                ) : (
                  <span>No Relevant Links Data</span>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-center pt-3 pb-5 text-[14px] font-medium">
                  Already have an Account ?
                </span>
                <button className="text-blue-primary border-2 font-semibold border-blue-primary bg-transparent rounded-md text-[14px] py-3 w-full flex flex-row items-center justify-center">
                  <Link href={"/auth/login"}>Login Now</Link>
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
}
