import { TextField } from "@mui/material";
import { Path, FieldValues } from "react-hook-form";
import { FormFieldProps } from "@/types/components/form.types";

const FormField = <T extends FieldValues>({
    field,
    register,
    error,
}: FormFieldProps<T>) => (
    <TextField
        label={field.label}
        type={field.type}
        {...register(field.name as Path<T>)}
        error={!!error}
        helperText={error?.message as string | undefined}
        fullWidth
    />
);

export default FormField;
