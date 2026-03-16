import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import { getSignInValidationSchema } from "./signInValidation";
import { useAuth } from "shared/hooks/useAuth";
import { useLoginMutation } from "services/mutations/useLoginMutation";
import { toast } from "react-toastify";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import AuthLanguageSwitcher from "layouts/authentication/components/AuthLanguageSwitcher";
import EmailIcon from "icons/EmailIcon";
import PasswordIcon from "icons/PasswordIcon";
import EyeIcon from "icons/EyeIcon";
import EyeOutlineIcon from "icons/EyeOutlineicon";

const SKIP_API_LOGIN = true;
const LOGO_PATH = "/meena-logo.png";
const LOGIN_IMAGE_PATH = "/meena-logo.png";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslate();
  const { isRTL } = useLocales();
  const { login } = useAuth();
  const loginMutation = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "user@meenahealth.com",
      password: "password",
    },
    validationSchema: getSignInValidationSchema(t),
    onSubmit: async (values, { setSubmitting }) => {
      if (SKIP_API_LOGIN) {
        login({
          data: {
            id: 1,
            email: values.email || "dev@meena.com",
            role: "user",
          },
        });
        return;
      }

      loginMutation.mutate(values, {
        onSuccess: (data) => {
          login(data);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: isRTL ? "row" : "row-reverse",
        },
        direction: isRTL ? "rtl" : "ltr",
        backgroundColor: "background.default",
      }}
    >
      {/* Image Panel - Left in RTL, Right in LTR */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          minHeight: { xs: 200, md: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: (theme) =>
            theme.palette?.meena?.sidenavBg || "#F3EEFF",
          p: { xs: 4, md: 6, lg: 10 },
        }}
      >
        <Box
          component="img"
          src={LOGIN_IMAGE_PATH}
          alt="Meena Intranet"
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: { xs: 180, md: 400, lg: 500 },
            objectFit: "contain",
            display: { xs: "block", md: "block" },
          }}
        />
      </Box>

      {/* Form Panel - Right in RTL, Left in LTR */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: { xs: "auto", md: "100vh" },
          px: { xs: 3, md: 6, lg: 10 },
          py: { xs: 4, md: 6 },
          backgroundColor: "background.paper",
        }}
      >
        {/* Header: Logo + Language */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            flexDirection: isRTL ? "row" : "row-reverse",
            mb: 2,
          }}
        >
          <AuthLanguageSwitcher />

          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{
              flexDirection: isRTL ? "row-reverse" : "row",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            <Box
              component="img"
              src={LOGO_PATH}
              alt="Meena"
              sx={{
                width: 48,
                height: 40,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  lineHeight: 1.2,
                  color: "text.primary",
                }}
              >
                {t("auth.brandTitle")}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  lineHeight: 1.3,
                }}
              >
                {t("auth.brandTagline")}
              </Typography>
            </Box>
          </Stack>
        </Stack>

        {/* Form */}
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
            {t("auth.welcome")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 4,
              color: "text.secondary",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("auth.description")}
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
                {t("auth.email")}
              </Typography>
              <TextField
                name="email"
                placeholder={t("auth.emailPlaceholder")}
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "grey.50",
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
                {t("auth.password")}
              </Typography>
              <TextField
                name="password"
                placeholder={t("auth.passwordPlaceholder")}
                type={showPassword ? "text" : "password"}
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={
                  formik.touched.password && formik.errors.password
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() => setShowPassword((v) => !v)}
                      sx={{ cursor: "pointer" }}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOutlineIcon />}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "grey.50",
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
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {loginMutation.isPending ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                t("auth.submit")
              )}
            </MDButton>
          </Box>
        </Box>

        {/* Footer */}
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

export default SignIn;
