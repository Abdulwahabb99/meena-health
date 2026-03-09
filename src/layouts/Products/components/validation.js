import * as yup from "yup";

const MAX_IMAGES = 3;
const IMG_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export const productSchema = yup.object({
  nameEn: yup.string().required("الاسم بالإنجليزية مطلوب").max(200),
  nameAr: yup.string().required("الاسم بالعربية مطلوب").max(200),
  descriptionEn: yup.string().max(5000),
  descriptionAr: yup.string().max(5000),

  price: yup
    .number()
    .typeError("السعر يجب أن يكون رقمًا")
    .required("السعر مطلوب")
    .min(0, "السعر لا يقل عن 0"),
  discountPrice: yup
    .number()
    .typeError("سعر الخصم يجب أن يكون رقمًا")
    .min(0, "سعر الخصم لا يقل عن 0")
    .nullable(),

  colors: yup
    .array()
    .of(
      yup.object({
        id: yup.mixed().required(),
        label: yup.string().required(),
      })
    )
    .min(1, "اختر لونًا واحدًا على الأقل")
    .required("اختر لونًا واحدًا على الأقل"),

  hasDelivery: yup.boolean().required(),
  hasInstallation: yup.boolean().required(),
  isActive: yup.boolean().required(),
  isFeatured: yup.boolean().required(),

  tags: yup
    .string()
    .required("علامات المنتج مطلوبة")
    .test(
      "not-empty-tags",
      "أدخل وسمًا واحدًا على الأقل",
      (v) =>
        (v || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean).length > 0
    ),

  categoryId: yup
    .number()
    .typeError("اختيار القسم مطلوب")
    .required("اختيار القسم مطلوب"),
  subCategoryId: yup.number().typeError("قيمة غير صحيحة").nullable(),

  images: yup
    .array()
    .of(
      yup
        .mixed()
        .test("fileType", "ملف الصورة يجب أن يكون صورة", (f) =>
          f ? IMG_TYPES.includes(f.type) : false
        )
    )
    .max(MAX_IMAGES, `الحد الأقصى للصور ${MAX_IMAGES}`)
    .min(1, "أضف صورة واحدة على الأقل")
    .required("الصور مطلوبة"),
});

export const updateProductSchema = yup.object({
  nameEn: yup.string().required("الاسم بالإنجليزية مطلوب").max(200),
  nameAr: yup.string().required("الاسم بالعربية مطلوب").max(200),
  descriptionEn: yup.string().max(5000),
  descriptionAr: yup.string().max(5000),

  price: yup
    .number()
    .typeError("السعر يجب أن يكون رقمًا")
    .required("السعر مطلوب")
    .min(0, "السعر لا يقل عن 0"),
  discountPrice: yup
    .number()
    .typeError("سعر الخصم يجب أن يكون رقمًا")
    .min(0, "سعر الخصم لا يقل عن 0")
    .nullable(),

  colors: yup
    .array()
    .of(
      yup.object({
        id: yup.mixed().required(),
        label: yup.string().required(),
      })
    )
    .min(1, "اختر لونًا واحدًا على الأقل")
    .required("اختر لونًا واحدًا على الأقل"),

  hasDelivery: yup.boolean().required(),
  hasInstallation: yup.boolean().required(),
  isActive: yup.boolean().required(),
  isFeatured: yup.boolean().required(),

  tags: yup
    .string()
    .required("علامات المنتج مطلوبة")
    .test(
      "not-empty-tags",
      "أدخل وسمًا واحدًا على الأقل",
      (v) =>
        (v || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean).length > 0
    ),

  categoryId: yup
    .number()
    .typeError("اختيار القسم مطلوب")
    .required("اختيار القسم مطلوب"),
  subCategoryId: yup.number().typeError("قيمة غير صحيحة").nullable(),

  images: yup
    .array()
    .of(
      yup
        .mixed()
        .test("fileType", "ملف الصورة يجب أن يكون صورة", (f) =>
          f ? IMG_TYPES.includes(f.type) : false
        )
    )
    .max(MAX_IMAGES, `الحد الأقصى للصور ${MAX_IMAGES}`),
});
