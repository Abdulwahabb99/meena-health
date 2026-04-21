import * as yup from "yup";

const localPartRegex = /^[a-zA-Z0-9._-]+$/;

export const getRegisterValidationSchema = (t: (key: string) => string) =>
  yup.object({
    firstName: yup.string().required(t("auth.firstNameRequired")),
    lastName: yup.string().required(t("auth.lastNameRequired")),
    email: yup
      .string()
      .trim()
      .required(t("auth.emailRequired"))
      .matches(localPartRegex, t("auth.emailLocalInvalid")),
    password: yup
      .string()
      .min(6, t("auth.passwordMin"))
      .required(t("auth.passwordRequired")),
  });
