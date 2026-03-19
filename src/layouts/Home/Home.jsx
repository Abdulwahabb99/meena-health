import { useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import { getDrugByCode } from "services/drugApi";
import MedicationInput from "./components/MedicationInput";
import MedicationTable from "./components/MedicationTable";
import CheckoutBar from "./components/CheckoutBar";

function Home() {
  const theme = useTheme();
  const meena = theme.palette?.meena || {};
  const { t } = useTranslate();
  const { isRTL } = useLocales();

  const [medications, setMedications] = useState([]);

  const handleAddMedication = useCallback(async (code) => {
    const drug = await getDrugByCode(code);
    if (!drug) {
      return { success: false, error: t("home.errors.notFound") };
    }

    setMedications((prev) => {
      const existing = prev.findIndex((m) => m.code === drug.code);
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = {
          ...next[existing],
          quantity: next[existing].quantity + 1,
        };
        return next;
      }
      return [...prev, { code: drug.code, name: drug.name, quantity: 1 }];
    });
    return { success: true };
  }, [t]);

  const handleUpdateQuantity = useCallback((index, newQuantity) => {
    setMedications((prev) => {
      const next = [...prev];
      if (index >= 0 && index < next.length) {
        next[index] = { ...next[index], quantity: Math.max(1, newQuantity) };
      }
      return next;
    });
  }, []);

  const handleRemove = useCallback((index) => {
    setMedications((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleCheckout = useCallback(() => {
    if (medications.length === 0) return;
    // TODO: Navigate to checkout or open modal
    alert(`Checkout with ${medications.reduce((sum, m) => sum + m.quantity, 0)} items`);
  }, [medications]);

  const totalItems = medications.reduce((sum, m) => sum + m.quantity, 0);
  const cardStyle = {
    p: 3,
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
          p: 3,
          pb: 20,
        }}
      >
        <MDBox
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          <MDTypography variant="h4" fontWeight="bold" color="dark" mb={3}>
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
            <MDBox sx={{ borderTop: 1, borderColor: "grey.200", mt: 3, pt: 3 }}>
              <MedicationTable
                medications={medications}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
                emptyMessage={t("home.emptyMessage")}
                columns={{
                  drugCode: t("home.drugCode"),
                  drugName: t("home.drugName"),
                  quantity: t("home.quantity"),
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
        onCheckout={handleCheckout}
        itemsLabel={t("home.itemsInCart")}
        checkoutLabel={t("home.proceedToCheckout")}
      />
    </DashboardLayout>
  );
}

export default Home;
