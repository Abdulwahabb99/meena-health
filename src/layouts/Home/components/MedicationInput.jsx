import { useState } from "react";
import { Box, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function MedicationInput({
  onAdd,
  helperText,
  title,
  description,
  placeholder,
  addLabel,
  isRTL,
  errorMessages = {},
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const trimmed = value.trim();
    setError("");

    if (!trimmed) {
      setError(errorMessages.required || "Required");
      return;
    }

    if (!/^\d+$/.test(trimmed)) {
      setError(errorMessages.invalid || "Invalid format");
      return;
    }

    const result = await onAdd(trimmed);
    if (result.success) {
      setValue("");
    } else {
      setError(result.error || errorMessages.notFound || "Drug not found");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Box>
      <MDTypography variant="h5" fontWeight="bold" color="dark" mb={1}>
        {title}
      </MDTypography>
      <MDTypography variant="body2" color="text" sx={{ mb: 2 }}>
        {description}
      </MDTypography>
      <Box
        sx={{
          display: "flex",
          flexDirection: isRTL ? "row-reverse" : "row",
          gap: 1,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <TextField
          fullWidth
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          error={Boolean(error)}
          helperText={error}
          size="medium"
          sx={{
            flex: "1 1 200px",
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: "grey.50",
              "&.Mui-focused": {
                bgcolor: "background.paper",
                "& fieldset": { borderColor: "primary.main", borderWidth: 2 },
              },
            },
          }}
        />
        <MDButton
          variant="gradient"
          color="primary"
          onClick={handleSubmit}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1.5,
            minHeight: 56,
            flexShrink: 0,
          }}
        >
          <Box component="span" sx={{ mr: 0.5, fontSize: "1.25rem", lineHeight: 1 }}>
            +
          </Box>
          {addLabel}
        </MDButton>
      </Box>
      <MDTypography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
        {helperText}
      </MDTypography>
    </Box>
  );
}

MedicationInput.propTypes = {
  onAdd: PropTypes.func.isRequired,
  helperText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  addLabel: PropTypes.string.isRequired,
  isRTL: PropTypes.bool,
  errorMessages: PropTypes.shape({
    required: PropTypes.string,
    invalid: PropTypes.string,
    notFound: PropTypes.string,
  }),
};

export default MedicationInput;
