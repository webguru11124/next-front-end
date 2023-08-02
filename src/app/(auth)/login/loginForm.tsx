"use client";

import Input from "@/components/Input";
import { CompanyEmailSvg, CompanyPasswordSvg, LineSvg, } from "@/assets/icons";
import {
    SocialLinksArr,
} from "@/lib/util";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { LoginFormData } from "@/types";
import { loginUser, registerUser } from "@/api/auth";
import { signIn } from "next-auth/react";
export default function LoginForm() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const { isLoading, isError, error, mutate } = useMutation({
        mutationFn: loginUser,
        onSuccess: async (data, variables, context) => {
            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl,
            });

            console.log(res);
            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                // setError("invalid email or password");
            }

        },
        onError: (error) => {
            console.log("eroor", error)
        }
    })

    const callbackUrl = searchParams.get("callbackUrl") || "/profile";

    let [formValues, setFormValues] = useState<LoginFormData>({
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
        className="bg-white flex flex-col gap-2 pt-8"
    >
        <Input icon={<CompanyEmailSvg />} type="email" name="email" placeholder="Your Email" onChange={handleChange} />
        <Input icon={<CompanyPasswordSvg />} type="password" name="password" placeholder="Your Password" onChange={handleChange} />
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
            <Link href={"/register"}>
                <button className="text-blue-primary border-[1px] font-semibold border-blue-primary bg-transparent rounded-[5px] text-[14px] py-2 w-full flex flex-row items-center justify-center">
                    Signup Now
                </button>
            </Link>
        </div>
    </form>)

}