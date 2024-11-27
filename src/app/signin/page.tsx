"use client";
import FormSignIn from "@/components/Form/SignIn";
import AuthPage from "@/components/Pages/AuthPage";
import { Suspense } from "react";

export default function SignUp() {
    return (
        <Suspense>
            <AuthPage
                form={<FormSignIn />}
                prompt="Don't have an account?"
                linkText="Sign Up"
                linkHref="/signup"
            />
        </Suspense>
    );
}
