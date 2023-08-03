"use client"
import Input from "@/components/Input";
import { CompanyEmailSvg, CompanyHouseSvg, CompanyPasswordSvg, LineSvg, } from "@/assets/icons";
import {
    SocialLinksArr,
} from "@/lib/util";
import { ISocialLinks } from "@/types";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation"
import { registerUser } from "@/api/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';
import { useEffect } from "react";
import { toast } from 'react-toastify';

const schema = z.object({
    name: z.string().min(1).max(50).nonempty(),
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

export { schema };
export type { FormFields };

export default function RegisterForm() {
    const { isLoading, isError, error: ServerError, mutate } = useMutation({
        mutationFn: registerUser,
        onSuccess: (data, variables, context) => {
            toast.error(`User registered Successfully`, { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'top-right' })
            signIn(undefined, { callbackUrl: "/" });
        },
        onError: (error) => {
            toast.error(`Server Error: ${error}`, { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'top-right' })
        }
    })

    const { register, handleSubmit, control, formState: { errors: formErrors }, watch, reset } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    useEffect(() => {
        // Reset the form when there is no error, this clears the form after successful registration
        if (!isError && !isLoading) {
            reset();
        }
    }, [isError, isLoading, reset]);

    const onSubmit = (data: FormFields): void => {
        mutate(data);
    };


    return (<><form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="bg-white flex flex-col gap-3 pt-8"
    >
        <Input icon={<CompanyHouseSvg />}
            register={register} name="name" placeholder="Your  Name" error={formErrors.name}
        />
        <Input icon={<CompanyEmailSvg />}
            register={register} type="email" name="email" placeholder="Your Email" error={formErrors.email}
        />
        <Input icon={<CompanyPasswordSvg />}
            register={register} type="password" name="password" placeholder="Your Password" error={formErrors.password}
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
    </form></>)
}