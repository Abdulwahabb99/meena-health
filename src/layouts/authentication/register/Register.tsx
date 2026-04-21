import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import { getRegisterValidationSchema } from "./registerValidation";
import { useRegisterMutation } from "services/mutations/useRegisterMutation";
import { toast } from "react-toastify";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import MeenaLocalEmailField from "components/MeenaLocalEmailField/MeenaLocalEmailField";
import { buildMeenaFullEmail } from "constants/meenaEmailDomain";
import AuthSplitLayout from "shared/components/AuthSplitLayout/AuthSplitLayout";
import AuthPasswordField from "shared/components/AuthPasswordField/AuthPasswordField";
import { getApiErrorMessage } from "shared/utils/getApiErrorMessage";

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
            toast.error(getApiErrorMessage(error, t("auth.registerFailed")));
          },
          onSettled: () => setSubmitting(false),
        },
      );
    },
  });

  const outlinedSx = {
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
  };

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
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            sx={outlinedSx}
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
            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            sx={outlinedSx}
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
    </AuthSplitLayout>
  );
}

export default Register;
