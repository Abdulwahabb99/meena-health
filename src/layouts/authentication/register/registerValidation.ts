import * as yup from "yup";
import { meenaEmailLocalYup } from "shared/validation/meenaEmailLocal";

export const getRegisterValidationSchema = (t: (key: string) => string) =>
  yup.object({
    firstName: yup.string().required(t("auth.firstNameRequired")),
    lastName: yup.string().required(t("auth.lastNameRequired")),
    email: meenaEmailLocalYup(t),
    password: yup
      .string()
      .min(6, t("auth.passwordMin"))
      .required(t("auth.passwordRequired")),
  });
