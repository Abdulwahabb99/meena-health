import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import { getDrugByCode } from "services/drugApi";
import { useCart } from "shared/context/CartContext";
import MedicationInput from "./components/MedicationInput";
import MedicationTable from "./components/MedicationTable";
import CheckoutBar from "./components/CheckoutBar";

function Home() {
  const theme = useTheme();
  const meena = theme.palette?.meena || {};
  const { t } = useTranslate();
  const { isRTL } = useLocales();
  const navigate = useNavigate();
  const {
    medications,
    addMedication,
    updateQuantity,
    removeMedication,
    totalItems,
    totalPrice,
  } = useCart();

  const handleAddMedication = useCallback(
    async (code) => {
      const drug = await getDrugByCode(code);
      if (!drug) {
        return { success: false, error: t("home.errors.notFound") };
      }
      addMedication(drug);
      return { success: true };
    },
    [t, addMedication]
  );

  const handleUpdateQuantity = useCallback(
    (index, newQuantity) => {
      updateQuantity(index, newQuantity);
    },
    [updateQuantity]
  );

  const handleRemove = useCallback(
    (index) => {
      removeMedication(index);
    },
    [removeMedication]
  );

  const handleCheckout = useCallback(() => {
    if (medications.length === 0) return;
    navigate("/checkout");
  }, [medications.length, navigate]);

  const cardStyle = {
    p: { xs: 2, sm: 3 },
    borderRadius: 2,
    bgcolor: "white",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: `1px solid ${meena.border || "rgba(140, 86, 255, 0.08)"}`,
  };

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
          }}
        >
          <MDTypography
            variant="h4"
            fontWeight="bold"
            color="dark"
            mb={{ xs: 2, sm: 3 }}
            sx={{ fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" } }}
          >
            {t("home.title")}
          </MDTypography>

          <MDBox sx={{ ...cardStyle }}>
            <MedicationInput
              onAdd={handleAddMedication}
              title={t("home.heroTitle")}
              description={t("home.heroDescription")}
              placeholder={t("home.drugCodePlaceholder")}
              addLabel={t("home.addButton")}
              helperText={t("home.helperText")}
              isRTL={isRTL}
              errorMessages={{
                required: t("home.errors.required"),
                invalid: t("home.errors.invalid"),
                notFound: t("home.errors.notFound"),
              }}
            />
            <MDBox sx={{ borderTop: 1, borderColor: "grey.200", mt: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 3 } }}>
              <MedicationTable
                medications={medications}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
                emptyMessage={t("home.emptyMessage")}
                columns={{
                  drugCode: t("home.drugCode"),
                  drugName: t("home.drugName"),
                  quantity: t("home.quantity"),
                  price: t("home.price"),
                  subtotal: t("home.subtotal"),
                  actions: t("home.actions"),
                }}
                isRTL={isRTL}
              />
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>

      <CheckoutBar
        itemCount={totalItems}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
        itemsLabel={t("home.itemsInCart")}
        checkoutLabel={t("home.proceedToCheckout")}
      />
    </DashboardLayout>
  );
}

export default Home;
