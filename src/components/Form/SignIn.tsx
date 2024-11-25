import React from "react";
import DynamicForm from "./index";
import { signInFields } from "./formFieldConfig";
import { handleLogin } from "@/utils/api";

const FormSignIn = () => {
    return (
        <DynamicForm
            title="Sign In"
            description="Sign in to your account"
            fields={signInFields}
            onSubmit={handleLogin}
            formName="userLogin"
        />
    );
};

export default FormSignIn;
