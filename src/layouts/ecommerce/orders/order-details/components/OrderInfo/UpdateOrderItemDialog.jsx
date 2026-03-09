import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  CircularProgress,
  MenuItem,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// import { useUpdateOrderItem } from "services/mutations/orders/useUpdateOrderItem";

const ORDER_ITEM_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "READY_FOR_DELIVERY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "INSTALLED",
  "CANCELLED",
  "RETURNED",
  "REFUNDED",
];

const getStatusLabel = (status) => {
  switch (status) {
    case "PENDING":
      return "قيد الانتظار";
    case "CONFIRMED":
      return "تم التأكيد";
    case "PROCESSING":
      return "جاري المعالجة";
    case "READY_FOR_DELIVERY":
      return "جاري التحضير للتوصيل";
    case "OUT_FOR_DELIVERY":
      return "جاري التوصيل";
    case "DELIVERED":
      return "تم التوصيل";
    case "INSTALLED":
      return "تم التركيب";
    case "CANCELLED":
      return "ملغي";
    case "RETURNED":
      return "مرتجع";
    case "REFUNDED":
      return "مسترد";
    default:
      return "غير معروف";
  }
};

const validationSchema = yup.object({
  status: yup.string().required("حالة العنصر مطلوبة"),
});

function UpdateOrderItemDialog({ open, onClose, item, orderId }) {
  // const updateOrderMutation = useUpdateOrderItem({
  //   onSuccess: () => {
  //     toast.success("تم تحديث حالة العنصر بنجاح");
  //     onClose();
  //   },
  //   onError: (error) => {
  //     toast.error("حدث خطأ أثناء تحديث حالة العنصر");
  //     console.error("Update order item error:", error);
  //   },
  // });
  const updateOrderMutation = {
    isPending: false,
    mutate: () => { toast.success("تم تحديث حالة العنصر بنجاح"); onClose(); },
  };

  const formik = useFormik({
    initialValues: {
      status: item?.tracking?.status || "PENDING",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!item?.id || !orderId) {
        toast.error("معرف العنصر أو الطلب غير موجود");
        return;
      }

      const payload = {
        status: values.status,
      };

      updateOrderMutation.mutate({
        id: orderId,
        orderItemId: item.id,
        payload,
      });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <MDTypography variant="h6" fontWeight="medium">
          تعديل حالة عنصر الطلب
        </MDTypography>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogContent>
          <Stack spacing={3}>
            <Box>
              <MDTypography variant="subtitle2" fontWeight="medium" mb={1}>
                معلومات العنصر
              </MDTypography>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  backgroundColor: "#fafafa",
                }}
              >
                <MDTypography variant="body2" fontWeight="medium">
                  {item?.product?.nameAr}
                </MDTypography>
              </Box>
            </Box>

            <TextField
              select
              label="حالة العنصر"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "0.7rem 0rem",
                },
              }}
            >
              {ORDER_ITEM_STATUSES.map((status) => (
                <MenuItem key={status} value={status}>
                  {getStatusLabel(status)}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <MDButton
            variant="outlined"
            onClick={handleClose}
            disabled={updateOrderMutation.isPending}
            size="small"
            sx={{ color: "#000" }}
          >
            إلغاء
          </MDButton>
          <MDButton
            type="submit"
            variant="contained"
            disabled={updateOrderMutation.isPending || !formik.dirty}
            size="small"
            startIcon={
              updateOrderMutation.isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
          >
            {updateOrderMutation.isPending ? "جاري الحفظ..." : "حفظ"}
          </MDButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UpdateOrderItemDialog;
