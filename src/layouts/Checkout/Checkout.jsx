import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import CartFooterBar from "components/CartFooterBar";
import MedicationOrderList from "components/MedicationOrderList";
import { useCart } from "shared/context/CartContext";
import { useAuth } from "shared/hooks/useAuth";

import { formatPriceWithCurrency } from "utils/formatPrice";

function Checkout() {
  const { t } = useTranslate();
  const { isRTL, locale } = useLocales();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { medications, totalItems, totalPrice, clearCart } = useCart();

  const customer = {
    name: user?.name || "محمد عبدالله العتيبي",
    email: user?.email || "user@meenahealth.com",
    phone: user?.phone || "+966 50 123 4567",
    address: user?.address || "الرياض، شارع الملك فهد، حي العليا، مبنى 123",
  };
  const handlePay = () => {
    clearCart();
    // TODO: Integrate with real payment gateway
    alert(t("checkout.successMessage"));
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  if (medications.length === 0) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox
          sx={{
            p: { xs: 1.5, sm: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}
        >
          <MDTypography variant="h5" color="text.secondary" mb={2}>
            {t("checkout.emptyCart")}
          </MDTypography>
          <MDButton variant="gradient" color="primary" onClick={handleBack}>
            {t("checkout.backToHome")}
          </MDButton>
        </MDBox>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 120px)",
          p: { xs: 1.5, sm: 2, md: 3 },
          pb: { xs: 16, sm: 20 },
        }}
      >
        <MDBox
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
            cursor: "pointer",
            width: "fit-content",
            "&:hover": { opacity: 0.8 },
          }}
          onClick={handleBack}
        >
          <Icon sx={{ fontSize: 24 }}>
            {isRTL ? "arrow_forward" : "arrow_back"}
          </Icon>
          <MDTypography variant="body1" fontWeight="medium" color="dark">
            {t("checkout.backToHome")}
          </MDTypography>
        </MDBox>

        <MDTypography
          variant="h4"
          fontWeight="bold"
          color="dark"
          mb={3}
          sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
        >
          {t("checkout.title")}
        </MDTypography>

        <MDBox
          sx={{
            mb: 3,
            borderRadius: 2,
            bgcolor: "white",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid",
            borderColor: "grey.200",
            overflow: "hidden",
          }}
        >
          <MDBox
            sx={{
              p: { xs: 2, sm: 3 },
              borderBottom: 1,
              borderColor: "grey.200",
              bgcolor: "grey.50",
            }}
          >
            <MDTypography
              variant="h6"
              fontWeight="bold"
              color="dark"
              sx={{ fontSize: "1rem" }}
            >
              {t("checkout.customerInfo")}
            </MDTypography>
            <MDTypography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 0.25 }}
            >
              {t("checkout.customerInfoSubtitle")}
            </MDTypography>
          </MDBox>
          <MDBox
            sx={{
              p: { xs: 2, sm: 3 },
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 2,
            }}
          >
            <Box>
              <MDTypography
                variant="caption"
                color="text.secondary"
                fontWeight="bold"
                sx={{ display: "block", mb: 0.5, fontSize: "0.8rem" }}
              >
                {t("checkout.customerName")}
              </MDTypography>
              <MDTypography
                variant="body2"
                fontWeight={500}
                color="dark"
                sx={{ fontSize: "0.8125rem" }}
              >
                {customer.name}
              </MDTypography>
            </Box>
            <Box>
              <MDTypography
                variant="caption"
                color="text.secondary"
                fontWeight="bold"
                sx={{ display: "block", mb: 0.5, fontSize: "0.8rem" }}
              >
                {t("checkout.customerEmail")}
              </MDTypography>
              <MDTypography
                variant="body2"
                fontWeight={500}
                color="dark"
                sx={{ fontSize: "0.8125rem" }}
              >
                {customer.email}
              </MDTypography>
            </Box>
            <Box>
              <MDTypography
                variant="caption"
                color="text.secondary"
                fontWeight="bold"
                sx={{ display: "block", mb: 0.5, fontSize: "0.8rem" }}
              >
                {t("checkout.customerPhone")}
              </MDTypography>
              <MDTypography
                variant="body2"
                fontWeight={500}
                color="dark"
                sx={{ fontSize: "0.8125rem" }}
              >
                {customer.phone}
              </MDTypography>
            </Box>
            <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1", md: "1 / -1" } }}>
              <MDTypography
                variant="caption"
                color="text.secondary"
                fontWeight="bold"
                sx={{ display: "block", mb: 0.5, fontSize: "0.8rem" }}
              >
                {t("checkout.customerAddress")}
              </MDTypography>
              <MDTypography
                variant="body2"
                fontWeight={500}
                color="dark"
                sx={{ fontSize: "0.8125rem" }}
              >
                {customer.address}
              </MDTypography>
            </Box>
          </MDBox>
        </MDBox>

        <MDBox
          sx={{
            flex: 1,
            borderRadius: 2,
            bgcolor: "white",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid",
            borderColor: "grey.200",
            overflow: "hidden",
            mb: 2,
          }}
        >
          <MDBox
            sx={{
              p: { xs: 2, sm: 3 },
              borderBottom: 1,
              borderColor: "grey.200",
            }}
          >
            <MDTypography variant="h6" fontWeight="bold" color="dark">
              {t("checkout.orderSummary")}
            </MDTypography>
            <MDTypography variant="body2" color="text.secondary">
              {totalItems} {t("checkout.items")}
            </MDTypography>
          </MDBox>

          <MedicationOrderList medications={medications} maxHeight={400} />
        </MDBox>

        <CartFooterBar
          summaryText={`${t("checkout.total")}: ${totalItems} ${t("checkout.items")}`}
          totalPriceText={formatPriceWithCurrency(totalPrice, locale)}
          actionLabel={t("checkout.payNow")}
          onAction={handlePay}
        />
      </MDBox>
    </DashboardLayout>
  );
}

export default Checkout;
