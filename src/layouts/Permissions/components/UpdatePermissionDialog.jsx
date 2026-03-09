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
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useUpdatePermission } from "services/mutations/permissions/useUpdatePermission";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  key: yup.string().required("الكود مطلوب"),
  nameEn: yup.string().required("الاسم بالإنجليزية مطلوب"),
  nameAr: yup.string().required("الاسم بالعربية مطلوب"),
  module: yup.string().required("اسم الموديول مطلوب"),
});

export default function UpdatePermissionDialog({ open, onClose, permission }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      key: permission?.key || "",
      nameEn: permission?.nameEn || "",
      nameAr: permission?.nameAr || "",
      module: permission?.module || "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleEdit(permission.id, values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  const { mutate: updatePermissionMutation, isPending: isUpdateLoading } =
    useUpdatePermission({
      onSuccess: () => {
        toast.success("تم تحديث الصلاحية بنجاح");
        onClose();
      },
      onError: (error) => {
        toast.error(`حدث خطأ: ${error.message}`);
      },
    });

  const handleEdit = (permissionId, payload) => {
    updatePermissionMutation({
      permissionId,
      payload,
    });
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>تعديل الصلاحية</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="الكود (Key)"
              name="key"
              placeholder="مثال: products.view"
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
              placeholder="عرض المنتجات"
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
              placeholder="View Products"
              value={formik.values.nameEn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.nameEn && formik.errors.nameEn)}
              helperText={formik.touched.nameEn && formik.errors.nameEn}
              fullWidth
            />

            <TextField
              label="الموديول"
              name="module"
              placeholder="products"
              value={formik.values.module}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.module && formik.errors.module)}
              helperText={formik.touched.module && formik.errors.module}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isUpdateLoading}>
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ color: "#FFF" }}
            disableElevation
            disabled={isUpdateLoading}
          >
            {isUpdateLoading ? (
              <CircularProgress
                size={22}
                sx={{
                  color: "#FFF",
                }}
              />
            ) : (
              "حفظ"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
