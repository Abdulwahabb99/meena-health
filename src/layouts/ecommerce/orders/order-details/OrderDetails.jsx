import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Header from "layouts/ecommerce/orders/order-details/components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
// import { useFetchOrderDetails } from "services/queries/Orders/useFetchOrderDetails";
import OrderDetailsSkeleton from "./components/OrderDetailsSkeleton/OrderDetailsSkeleton";
import OrderInfo from "./components/OrderInfo/OrderInfo";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import CustomerInformation from "./components/CustomerInformation/CustomerInformation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/material";
import InstallmentsTrack from "./components/InstallmentsTrack/InstallmentsTrack";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { data: orderDetail, isLoading } = useFetchOrderDetails(id);
  const isLoading = false;

  const order = {
    id,
    orderNumber: "ORD-001",
    status: "PENDING",
    createdAt: "2025-12-01T10:30:00",
    totalAmount: 1500,
    deliveryFee: 50,
    installationFee: 100,
    taxAmount: 225,
    paymentMethod: "CREDIT_CARD",
    deliveryAddress: "الرياض - حي النخيل",
    notes: "",
    user: { fullName: "أحمد محمد", email: "ahmed@example.com", phoneNumber: "0501234567" },
    orderItems: [
      { id: 1, product: { nameAr: "منتج تجريبي 1", price: 750 }, quantity: 1, tracking: { status: "PENDING" } },
      { id: 2, product: { nameAr: "منتج تجريبي 2", price: 750 }, quantity: 1, tracking: { status: "PENDING" } },
    ],
    installmentPlan: null,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? (
        <OrderDetailsSkeleton />
      ) : (
        <Grid container spacing={3} justifyContent="center" my={3}>
          <Grid item xs={12} lg={10}>
            <Box
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
              onClick={() => navigate("/orders")}
            >
              {" "}
              <ChevronRightIcon
                sx={{
                  width: 30,
                  height: 30,
                  color: "#090E2D",
                  cursor: "pointer",
                }}
              />
            </Box>
            <Card>
              <MDBox pt={2} px={2}>
                <Header order={order} />
              </MDBox>
              <Divider />
              <MDBox pt={1} pb={3} px={2}>
                <MDBox mb={3}>
                  <OrderInfo orderItems={order?.orderItems} orderId={id} />
                </MDBox>
                <Divider />
                <MDBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={5}>
                      <InstallmentsTrack
                        installmentPlan={order?.installmentPlan}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                      <CustomerInformation
                        customer={{
                          ...order?.user,
                          address: order?.deliveryAddress,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} lg={3} sx={{ mr: "auto" }}>
                      <OrderSummary order={order} />
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      )}
    </DashboardLayout>
  );
}

export default OrderDetails;
