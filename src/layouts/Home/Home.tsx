import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { toast } from "react-toastify";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import { useCart } from "shared/context/CartContext";
import ItemSearchInput from "./components/ItemSearchInput";
import MedicationTable from "./components/MedicationTable";
import CartFooterBar from "components/CartFooterBar";
import OrderStepper from "components/OrderStepper/OrderStepper";
import MDButton from "components/MDButton";
import { formatPriceWithCurrency } from "utils/formatPrice";
import { useItemsQuery } from "services/queries/items/useItemsQuery";
import type { CatalogItem } from "services/api/itemsApi";

function Home() {
  const theme = useTheme();
  const meena = theme.palette?.meena || {};
  const { t } = useTranslate();
  const { isRTL, locale } = useLocales();
  const navigate = useNavigate();
  const {
    medications,
    customerDetails,
    addMedication,
    updateQuantity,
    removeMedication,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const { data: items = [], isLoading, isError, error } = useItemsQuery();
  const [isBackDialogOpen, setIsBackDialogOpen] = useState(false);

  useEffect(() => {
    if (!isError || !error) return;
    const msg =
      error instanceof Error ? error.message : t("home.itemsLoadFailed");
    toast.error(msg);
  }, [isError, error, t]);

  const hasCustomerDetails = useMemo(() => {
    const d = customerDetails;
    return Boolean(
      d.firstName?.trim() &&
        d.lastName?.trim() &&
        d.phone?.trim() &&
        d.idNumber?.trim(),
    );
  }, [customerDetails]);

  useEffect(() => {
    if (hasCustomerDetails) return;
    navigate("/order/customer", { replace: true });
  }, [hasCustomerDetails, navigate]);

  const useVatPrice = !String(customerDetails.idNumber || "").startsWith("1");

  const effectiveItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        price: useVatPrice ? item.vatPrice : item.price,
      })),
    [items, useVatPrice],
  );

  const handleSelectItem = useCallback(
    (item: CatalogItem) => {
      addMedication({
        code: String(item.id),
        name: item.name,
        price: item.price,
        vatPrice: item.vatPrice,
      });
    },
    [addMedication],
  );

  const handleUpdateQuantity = useCallback(
    (index: number, newQuantity: number) => {
      updateQuantity(index, newQuantity);
    },
    [updateQuantity],
  );

  const handleRemove = useCallback(
    (index: number) => {
      removeMedication(index);
    },
    [removeMedication],
  );

  const handleContinueToCheckout = useCallback(() => {
    if (medications.length === 0) return;
    navigate("/checkout");
  }, [medications.length, navigate]);

  const handleBackToCustomerDetails = useCallback(() => {
    setIsBackDialogOpen(true);
  }, []);

  const handleCloseBackDialog = useCallback(() => {
    setIsBackDialogOpen(false);
  }, []);

  const handleConfirmBackToCustomerDetails = useCallback(() => {
    setIsBackDialogOpen(false);
    clearCart();
    navigate("/order/customer");
  }, [clearCart, navigate]);

  const cardStyle = {
    p: { xs: 2, sm: 3 },
    borderRadius: 2,
    bgcolor: "inherit",
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
          pb: { xs: 26, sm: 30 },
        }}
      >
        <MDBox
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            pb: { xs: 4, sm: 5 },
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
            <ItemSearchInput
              items={effectiveItems}
              loading={isLoading}
              title={t("home.heroTitle")}
              description={t("home.heroDescription")}
              placeholder={t("home.searchPlaceholder")}
              noResultsText={t("home.searchNoResults")}
              isRTL={isRTL}
              onSelectItem={handleSelectItem}
            />
            <MDBox
              sx={{
                borderTop: 1,
                borderColor: "grey.200",
                mt: { xs: 2, sm: 3 },
                pt: { xs: 2, sm: 3 },
              }}
            >
              <MedicationTable
                medications={medications}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
                emptyMessage={t("home.emptyMessage")}
                columns={{
                  drugCode: t("home.itemCode"),
                  drugName: t("home.itemName"),
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

        <CartFooterBar
          stepper={<OrderStepper activeStep={1} />}
          leftIcon="shopping_cart"
          summaryText={`${totalItems} ${t("home.itemsInCart")}`}
          totalPriceText={formatPriceWithCurrency(totalPrice, locale)}
          secondaryActionLabel={t("orderFlow.back")}
          onSecondaryAction={handleBackToCustomerDetails}
          actionLabel={t("orderFlow.continueToCheckout")}
          onAction={handleContinueToCheckout}
          disabled={totalItems === 0}
        />

        <Dialog
          open={isBackDialogOpen}
          onClose={handleCloseBackDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>{t("orderFlow.back")}</DialogTitle>
          <DialogContent>
            <MDTypography variant="body2" color="text">
              {t("orderFlow.backResetsCartConfirm")}
            </MDTypography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
            <MDButton
              variant="outlined"
              color="dark"
              onClick={handleCloseBackDialog}
            >
              {t("orderFlow.cancel")}
            </MDButton>
            <MDButton
              variant="gradient"
              color="error"
              onClick={handleConfirmBackToCustomerDetails}
            >
              {t("orderFlow.confirmResetAndBack")}
            </MDButton>
          </DialogActions>
        </Dialog>
      </MDBox>
    </DashboardLayout>
  );
}

export default Home;
