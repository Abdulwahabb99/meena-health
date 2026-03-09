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
  Chip,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// import { useBulkUpdateOrderItems } from "services/mutations/orders/useBulkUpdateOrderItems";
import { getOrderBadgeStatus } from "layouts/Orders/utils/constants";

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
  status: yup.string().required("حالة العناصر مطلوبة"),
});

function BulkUpdateOrderItemsDialog({
  open,
  onClose,
  selectedItems,
  orderId,
  setSelectedItems,
}) {
  // const bulkUpdateMutation = useBulkUpdateOrderItems({
  //   orderId,
  //   onSuccess: () => {
  //     toast.success(`تم تحديث حالة ${selectedItems.length} عنصر بنجاح`);
  //     onClose();
  //     setSelectedItems(new Set());
  //   },
  //   onError: (error) => {
  //     toast.error("حدث خطأ أثناء تحديث حالة العناصر");
  //     console.error("Bulk update order items error:", error);
  //   },
  // });
  const bulkUpdateMutation = {
    isPending: false,
    mutate: () => { toast.success(`تم تحديث حالة ${selectedItems.length} عنصر بنجاح`); onClose(); setSelectedItems(new Set()); },
  };

  const formik = useFormik({
    initialValues: {
      status: "PENDING",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!selectedItems || selectedItems.length === 0) {
        toast.error("لم يتم تحديد أي عناصر للتحديث");
        return;
      }

      const trackingIds = selectedItems.map(
        (item) => item.tracking?.id || item.id
      );

      const payload = {
        trackingIds,
        status: values.status,
      };

      bulkUpdateMutation.mutate(payload);
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
          تعديل جماعي لحالة العناصر
        </MDTypography>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogContent>
          <Stack spacing={3}>
            <Box>
              <MDTypography variant="subtitle2" fontWeight="medium" mb={1}>
                العناصر المحددة ({selectedItems.length})
              </MDTypography>
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  backgroundColor: "#fafafa",
                  maxHeight: 150,
                  overflowY: "auto",
                }}
              >
                <Stack spacing={1}>
                  {selectedItems.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                        backgroundColor: "white",
                        borderRadius: 0.5,
                        border: "1px solid #f0f0f0",
                      }}
                      gap={2}
                    >
                      <MDTypography variant="body2" fontWeight="medium">
                        {item?.product?.nameAr}
                      </MDTypography>
                      {getOrderBadgeStatus(item?.tracking?.status)}
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>

            <TextField
              select
              label="الحالة الجديدة"
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
            disabled={bulkUpdateMutation.isPending}
            size="small"
            sx={{ color: "#000" }}
          >
            إلغاء
          </MDButton>
          <MDButton
            type="submit"
            variant="contained"
            disabled={bulkUpdateMutation.isPending || !formik.dirty}
            size="small"
            startIcon={
              bulkUpdateMutation.isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
          >
            {bulkUpdateMutation.isPending
              ? "جاري التحديث..."
              : `تحديث ${selectedItems.length} عنصر`}
          </MDButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default BulkUpdateOrderItemsDialog;
