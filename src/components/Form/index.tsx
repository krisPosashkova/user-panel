"use client";

import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography, Button } from "@mui/material";
import { CusomForm } from "@/styles/components";
import { FormProps } from "@/types/components/form.types";
import FormField from "./FormField";
import { createValidationSchema } from "@/utils/createValidationSchema";

const DynamicForm = <T extends FieldValues>({
    title,
    description,
    fields,
    onSubmit,
}: FormProps<T>) => {
    const schema = createValidationSchema(fields);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<T>({
        resolver: zodResolver(schema),
    });

    return (
        <CusomForm onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h2" component="h1">
                {title}
            </Typography>

            {description && (
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
            )}

            {fields.map((field) => (
                <FormField
                    key={field.name}
                    field={field}
                    register={register}
                    error={errors[field.name]}
                />
            ))}

            <Button
                type="submit"
                variant="contained"
                sx={{
                    padding: "1rem",
                }}
                disabled={isSubmitting}>
                {title}
            </Button>
        </CusomForm>
    );
};

export default DynamicForm;
