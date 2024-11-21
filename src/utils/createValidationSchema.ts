import * as z from "zod";

export const createValidationSchema = (
    fields: {
        name: string;
        validation: z.ZodTypeAny;
    }[]
) => {
    return z.object(
        fields.reduce((acc, field) => {
            acc[field.name] = field.validation;
            return acc;
        }, {} as Record<string, z.ZodTypeAny>)
    );
};
