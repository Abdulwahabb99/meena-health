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
import { toast } from "react-toastify";
import { useUpdateRole } from "services/mutations/roles/useUpdateRole";

const validationSchema = yup.object({
  key: yup.string().required("الكود مطلوب"),
  nameEn: yup.string().required("الاسم بالإنجليزية مطلوب"),
  nameAr: yup.string().required("الاسم بالعربية مطلوب"),
});

export default function UpdateRoleDialog({ open, onClose, role }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      key: role?.key || "",
      nameEn: role?.nameEn || "",
      nameAr: role?.nameAr || "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleEdit(role.id, values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  const { mutate: updatePermissionMutation, isPending: isUpdateLoading } =
    useUpdateRole({
      onSuccess: () => {
        toast.success("تم تحديث الدور بنجاح");
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
      <DialogTitle>تعديل الدور</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="الكود (Key)"
              name="key"
              placeholder="ادخل الكود"
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
                  color: "#000",
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
