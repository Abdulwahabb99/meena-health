import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Box } from "@mui/material";

function OrderSummary({ order }) {
  const productsPrice = Number(
    order?.orderItems?.reduce(
      (total, item) => total + (item.product?.price || 0),
      0
    ) || 0
  ).toFixed(2);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {" "}
      <MDBox mb={2}>
        <MDTypography variant="h6" fontWeight="medium">
          ملخص الطلب
        </MDTypography>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mb={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          سعر المنتجات:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body2" fontWeight="medium">
            {Number(order?.subtotal)?.toFixed(2)}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mb={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          رسوم التوصيل:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body2" fontWeight="medium">
            {Number(order?.deliveryFee)?.toFixed(2)}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mb={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          الضرائب:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body2" fontWeight="medium">
            {Number(order?.taxAmount)?.toFixed(2)}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mb={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          رسوم التركيب:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body2" fontWeight="medium">
            {Number(order?.installationFee)?.toFixed(2)}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" justifyContent="space-between" mt={3}>
        <MDTypography variant="body1" fontWeight="light" color="text">
          الإجمالي:
        </MDTypography>
        <MDBox ml={1}>
          <MDTypography variant="body1" fontWeight="medium">
            {Number(order?.totalAmount).toFixed(2)}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Box>
  );
}

export default OrderSummary;
