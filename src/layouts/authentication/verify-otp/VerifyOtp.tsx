import React, { useState } from "react";
import {
  Box,
  Stack,
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
import AuthLanguageSwitcher from "layouts/authentication/components/AuthLanguageSwitcher";
import SignInHeroLottie from "components/SignInHeroLottie";

const LOGO_PATH = "/meena-logo.png";

/** Placeholder until backend OTP integration; accept only this value. */
const VALID_OTP = "00000";

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
      if (values.otp === VALID_OTP) {
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
    <Box
      sx={{
        height: "100vh",
        overflow: { xs: "auto", md: "hidden" },
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: isRTL ? "row" : "row-reverse",
        },
        direction: isRTL ? "rtl" : "ltr",
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100vh",
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          p: 4,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <SignInHeroLottie sizes={{ lg: 420, xl: 540, xxl: 660 }} />
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", lg: "45%" },
          minHeight: { xs: "100vh", lg: "auto" },
          height: { xs: "100vh", lg: "100vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", lg: "space-between" },
          overflow: { xs: "auto", lg: "hidden" },
          px: { xs: 3, md: 6, lg: 10 },
          py: { xs: 5, md: 6 },
          pt: { xs: 8, lg: 6 },
          backgroundColor: "background.paper",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            flexDirection: isRTL ? "row" : "row-reverse",
            mb: { xs: 5, lg: 2 },
            flexShrink: 0,
          }}
        >
          <AuthLanguageSwitcher />

          <Box
            component="img"
            src={LOGO_PATH}
            alt="Meena"
            sx={{
              width: 160,
              height: "auto",
              maxHeight: 56,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
        </Stack>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 420,
            width: "100%",
            mx: "auto",
          }}
        >
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
        </Box>

        <Typography
          variant="caption"
          sx={{
            pt: 4,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          © {new Date().getFullYear()} Meena Health. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default VerifyOtp;
