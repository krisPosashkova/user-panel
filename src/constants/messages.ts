import { MessagesType, MessagesKeys } from "@/types/components/messages.types";

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

    profile: {
        error: "Error loading the profile",
    },

    notAuthorized: "Not authorized",
    invalidToken: "Invalid token",
    errorServer: "Server error",
    notFoundUser: "The user was not found",

    userBlock: "Your account has been blocked",
    userSuccessLogin: "Successful account login",
    userSuccessRegister: "Registration successful! Please Sign In.",
};
export function isValidMessagesKey(key: string): key is MessagesKeys {
    return key in Messages;
}
