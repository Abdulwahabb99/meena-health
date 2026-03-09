import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { getOrderBadgeStatus } from "layouts/Orders/utils/constants";
import { getPaymentMethod } from "constants/constants";

function Header({ order }) {
  const orderStatus = getOrderBadgeStatus(order?.status);

  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    return new Intl.DateTimeFormat("ar-eg", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <MDBox display="flex" justifyContent="space-between" alignItems="center">
      <MDBox>
        <MDBox mb={1}>
          <MDTypography variant="h6" fontWeight="medium">
            تفاصيل الطلب
          </MDTypography>
        </MDBox>
        <MDTypography component="p" variant="button" color="text">
          رقم الطلب: <b>{order?.orderNumber}</b>
        </MDTypography>
        <MDTypography
          component="p"
          variant="caption"
          color="text"
          sx={{ mt: 0.5 }}
        >
          تاريخ الطلب: <b>{formatDate(order?.createdAt)}</b>
        </MDTypography>
        <MDTypography
          component="p"
          variant="caption"
          color="text"
          sx={{ mt: 0.5 }}
        >
          وسيلة الدفع: <b>{getPaymentMethod(order?.paymentMethod)}</b>
        </MDTypography>
      </MDBox>
      {orderStatus}
    </MDBox>
  );
}

export default Header;
