
import React from "react";
import Header from "@/app/(auth)/header";
import { LogoSvg } from "@/assets/icons/logo";
import { SignUpSvg } from "@/assets/icons";
import RegisterForm from "@/app/(auth)/register/registerForm";


export default function SignUp() {
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
        <Header></Header>
        <div className="box-shadow rounded-xl bg-white w-full xl:max-w-[30vw] py-6 -mt-20 md:mt-6 px-8 md:px-10">
          <h2 className="text-[#032D60] font-semibold text-xl">Welcome!</h2>
          <p className="text-gray-lighter font-light">
            Enter your details to get started
          </p>
          <div>
            <RegisterForm></RegisterForm>
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
