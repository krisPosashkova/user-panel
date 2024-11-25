import { MessagesType } from "@/types/components/form.types";

// To do: дорабоать сообщения

export const Messages: MessagesType = {
    form: {
        success: "Form submitted successfully!",
        error: "There was an error submitting the form.",
    },
    userRegister: {
        missingData: "Please provide all required fields.",
        emailExists: "Email already exists.",
        creationError: "Error creating user.",
        success: "Registration successful! Please Sign In.",
    },

    userLogin: {
        success: "Login successful!",
        error: "There was an error login",
    },
};
