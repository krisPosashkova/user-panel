"use client";
import FormSignUp from "@/components/Form/SignUp";
import AuthPage from "@/components/Pages/AuthPage";
import { Suspense } from "react";

export default function SignUp() {
    return (
        <Suspense>
            <AuthPage
                form={<FormSignUp />}
                prompt="Already have an account?"
                linkText="Sign In"
                linkHref="/signin"
            />
        </Suspense>
    );
}
