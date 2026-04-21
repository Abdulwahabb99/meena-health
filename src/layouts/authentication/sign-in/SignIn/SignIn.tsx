import React, { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import { getSignInValidationSchema } from "./signInValidation";
import { useAuth } from "shared/hooks/useAuth";
import type { AuthUser } from "shared/context/AuthContext";
import { useLoginMutation } from "services/mutations/useLoginMutation";
import { toast } from "react-toastify";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import MeenaLocalEmailField from "components/MeenaLocalEmailField/MeenaLocalEmailField";
import { buildMeenaFullEmail } from "constants/meenaEmailDomain";
import AuthSplitLayout from "shared/components/AuthSplitLayout/AuthSplitLayout";
import AuthPasswordField from "shared/components/AuthPasswordField/AuthPasswordField";
import { getApiErrorMessage } from "shared/utils/getApiErrorMessage";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslate();
  const { isRTL } = useLocales();
  const { login } = useAuth();
  const loginMutation = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: getSignInValidationSchema(t),
    onSubmit: (values, { setSubmitting }) => {
      loginMutation.mutate(
        { ...values, email: buildMeenaFullEmail(values.email) },
        {
          onSuccess: (data) => {
            login({
              token: data.token,
              user: data.user as AuthUser,
            });
            toast.success(t("auth.loginSuccess"));
          },
          onError: (error) => {
            toast.error(getApiErrorMessage(error, t("auth.loginFailed")));
          },
          onSettled: () => setSubmitting(false),
        },
      );
    },
  });

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

      <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: "100%" }}>
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
            onValueChange={(local) => formik.setFieldValue("email", local)}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>

        <AuthPasswordField
          name="password"
          label={t("auth.password")}
          placeholder={t("auth.passwordPlaceholder")}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          showPassword={showPassword}
          onToggleShowPassword={() => setShowPassword((v) => !v)}
          isRTL={isRTL}
        />

        <MDButton
          variant="gradient"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          disabled={loginMutation.isPending}
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

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            {t("auth.needAccount")}{" "}
            <MuiLink component={Link} to="/register" fontWeight={600}>
              {t("auth.registerLink")}
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </AuthSplitLayout>
  );
}

export default SignIn;
