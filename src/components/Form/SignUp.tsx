import React from "react";
import { signUpFields } from "./formFieldConfig";
import DynamicForm from "./index";

import { handleRegister } from "@/utils/api";

const FormSignUp = () => {
    return (
        <DynamicForm
            title="Sign Up"
            description="Create your account"
            fields={signUpFields}
            onSubmit={handleRegister}
            formName="userRegister"
        />
    );
};

export default FormSignUp;
