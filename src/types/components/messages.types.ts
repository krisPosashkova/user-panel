export interface MessagesType {
    form: {
        success: string;
        error: string;
    };

    profile: {
        error: string;
    };

    redirect: string;

    successConectsDB: string;
    errorConnectDB: string;
    errorGetProfile: string;

    infoDeleteYourAccount: string;
    warningBlockYourAccount: string;

    errorServer: string;
    notAuthorized: string;
    invalidToken: string;
    notFoundUser: string;
    invalidPassword: string;
    userErrorLogin: string;
    userBlock: string;
    userSuccessLogin: string;
    userSuccessRegister: string;
    requiredEmailPassword: string;
    requiredFields: string;
    notFoundEmailUser: string;
    userLoggedOut: string;
    userErrorLoggedOut: string;
    emailExists: string;
    errorCreationUser: string;
    successBlockUsers: string;
    errorBlockUsers: string;
    succesDeleteUsers: string;
    errorDeleteUser: string;
    successUnblockUser: string;
    errorUnblockUser: string;
    errorGetListUsers: string;
    errorDecoded: string;
    notIDUsers: string;
    success: string;
    error: string;
}

export type MessagesKeys = keyof MessagesType;

export type MessagesKeysWithSuccess = keyof {
    [K in keyof MessagesType as MessagesType[K] extends { success: string }
        ? K
        : never]: MessagesType[K];
};
