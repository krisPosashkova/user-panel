import React from "react";
import { signUpFields } from "./formFieldConfig";
import DynamicForm from "./index";

const handleSignUp = (data: {
    name: string;
    email: string;
    password: string;
}) => {
    console.log("Sign Up Data info:", data);
};

const FormSignUp = () => {
    return (
        <DynamicForm
            title="Sign Up"
            description="Create your account"
            fields={signUpFields}
            onSubmit={handleSignUp}
        />
    );
};

export default FormSignUp;
