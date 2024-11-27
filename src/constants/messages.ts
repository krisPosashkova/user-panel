import { MessagesType, MessagesKeys } from "@/types/components/messages.types";

export const Messages: MessagesType = {
    form: {
        success: "Form submitted successfully!",
        error: "There was an error submitting the form.",
    },

    profile: {
        error: "Error loading the profile",
    },
    errorGetProfile: "Error Getting the profile:",
    infoDeleteYourAccount:
        "You have deleted your account, you can register again",
    warningBlockYourAccount: "You have blocked your account, you cannot log in",

    success: "The operation was completed successfully",
    error: "Something went wrong",

    redirect: "Redirect",
    successConectsDB: "The connection to the database is successful!",
    errorConnectDB: "Error connecting to the database",

    emailExists: "Email already exists.",
    requiredFields: "Please provide all required fields.",
    requiredEmailPassword: "Email and password are required",
    notAuthorized: "Not authorized",
    invalidToken: "Invalid token",
    invalidPassword: "Invalid password",
    errorServer: "Server error",
    errorCreationUser: "Error creating user.",
    errorDecoded: "Error when decoding the token",
    notIDUsers: "User IDs are not specified",

    succesDeleteUsers: "Users have been deleted",
    errorDeleteUser: "Error deleting users",

    successUnblockUser: "Users have been successfully unblocked",
    errorUnblockUser: "Error when unblocking users",

    successBlockUsers: "Users have been successfully blocked",
    errorBlockUsers: "Error when blocking users",

    notFoundUser: "The user was not found",
    notFoundEmailUser: "The user with this email was not found",

    userErrorLogin: "There was an error login",
    userSuccessLogin: "Successful account login",

    userLoggedOut: "The user logged out",
    userErrorLoggedOut: "Failed to log out",

    errorGetListUsers: "Error when getting the list of users:",

    userBlock: "Your account has been blocked",
    userSuccessRegister: "Registration successful! Please Sign In.",
};
export function isValidMessagesKey(key: string): key is MessagesKeys {
    return key in Messages;
}
