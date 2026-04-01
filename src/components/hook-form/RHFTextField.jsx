import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

/**
 * MUI v5 outlined TextField wired to react-hook-form (use inside FormProvider).
 * @param {boolean} [digitsOnly] - strip non-digits on change (e.g. national ID)
 * @param {boolean} [isReadOnly] - input readOnly
 */
function RHFTextField({
  name,
  helperText,
  type,
  isReadOnly = false,
  digitsOnly = false,
  InputProps,
  InputLabelProps,
  inputProps,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const raw = field.value ?? "";
        const displayValue =
          type === "number" && (raw === "" || raw === null || raw === undefined)
            ? ""
            : raw;

        const handleChange = (event) => {
          let v = event.target.value;
          if (digitsOnly) {
            v = v.replace(/\D/g, "");
          }
          if (type === "number") {
            field.onChange(v === "" ? "" : Number(v));
          } else {
            field.onChange(v);
          }
        };

        return (
          <TextField
            {...other}
            name={field.name}
            type={type === "number" ? "number" : type}
            value={displayValue}
            onChange={handleChange}
            onBlur={field.onBlur}
            inputRef={field.ref}
            error={Boolean(error)}
            helperText={error ? error.message : helperText}
            inputProps={inputProps}
            InputProps={{
              readOnly: isReadOnly,
              ...InputProps,
            }}
            InputLabelProps={InputLabelProps}
          />
        );
      }}
    />
  );
}

RHFTextField.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.node,
  type: PropTypes.string,
  isReadOnly: PropTypes.bool,
  digitsOnly: PropTypes.bool,
  InputProps: PropTypes.object,
  InputLabelProps: PropTypes.object,
  inputProps: PropTypes.object,
};

RHFTextField.defaultProps = {
  helperText: undefined,
  type: undefined,
  isReadOnly: false,
  digitsOnly: false,
  InputProps: undefined,
  InputLabelProps: undefined,
  inputProps: undefined,
};

export default RHFTextField;
