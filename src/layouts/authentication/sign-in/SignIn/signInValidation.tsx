import * as yup from "yup";

const localPartRegex = /^[a-zA-Z0-9._-]+$/;

export const getSignInValidationSchema = (t) =>
  yup.object({
    email: yup
      .string()
      .trim()
      .required(t("auth.emailRequired"))
      .matches(localPartRegex, t("auth.emailLocalInvalid")),
    password: yup.string().required(t("auth.passwordRequired")),
  });

// Fallback for non-i18n usage
export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .matches(localPartRegex, "Use only letters, numbers, dots, hyphens, and underscores"),
  password: yup.string().required("Password is required"),
});
