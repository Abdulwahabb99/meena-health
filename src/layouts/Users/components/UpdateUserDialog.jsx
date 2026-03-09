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
// import { useUpdateUser } from "services/mutations/users/useUpdateUser";
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

export default function UpdateUserDialog({ open, onClose, user }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      password: "",
      roleId: user?.role.id || "",
      phoneNumber: user?.phoneNumber || "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleEdit(user?.id, values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });
  // const { data: rolesData, isLoading: rolesLoading } = useFetchRoles();
  const rolesData = { data: { roles: [{ id: 1, nameAr: "مدير" }, { id: 2, nameAr: "مستخدم" }, { id: 3, nameAr: "بائع" }] } };
  const rolesLoading = false;

  // const { mutate: updateUserMutation, isPending: isUpdateLoading } = useUpdateUser({ ... });
  const isUpdateLoading = false;

  const handleEdit = (userId, payload) => {
    toast.success("تم تحديث المستخدم بنجاح");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>تعديل المستخدم</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="الإسم بالكامل"
              name="fullName"
              placeholder="ادخل اسم المستخدم"
              value={formik?.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.fullName && formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              fullWidth
            />

            <TextField
              label="البريد الإلكتروني"
              name="email"
              placeholder="ادخل البريد الإلكتروني"
              value={formik?.values.email}
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
              value={formik?.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              type="text"
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
            disabled={isUpdateLoading || !formik.dirty}
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
