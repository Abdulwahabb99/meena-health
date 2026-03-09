import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  CircularProgress,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
// import { useUpdateCategory } from "services/mutations/categories/useUpdateCategory";

const validationSchema = yup.object({
  key: yup
    .string()
    .required("الكود (Key) مطلوب")
    .matches(
      /^[a-z0-9._-]+$/,
      "الكود يجب أن يكون حروف إنجليزية صغيرة/أرقام/.-_ فقط"
    ),
  nameEn: yup.string().required("الاسم بالإنجليزية مطلوب").max(120),
  nameAr: yup.string().required("الاسم بالعربية مطلوب").max(120),
  descriptionEn: yup.string().max(500, "الوصف طويل جداً"),
  descriptionAr: yup.string().max(500, "الوصف طويل جداً"),
  isActive: yup.boolean().required(),
  categoryTypeId: yup
    .number()
    .typeError("اختيار النوع مطلوب")
    .required("اختيار النوع مطلوب"),
  imageUrl: yup
    .mixed()
    .test("fileType", "الملف يجب أن يكون صورة (jpg, jpeg, png)", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    }),
});

export default function UpdateCategoryDialog({
  open,
  onClose,
  category,
  categoryTypes = [],
  isLoading = false,
}) {
  // const { mutate: updateCategory, isPending: isAddLoading } = useUpdateCategory({ ... });
  const isAddLoading = false;
  const updateCategory = () => { toast.success("تم تعديل القسم بنجاح"); onClose(); };

  const formik = useFormik({
    initialValues: {
      key: category?.key || "",
      nameEn: category?.nameEn || "",
      nameAr: category?.nameAr || "",
      descriptionEn: category?.descriptionEn || "",
      descriptionAr: category?.descriptionAr || "",
      imageUrl: "",
      isActive: Boolean(category?.isActive),
      categoryTypeId: category?.categoryTypeId,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const fd = new FormData();
      fd.append("key", values.key);
      fd.append("nameEn", values.nameEn);
      fd.append("nameAr", values.nameAr);
      fd.append("descriptionEn", values.descriptionEn || "");
      fd.append("descriptionAr", values.descriptionAr || "");
      fd.append("isActive", String(values.isActive));
      fd.append("categoryTypeId", String(values.categoryTypeId));

      if (values.imageUrl) {
        fd.append("imageUrl", values.imageUrl);
      }

      handleEdit(fd);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleEdit = (payload) => {
    updateCategory();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>تعديل قسم {category?.nameAr || ""}</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="الكود (Key)"
              name="key"
              placeholder="مثال: office-furniture"
              value={formik.values.key}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.key && formik.errors.key)}
              helperText={formik.touched.key && formik.errors.key}
              fullWidth
            />
            <TextField
              label="الاسم بالعربية"
              name="nameAr"
              placeholder="أثاث المكاتب"
              value={formik.values.nameAr}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.nameAr && formik.errors.nameAr)}
              helperText={formik.touched.nameAr && formik.errors.nameAr}
              fullWidth
            />
            <TextField
              label="الاسم بالإنجليزية"
              name="nameEn"
              placeholder="Office Furniture"
              value={formik.values.nameEn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.nameEn && formik.errors.nameEn)}
              helperText={formik.touched.nameEn && formik.errors.nameEn}
              fullWidth
            />
            <TextField
              label="الوصف بالعربية"
              name="descriptionAr"
              placeholder="أثاث ومعدات مكتبية احترافية"
              value={formik.values.descriptionAr}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.descriptionAr && formik.errors.descriptionAr
              )}
              helperText={
                formik.touched.descriptionAr && formik.errors.descriptionAr
              }
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              label="الوصف بالإنجليزية"
              name="descriptionEn"
              placeholder="Professional office furniture and equipment"
              value={formik.values.descriptionEn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.descriptionEn && formik.errors.descriptionEn
              )}
              helperText={
                formik.touched.descriptionEn && formik.errors.descriptionEn
              }
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              label=""
              name="imageUrl"
              type="file"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                formik.setFieldValue("imageUrl", file);
              }}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.imageUrl && formik.errors.imageUrl)}
              helperText={formik.touched.imageUrl && formik.errors.imageUrl}
              fullWidth
              inputProps={{ accept: "image/*" }}
            />
            <TextField
              select
              label="نوع القسم"
              name="categoryTypeId"
              value={formik.values.categoryTypeId ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.categoryTypeId && formik.errors.categoryTypeId
              )}
              helperText={
                formik.touched.categoryTypeId && formik.errors.categoryTypeId
              }
              disabled={isLoading}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": { padding: "0.7rem 0rem" },
              }}
            >
              {(categoryTypes ?? []).map((t) => {
                return (
                  <MenuItem key={t.id} value={t.id}>
                    {t.nameAr || t.nameEn}
                  </MenuItem>
                );
              })}
            </TextField>
            <FormControlLabel
              label="مفعل"
              control={
                <Switch
                  name="isActive"
                  checked={Boolean(formik.values.isActive)}
                  onChange={(e) =>
                    formik.setFieldValue("isActive", e.target.checked)
                  }
                />
              }
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={isAddLoading}>
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ color: "#FFF" }}
            disableElevation
            disabled={isAddLoading || !formik.dirty}
          >
            {isAddLoading ? (
              <CircularProgress size={22} sx={{ color: "#FFF" }} />
            ) : (
              "إضافة"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
