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
// import { useUpdateOrder } from "services/mutations/orders/useUpdateOrder";
import { getPaymentMethod } from "constants/constants";
const ORDER_STATUSES = [
  "PENDING",
  "UNDER_REVIEW",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
];

// Status labels mapping
const getStatusLabel = (status) => {
  switch (status) {
    case "PENDING":
      return "قيد الانتظار";
    case "UNDER_REVIEW":
      return "تحت المراجعة";
    case "CONFIRMED":
      return "تم التأكيد";
    case "PROCESSING":
      return "جاري المعالجة";
    case "SHIPPED":
      return "تم الشحن";
    case "DELIVERED":
      return "تم التوصيل";
    case "COMPLETED":
      return "مكتمل";
    case "CANCELLED":
      return "ملغي";
    case "REFUNDED":
      return "مسترد";
    default:
      return "غير معروف";
  }
};

const PAYMENT_METHODS = [
  "CREDIT_CARD",
  "CASH",
  "APPLE_PAY",
  "STC_PAY",
  "PAYPAL",
];

const validationSchema = yup.object({
  status: yup
    .string()
    .oneOf(ORDER_STATUSES, "حالة غير صالحة")
    .required("الحالة مطلوبة"),
  paymentMethod: yup
    .string()
    .oneOf(PAYMENT_METHODS, "وسيلة دفع غير صالحة")
    .required("وسيلة الدفع مطلوبة"),
  deliveryAddress: yup.string().nullable(),
  notes: yup.string().nullable(),
  deliveryFee: yup
    .number()
    .typeError("برجاء إدخال رقم صحيح")
    .min(0, "لا يمكن أن تكون أقل من صفر")
    .required("رسوم التوصيل مطلوبة"),
  installationFee: yup
    .number()
    .typeError("برجاء إدخال رقم صحيح")
    .min(0, "لا يمكن أن تكون أقل من صفر")
    .required("رسوم التركيب مطلوبة"),
  taxAmount: yup
    .number()
    .typeError("برجاء إدخال رقم صحيح")
    .min(0, "لا يمكن أن تكون أقل من صفر")
    .required("الضريبة مطلوبة"),
});

export default function UpdateOrderDialog({ open, onClose, order }) {
  // const { mutate: updateOrder, isPending: isUpdateLoading } = useUpdateOrder({
  //   onSuccess: () => {
  //     toast.success("تم تحديث الطلب بنجاح");
  //     onClose();
  //   },
  //   onError: (error) => {
  //     const msg = error?.response?.data?.message || error?.message || "حدث خطأ";
  //     toast.error(msg);
  //   },
  // });
  const isUpdateLoading = false;
  const updateOrder = () => {
    toast.success("تم تحديث الطلب بنجاح");
    onClose();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: order?.status || "PENDING",
      paymentMethod: order?.paymentMethod || "CREDIT_CARD",
      deliveryAddress: order?.deliveryAddress || "",
      notes: order?.notes || "",
      deliveryFee: order?.deliveryFee ? order.deliveryFee : 0,
      installationFee: order?.installationFee ? order.installationFee : 0,
      taxAmount: order?.taxAmount ? order.taxAmount : 0,
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      if (!order?.id) {
        toast.error("معرّف الطلب غير موجود");
        return;
      }
      updateOrder();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>تعديل الطلب</DialogTitle>

      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              select
              label="حالة الطلب"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "0.7rem 0rem",
                },
              }}
            >
              {ORDER_STATUSES.map((s) => (
                <MenuItem key={s} value={s}>
                  {getStatusLabel(s)}
                </MenuItem>
              ))}
            </TextField>

            {/* <TextField
              select
              label="وسيلة الدفع"
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "0.7rem 0rem",
                },
              }}
            >
              {PAYMENT_METHODS.map((m) => (
                <MenuItem key={m} value={m}>
                  {getPaymentMethod(m)}
                </MenuItem>
              ))}
            </TextField> */}

            <TextField
              label="عنوان التوصيل"
              name="deliveryAddress"
              placeholder="ادخل عنوان التوصيل"
              value={formik.values.deliveryAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.deliveryAddress && formik.errors.deliveryAddress
              )}
              helperText={
                formik.touched.deliveryAddress && formik.errors.deliveryAddress
              }
              fullWidth
              multiline
              minRows={3}
              maxRows={3}
            />

            {/* رسوم التوصيل */}
            <TextField
              label="رسوم التوصيل"
              name="deliveryFee"
              type="number"
              inputProps={{ min: 0, step: "0.01" }}
              value={formik.values.deliveryFee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.deliveryFee && formik.errors.deliveryFee
              )}
              helperText={
                formik.touched.deliveryFee && formik.errors.deliveryFee
              }
              fullWidth
            />

            {/* رسوم التركيب */}
            <TextField
              label="رسوم التركيب"
              name="installationFee"
              type="number"
              inputProps={{ min: 0, step: "0.01" }}
              value={formik.values.installationFee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.installationFee && formik.errors.installationFee
              )}
              helperText={
                formik.touched.installationFee && formik.errors.installationFee
              }
              fullWidth
            />

            {/* قيمة الضريبة */}
            <TextField
              label="قيمة الضريبة"
              name="taxAmount"
              type="number"
              inputProps={{ min: 0, step: "0.01" }}
              value={formik.values.taxAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.taxAmount && formik.errors.taxAmount
              )}
              helperText={formik.touched.taxAmount && formik.errors.taxAmount}
              fullWidth
            />

            <TextField
              label="ملاحظات"
              name="notes"
              placeholder="اكتب أي ملاحظات"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              multiline
              minRows={2}
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
            disabled={isUpdateLoading || !formik.dirty}
          >
            {isUpdateLoading ? (
              <CircularProgress size={22} sx={{ color: "#000" }} />
            ) : (
              "حفظ"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
