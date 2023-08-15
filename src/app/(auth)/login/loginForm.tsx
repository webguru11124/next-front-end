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
import { signIn } from "next-auth/react";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

type FormFields = z.infer<typeof schema>;
export default function LoginForm() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const { register, handleSubmit, control, formState: { errors: formErrors }, watch, reset } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(schema),
        mode: 'onChange',
    });
    const onSubmit = async (data: FormFields) => {
        try {
            setLoading(true);
            const res = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl,
            });

            setLoading(false);
            if (!res?.error) {
                toast.error(`Successed`, { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'top-right' })
                router.push(callbackUrl);
            } else {
                toast.error(`Login failed`, { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'top-right' })
            }

        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    return (<>
        <form
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            className="bg-white flex flex-col gap-2 pt-8"
        >
            <Input icon={<CompanyEmailSvg />} type="email" name="email" placeholder="Your Email" register={register} error={formErrors.email} />
            <Input icon={<CompanyPasswordSvg />} type="password" name="password" placeholder="Your Password" register={register} error={formErrors.password} />
            <div className="flex justify-end text-sm text-[#6F74DD]">
                Forget Password?
            </div>
            <div className="py-4">

                {loading ? <Spinner></Spinner> : <button
                    type="submit"
                    className="text-white rounded-[5px] bg-blue-primary text-[14px] rounded-xl flex flex-row justify-center py-2 w-full text-center font-semibold"
                >
                    Login
                </button>}
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
        </form>
    </>)

}