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
// import { useAddRole } from "services/mutations/roles/useAddRole";

const validationSchema = yup.object({
  key: yup.string().required("الكود مطلوب"),
  nameEn: yup.string().required("الاسم بالإنجليزية مطلوب"),
  nameAr: yup.string().required("الاسم بالعربية مطلوب"),
});

export default function AddNewRoleDialog({ open, onClose }) {
  const formik = useFormik({
    initialValues: {
      key: "",
      nameEn: "",
      nameAr: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleAdd(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  const { mutate: addRoleMutation, isPending: isAddLoading } = useAddRole({
    onSuccess: () => {
      toast.success("تم إضافة دور بنجاح");
      onClose();
    },
    onError: (error) => {
      toast.error(`حدث خطأ: ${error.message}`);
    },
  });

  const handleAdd = (payload) => {
    addRoleMutation({ payload });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>إضافة دور جديد</DialogTitle>

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
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isAddLoading}>
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ color: "#FFF" }}
            disableElevation
            disabled={isAddLoading}
          >
            {isAddLoading ? (
              <CircularProgress
                size={22}
                sx={{
                  color: "#000",
                }}
              />
            ) : (
              "إضافة"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
