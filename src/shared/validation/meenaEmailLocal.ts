import * as yup from "yup";

export const MEENA_EMAIL_LOCAL_PART_REGEX = /^[a-zA-Z0-9._-]+$/;

export function meenaEmailLocalYup(t: (key: string) => string) {
  return yup
    .string()
    .trim()
    .required(t("auth.emailRequired"))
    .matches(MEENA_EMAIL_LOCAL_PART_REGEX, t("auth.emailLocalInvalid"));
}
