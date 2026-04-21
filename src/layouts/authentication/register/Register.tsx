import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import { getRegisterValidationSchema } from "./registerValidation";
import { useRegisterMutation } from "services/mutations/useRegisterMutation";
import { toast } from "react-toastify";
import axios from "axios";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import AuthLanguageSwitcher from "layouts/authentication/components/AuthLanguageSwitcher";
import MeenaLocalEmailField from "components/MeenaLocalEmailField/MeenaLocalEmailField";
import { buildMeenaFullEmail } from "constants/meenaEmailDomain";
import PasswordIcon from "icons/PasswordIcon";
import EyeIcon from "icons/EyeIcon";
import EyeOutlineIcon from "icons/EyeOutlineicon";
import SignInHeroLottie from "components/SignInHeroLottie";

const LOGO_PATH = "/meena-logo.png";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslate();
  const { isRTL } = useLocales();
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: getRegisterValidationSchema(t),
    onSubmit: async (values, { setSubmitting }) => {
      registerMutation.mutate(
        { ...values, email: buildMeenaFullEmail(values.email) },
        {
          onSuccess: () => {
            toast.success(t("auth.registerSuccess"));
            navigate("/sign-in", { replace: true });
          },
          onError: (error) => {
            let msg = t("auth.registerFailed");
            if (axios.isAxiosError(error)) {
              const d = error.response?.data as
                | { message?: string }
                | undefined;
              msg = d?.message || error.message || msg;
            } else if (error instanceof Error) {
              msg = error.message;
            }
            toast.error(msg);
          },
          onSettled: () => setSubmitting(false),
        },
      );
    },
  });

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
            {t("auth.registerTitle")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 4,
              color: "text.secondary",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("auth.registerDescription")}
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
                {t("auth.firstName")}
              </Typography>
              <TextField
                name="firstName"
                placeholder={t("auth.firstNamePlaceholder")}
                fullWidth
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName,
                )}
                helperText={
                  formik.touched.firstName && formik.errors.firstName
                }
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
                {t("auth.lastName")}
              </Typography>
              <TextField
                name="lastName"
                placeholder={t("auth.lastNamePlaceholder")}
                fullWidth
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName,
                )}
                helperText={formik.touched.lastName && formik.errors.lastName}
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
              <MeenaLocalEmailField
                name="email"
                placeholder={t("auth.emailPlaceholder")}
                value={formik.values.email}
                onValueChange={(local) =>
                  formik.setFieldValue("email", local)
                }
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                  formik.touched.password && formik.errors.password,
                )}
                helperText={formik.touched.password && formik.errors.password}
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
                      onClick={() => setShowPassword((v) => !v)}
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

            <MDButton
              variant="gradient"
              color="primary"
              size="large"
              type="submit"
              fullWidth
              disabled={registerMutation.isPending}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {registerMutation.isPending ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                t("auth.registerSubmit")
              )}
            </MDButton>

            <Box mt={3} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                {t("auth.alreadyHaveAccount")}{" "}
                <MuiLink component={Link} to="/sign-in" fontWeight={600}>
                  {t("auth.signInInstead")}
                </MuiLink>
              </Typography>
            </Box>
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

export default Register;
