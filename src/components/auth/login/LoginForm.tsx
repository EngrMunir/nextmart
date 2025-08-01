"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import Link from "next/link";
import { loginSchema } from "./loginValidation";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginSchema),
    });
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false)

    const { formState: {isSubmitting}} = form

    const handleReCaptcha = async (value: string | null)=>{
        try {
            const res = await reCaptchaTokenVerification(value!)
            if(res?.success){
                setReCaptchaStatus(true)
            }
        } catch (err:any) {
            console.error(err)
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async(data) =>{
        try {
            const res = await loginUser(data);
            if(res.success){
                toast.success(res?.message)
            }else{
                toast.error(res?.message)
            }
        } catch (err:any) {
            console.log(err)
        }
    }

    return (
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
            <div className="flex items-center space-x-4">
                <div>
                    <h1>Logo</h1>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Login</h1>
                    <p className="font-extralight text-sm">Welcome back</p>
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField 
                control={form.control}
                name="email"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} value={field.value || ''}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}

                />
                    <FormField 
                control={form.control}
                name="password"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} value={field.value || ''}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}

                />
                <div className="flex w-full mt-3">
                    <ReCAPTCHA className="mx-auto" sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY} onChange={handleReCaptcha}/>
                </div>
                <Button disabled={reCaptchaStatus? false : true} type="submit">
                    {isSubmitting? "Logging...":"Login"}
                </Button>
                </form>
            </Form>
            <p className="text-sm text-gray-600 text-center my-3">Don't have account?
                <Link href="/register">Register</Link>
            </p>
        </div>
    );
};

export default LoginForm;