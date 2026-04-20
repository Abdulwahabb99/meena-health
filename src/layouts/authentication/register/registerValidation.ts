import * as yup from "yup";

export const getRegisterValidationSchema = (t: (key: string) => string) =>
  yup.object({
    firstName: yup.string().required(t("auth.firstNameRequired")),
    lastName: yup.string().required(t("auth.lastNameRequired")),
    email: yup
      .string()
      .email(t("auth.emailInvalid"))
      .required(t("auth.emailRequired")),
    password: yup
      .string()
      .min(6, t("auth.passwordMin"))
      .required(t("auth.passwordRequired")),
  });
