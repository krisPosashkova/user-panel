export interface MessagesType {
    form: {
        success: string;
        error: string;
    };
    userBlock: string;
    userSuccessLogin: string;
    userSuccessRegister: string;
    userLogin: { success: string; error: string };
    userRegister: {
        missingData: string;
        emailExists: string;
        creationError: string;
        success: string;
    };
}

export type MessagesKeys = keyof MessagesType;

export type MessagesKeysWithSuccess = keyof {
    [K in keyof MessagesType as MessagesType[K] extends { success: string }
        ? K
        : never]: MessagesType[K];
};
