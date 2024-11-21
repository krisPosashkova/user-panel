import React from "react";
import DynamicForm from "./index";
import { signInFields } from "./formFieldConfig";

const handleSignIn = (data: {
    name: string;
    email: string;
    password: string;
}) => {
    console.log("Sign In Data:", data);
};

const FormSignIn = () => {
    return (
        <DynamicForm
            title="Sign In"
            description="Sign in to your account"
            fields={signInFields}
            onSubmit={handleSignIn}
        />
    );
};

export default FormSignIn;
