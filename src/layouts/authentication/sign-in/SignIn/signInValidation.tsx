import * as yup from "yup";
import {
  MEENA_EMAIL_LOCAL_PART_REGEX,
  meenaEmailLocalYup,
} from "shared/validation/meenaEmailLocal";

export const getSignInValidationSchema = (t) =>
  yup.object({
    email: meenaEmailLocalYup(t),
    password: yup.string().required(t("auth.passwordRequired")),
  });

export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .matches(
      MEENA_EMAIL_LOCAL_PART_REGEX,
      "Use only letters, numbers, dots, hyphens, and underscores",
    ),
  password: yup.string().required("Password is required"),
});
