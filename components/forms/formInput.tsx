
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from "@material-ui/core/TextField";

interface FormInputProps {
    name: string;
    label?: string;
    errorobj: Object;
    required?: boolean;
    errormessage?: string;
}

export default function FormInput(props) {
    const { control } = useFormContext();
    const { name, label, errorobj, required, errormessage } = props;

    let isError = false;
    if (errorobj && errorobj.hasOwnProperty(name)) {
      isError = true;
    }

    return (
        <Controller
            as={TextField}
            name={name}
            error={isError}
            InputLabelProps={{
                className: required ? "required-label" : "",
                required: required || false,
              }}
            rules={{ required: required }}
            control={control}
            label={label}
            defaultValue=""
            fullWidth={true}
            helperText={required ? errormessage : null}
            {...props}
        />
    )
}