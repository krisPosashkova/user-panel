import {
    SubmitHandler,
    FieldValues,
    UseFormRegister,
    FieldError,
    FieldErrorsImpl,
} from "react-hook-form";
import * as z from "zod";

export type DynamicField = {
    name: string;
    label: string;
    type: string;
    validation: z.ZodTypeAny;
};

export type FormProps<T extends FieldValues> = {
    title: string;
    description?: string;
    fields: DynamicField[];
    onSubmit: SubmitHandler<T>;
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
