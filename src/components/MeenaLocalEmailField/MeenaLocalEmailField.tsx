import type { FocusEvent, ReactNode } from "react";
import { TextField, InputAdornment, Typography } from "@mui/material";
import EmailIcon from "icons/EmailIcon";
import { MEENA_EMAIL_DOMAIN } from "constants/meenaEmailDomain";

export function sanitizeMeenaEmailLocalPart(raw: string): string {
  return raw.replace(/@/g, "").replace(/\s/g, "");
}

type MeenaLocalEmailFieldProps = {
  name: string;
  value: string;
  onValueChange: (localPart: string) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: ReactNode;
  placeholder?: string;
};

/**
 * User edits only the local part; domain suffix is fixed and non-editable.
 */
function MeenaLocalEmailField({
  name,
  value,
  onValueChange,
  onBlur,
  error,
  helperText,
  placeholder,
}: MeenaLocalEmailFieldProps) {
  return (
    <TextField
      name={name}
      type="text"
      autoComplete="username"
      placeholder={placeholder}
      fullWidth
      value={value}
      onChange={(e) => {
        onValueChange(sanitizeMeenaEmailLocalPart(e.target.value));
      }}
      inputProps={{ maxLength: 64 }}
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
              marginInlineEnd: 0,
              "& svg": { width: 20, height: 20, flexShrink: 0 },
            }}
          >
            <EmailIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{
              marginInlineStart: 0.5,
              maxWidth: { xs: "48%", sm: "none" },
            }}
          >
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                whiteSpace: "nowrap",
                userSelect: "none",
                pointerEvents: "none",
                fontSize: { xs: "0.75rem", sm: "0.8125rem" },
              }}
            >
              {MEENA_EMAIL_DOMAIN}
            </Typography>
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
  );
}

export default MeenaLocalEmailField;
