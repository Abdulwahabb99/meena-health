import { useNavigate } from "react-router-dom";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import CartFooterBar from "components/CartFooterBar";
import CustomerInfoCard from "components/CustomerInfoCard";
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
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            // Scrollable padding so content sits above the fixed footer with a clear gap
            pb: { xs: 4, sm: 5 },
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

          <CustomerInfoCard customer={customer} />

          <MDBox
            sx={{
              flex: 1,
              minHeight: 0,
              borderRadius: 2,
              bgcolor: "inherit",
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
                bgcolor: "grey.50",
              }}
            >
              <MDTypography
                variant="h6"
                fontWeight="bold"
                color="dark"
                sx={{ fontSize: "1rem" }}
              >
                {t("checkout.orderSummary")}
              </MDTypography>
              <MDTypography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 0.25 }}
              >
                {totalItems} {t("checkout.items")}
              </MDTypography>
            </MDBox>

            <MedicationOrderList medications={medications} maxHeight={400} />
          </MDBox>
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
