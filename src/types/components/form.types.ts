import {
    FieldValues,
    UseFormRegister,
    FieldError,
    FieldErrorsImpl,
} from "react-hook-form";
import * as z from "zod";
import { ApiResponse } from "@/types/api.types";
import FormField from "@/components/Form/FormField";

export interface DynamicField extends FormField {
    validation: z.ZodTypeAny;
}

export type FormProps<T extends FieldValues> = {
    title: string;
    description?: string;
    fields: DynamicField[];
    onSubmit: (data: T) => Promise<ApiResponse<{ message: string }>>;
};

export type FormField = {
    name: string;
    label: string;
    type: string;
};

export type FormFieldProps<T extends FieldValues> = {
    field: FormField;
    register: UseFormRegister<T>;
    error?: FieldError | FieldErrorsImpl<T>[string];
};
