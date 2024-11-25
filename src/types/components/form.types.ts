import {
    FieldValues,
    UseFormRegister,
    FieldError,
    FieldErrorsImpl,
} from "react-hook-form";
import * as z from "zod";
import { ApiResponse } from "@/types/api.types";

export type DynamicField = {
    name: string;
    label: string;
    type: string;
    validation: z.ZodTypeAny;
};

export interface MessagesType {
    form: {
        success: string;
        error: string;
    };

    userLogin: { success: string; error: string };
    userRegister: {
        missingData: string;
        emailExists: string;
        creationError: string;
        success: string;
    };
    // Добавьте другие формы по мере необходимости
}

export type FormProps<T extends FieldValues> = {
    title: string;
    description?: string;
    fields: DynamicField[];
    formName: keyof MessagesType;
    onSubmit: (data: T) => Promise<ApiResponse<{ message: string }>>;
};

export type FormFieldProps<T extends FieldValues> = {
    field: {
        name: string;
        label: string;
        type: string;
    };
    register: UseFormRegister<T>;
    error?: FieldError | FieldErrorsImpl<T>[string];
};
