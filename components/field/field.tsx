import React from "react";
import { TextField, Alert, Box } from "@mui/material";
import { UseFormRegister, FieldError, RegisterOptions } from "react-hook-form";

interface FieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  type?: string;
  register: {
    name: string;
    onChange: React.ChangeEventHandler;
    onBlur: React.FocusEventHandler;
    ref: React.Ref<any>;
  };
  labelStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  errorStyle?: React.CSSProperties;
  multiline?: boolean;
  rows?: number;
}

export const Field: React.FC<FieldProps> = ({
  name,
  label,
  placeholder,
  error,
  type = "text",
  register,
  labelStyle,
  inputStyle,
  errorStyle,
  multiline = false,
  rows = 4,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        {...register}
        id={`outlined-${name}`}
        label={label}
        placeholder={placeholder}
        type={type}
        fullWidth
        multiline={multiline}
        rows={multiline ? rows : undefined}
        error={!!error}
        sx={{
          ...inputStyle,
          "& .MuiInputBase-root": {
            backgroundColor: "white",
          },
          "& .MuiInputBase-input": {
            position: "relative",
            color: "black",
          },
          "& .MuiInputLabel-root": {
            color: error ? "error.main" : "text.secondary",
            ...labelStyle,
          },
        }}
      />
      {error && (
        <Alert severity="error" sx={{ mt: 1, ...errorStyle }}>
          {error.message}
        </Alert>
      )}
    </Box>
  );
};

export default Field;
