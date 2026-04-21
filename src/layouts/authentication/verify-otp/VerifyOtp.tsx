import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { Navigate } from "react-router-dom";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "shared/hooks/useAuth";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import AuthSplitLayout from "shared/components/AuthSplitLayout/AuthSplitLayout";
import { AUTH_OTP_PLACEHOLDER_CODE } from "constants/authOtp";

function VerifyOtp() {
  const { t } = useTranslate();
  const { isRTL } = useLocales();
  const { user, token, otpVerified, ready, completeOtpVerification } =
    useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { otp: "" },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required(t("auth.otpRequired"))
        .length(5, t("auth.otpLength")),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitError(null);
      if (values.otp === AUTH_OTP_PLACEHOLDER_CODE) {
        completeOtpVerification();
      } else {
        setSubmitError(t("auth.otpInvalid"));
      }
      setSubmitting(false);
    },
  });

  if (!ready) return null;
  if (!user || !token) {
    return <Navigate to="/sign-in" replace />;
  }
  if (otpVerified) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthSplitLayout isRTL={isRTL}>
      <Typography
        variant="h4"
        sx={{
          mb: 1,
          fontWeight: 700,
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          textAlign: isRTL ? "right" : "left",
          color: "text.primary",
        }}
      >
        {t("auth.otpTitle")}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 4,
          color: "text.secondary",
          textAlign: isRTL ? "right" : "left",
        }}
      >
        {t("auth.otpDescription")}
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: "100%" }}
      >
        <Box mb={2}>
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontWeight: 500,
              color: "text.primary",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("auth.otpLabel")}
          </Typography>
          <TextField
            name="otp"
            placeholder={t("auth.otpPlaceholder")}
            fullWidth
            value={formik.values.otp}
            onChange={(e) => {
              setSubmitError(null);
              const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
              formik.setFieldValue("otp", digits);
            }}
            onBlur={formik.handleBlur}
            error={Boolean(
              (formik.touched.otp && formik.errors.otp) || submitError,
            )}
            helperText={
              submitError ||
              (formik.touched.otp && formik.errors.otp) ||
              undefined
            }
            inputProps={{
              inputMode: "numeric",
              maxLength: 5,
              autoComplete: "one-time-code",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineEnd: 0,
                    "& svg": { width: 22, height: 22, flexShrink: 0 },
                  }}
                >
                  <VpnKeyOutlinedIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "grey.50",
                alignItems: "center",
                letterSpacing: "0.2em",
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

        <MDButton
          variant="gradient"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={formik.isSubmitting}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          {formik.isSubmitting ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            t("auth.otpSubmit")
          )}
        </MDButton>
      </Box>
    </AuthSplitLayout>
  );
}

export default VerifyOtp;
