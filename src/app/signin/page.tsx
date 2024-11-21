"use client";
import FormSignIn from "@/components/Form/SignIn";
import AuthPage from "@/components/Pages/AuthPage";

export default function SignUp() {
    return (
        <AuthPage
            form={<FormSignIn />}
            prompt="Don't have an account?"
            linkText="Sign Up"
            linkHref="/signup"
        />
    );
}
