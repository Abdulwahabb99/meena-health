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
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
// import { useAddUser } from "services/mutations/users/useAddUser";
// import { useFetchRoles } from "services/queries/roles/useFetchRoles";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("الاسم مطلوب")
    .min(4, "الاسم يجب أن يكون على الأقل 4 حروف"),
  email: yup
    .string()
    .required("البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صالح"),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .max(128, "كلمة المرور يجب ألا تتجاوز 128 حرف")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,128}$/,
      "كلمة المرور يجب أن تحتوي على حرف صغير، حرف كبير ورقم"
    ),
  roleId: yup.string().required("اختيار الدور مطلوب"),
  phoneNumber: yup
    .string()
    .required("رقم الجوال مطلوب")
    .matches(/^(\+9665\d{8}|05\d{8})$/, "رقم جوال غير صالح"),
});

export default function AddNewUserDialog({ open, onClose }) {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      roleId: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleAdd(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  // const { data: rolesData, isLoading: rolesLoading } = useFetchRoles();
  const rolesData = { data: { roles: [{ id: 1, nameAr: "مدير" }, { id: 2, nameAr: "مستخدم" }, { id: 3, nameAr: "بائع" }] } };
  const rolesLoading = false;

  // const { mutate: addUserMutation, isPending: isAddLoading } = useAddUser({ ... });
  const isAddLoading = false;

  const handleAdd = (payload) => {
    toast.success("تم إضافة مستخدم بنجاح");
    formik.resetForm();
    onClose();
  };

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>إضافة مستخدم جديد</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="الإسم بالكامل"
              name="fullName"
              placeholder="ادخل اسم المستخدم "
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.fullName && formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              fullWidth
            />

            <TextField
              label="البرد الإلكتروني"
              name="email"
              placeholder="ادخل البريد الإلكتروني"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />

            <TextField
              select
              label="اختر الدور"
              name="roleId"
              value={formik?.values?.roleId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.roleId && formik.errors.roleId)}
              helperText={formik.touched.roleId && formik.errors.roleId}
              fullWidth
              disabled={rolesLoading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "0.7rem 0rem",
                },
              }}
            >
              {(rolesData?.data?.roles ?? []).map((role) => (
                <MenuItem key={role?.id} value={role?.id}>
                  {role?.nameAr || role?.nameEn}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="رقم الجوال"
              name="phoneNumber"
              placeholder="ادخل رقم الجوال"
              value={formik.values.phoneNumber || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.phoneNumber && formik.errors.phoneNumber
              )}
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              fullWidth
            />

            <TextField
              label="كلمة المرور"
              name="password"
              placeholder="ادخل كلمة المرور"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
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
