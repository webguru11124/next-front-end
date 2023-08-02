"use client"
import Input from "@/components/Input";
import { CompanyEmailSvg, CompanyHouseSvg, CompanyPasswordSvg, LineSvg, } from "@/assets/icons";
import {
    SocialLinksArr,
} from "@/lib/util";
import { ISocialLinks } from "@/types";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { RegisterFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation"
import { registerUser } from "@/api/auth";

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const { isLoading, isError, error, mutate } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data, variables, context) => {
            signIn(undefined, { callbackUrl: "/" });
        },
        onError: (error) => {
            console.log("eroor", error)
        }

    })

    let [formValues, setFormValues] = useState<RegisterFormData>({
        name: "",
        email: "",
        password: "",
    });
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formValues);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };
    return (<form
        onSubmit={onSubmit}
        method="post"
        className="bg-white flex flex-col gap-3 pt-8"
    >
        <Input icon={<CompanyHouseSvg />} name="name" placeholder="Your  Name"
            onChange={handleChange}
        />
        <Input icon={<CompanyEmailSvg />} type="email" name="email" placeholder="Your Email"
            onChange={handleChange}
        />
        <Input icon={<CompanyPasswordSvg />} type="password" name="password" placeholder="Your Password"
            onChange={handleChange}
        />
        <div className="py-4">
            <div className="flex justify-center w-full mt-auto">

                {isLoading ? <Spinner /> :
                    <button
                        type="submit"
                        className="text-white bg-blue-primary text-[14px] rounded-md flex flex-row justify-center py-3 w-full text-center font-semibold"
                    >Create Account
                    </button>}

            </div>
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
            <Link href={"/login"}>
                <button className="text-blue-primary border-2 font-semibold border-blue-primary bg-transparent rounded-md text-[14px] py-3 w-full flex flex-row items-center justify-center">
                    Login Now
                </button>
            </Link>
        </div>
    </form>)
}