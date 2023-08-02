

import React from "react";
import { LogoSvg } from "@/assets/icons/logo";
import { CheckMark, LoginSvg, } from "@/assets/icons";
import Header from "@/app/(auth)/header";
import LoginForm from "@/app/(auth)/login/loginForm";

const Login = () => {

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
        <Header></Header>
        <div className="box-shadow rounded-md bg-white w-full xl:max-w-[30vw] py-8 -mt-20 md:mt-12 px-12 md:px-12">
          <h2 className="text-[#032D60] font-semibold text-xl">Welcome!</h2>
          <p className="text-gray-lighter font-light mt-2">
            Enter your details to get started
          </p>
          <div>
            <LoginForm></LoginForm>
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
