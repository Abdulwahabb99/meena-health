import type { ChangeEvent, FocusEvent, ReactNode } from "react";
import { Box, TextField, Typography, InputAdornment } from "@mui/material";
import PasswordIcon from "icons/PasswordIcon";
import EyeIcon from "icons/EyeIcon";
import EyeOutlineIcon from "icons/EyeOutlineicon";

type AuthPasswordFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: ReactNode;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  isRTL: boolean;
};

export default function AuthPasswordField({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  showPassword,
  onToggleShowPassword,
  isRTL,
}: AuthPasswordFieldProps) {
  return (
    <Box mb={3}>
      <Typography
        variant="body2"
        sx={{
          mb: 1,
          fontWeight: 500,
          color: "text.primary",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {label}
      </Typography>
      <TextField
        name={name}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        fullWidth
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 0,
                "& svg": { width: 20, height: 20, flexShrink: 0 },
              }}
            >
              <PasswordIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={onToggleShowPassword}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                ml: 0,
                "& svg": { width: 20, height: 20, flexShrink: 0 },
              }}
            >
              {showPassword ? <EyeIcon /> : <EyeOutlineIcon />}
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            bgcolor: "grey.50",
            alignItems: "center",
            "&.Mui-focused": {
              bgcolor: "background.paper",
              "& fieldset": {
                borderColor: "primary.main",
                borderWidth: 2,
              },
            },
          },
        }}
      />
    </Box>
  );
}
