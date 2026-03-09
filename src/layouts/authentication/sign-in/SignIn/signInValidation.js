import * as yup from "yup";

export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .email("من فضلك أدخل بريدًا إلكترونيًا صحيحًا")
    .required("البريد الإلكتروني مطلوب"),
  password: yup
    .string()
    // .min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف")
    // .matches(/[A-Z]/, "يجب أن تحتوي على حرف كبير واحد على الأقل")
    // .matches(/[a-z]/, "يجب أن تحتوي على حرف صغير واحد على الأقل")
    // .matches(/\d/, "يجب أن تحتوي على رقم واحد على الأقل")
    .required("كلمة المرور مطلوبة"),
});
