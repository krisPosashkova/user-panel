"use client";

import FormSignUp from "@/components/Form/SignUp";
import AuthPage from "@/components/Pages/AuthPage";

export default function SignUp() {
    return (
        <AuthPage
            form={<FormSignUp />}
            prompt="Already have an account?"
            linkText="Sign In"
            linkHref="/signin"
        />
    );
}
