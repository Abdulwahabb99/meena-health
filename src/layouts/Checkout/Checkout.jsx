import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import useTranslate from "shared/hooks/useTranslate";
import useLocales from "shared/hooks/useLocales";
import { useMaterialUIController } from "context";
import { useCart } from "shared/context/CartContext";

const formatPrice = (amount) =>
  amount != null ? `${Number(amount).toFixed(2)} ر.س` : "0.00 ر.س";

function Checkout() {
  const { t } = useTranslate();
  const { isRTL } = useLocales();
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { medications, totalItems, totalPrice, clearCart } = useCart();
  const sidenavMargin = miniSidenav ? 73 : 240;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

          <MDBox sx={{ maxHeight: 400, overflowY: "auto" }}>
            {isMobile ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  gap: 1.5,
                }}
              >
                {medications.map((m, index) => (
                  <Box
                    key={`${m.code}-${index}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "grey.50",
                      border: "1px solid",
                      borderColor: "grey.200",
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        component="span"
                        sx={{
                          display: "inline-block",
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          bgcolor: "#F0E8FF",
                          color: "primary.main",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          mb: 0.5,
                        }}
                      >
                        {m.code}
                      </Box>
                      <MDTypography
                        variant="body2"
                        color="dark"
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.name}
                      </MDTypography>
                      <MDTypography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.25 }}>
                        {formatPrice(m.price)} × {m.quantity} = {formatPrice((m.price || 0) * m.quantity)}
                      </MDTypography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <MDBox sx={{ overflowX: "auto" }}>
                <Box
                  component="table"
                  sx={{
                    width: "100%",
                    borderCollapse: "collapse",
                    "& th, & td": {
                      py: 2,
                      px: 3,
                      borderBottom: "1px solid",
                      borderColor: "grey.200",
                      textAlign: isRTL ? "right" : "left",
                    },
                    "& th": {
                      fontWeight: 600,
                      color: "text.secondary",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                    },
                  }}
                >
                  <thead>
                    <tr>
                      <th>{t("home.drugCode")}</th>
                      <th>{t("home.drugName")}</th>
                      <th style={{ textAlign: "center" }}>{t("home.quantity")}</th>
                      <th style={{ textAlign: isRTL ? "left" : "right" }}>{t("home.price")}</th>
                      <th style={{ textAlign: isRTL ? "left" : "right" }}>{t("home.subtotal")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medications.map((m, index) => (
                      <tr key={`${m.code}-${index}`}>
                        <td>
                          <Box
                            component="span"
                            sx={{
                              display: "inline-block",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 10,
                              bgcolor: "#F0E8FF",
                              color: "primary.main",
                              fontSize: "0.875rem",
                              fontWeight: 500,
                            }}
                          >
                            {m.code}
                          </Box>
                        </td>
                        <td>
                          <MDTypography variant="body2" color="dark">
                            {m.name}
                          </MDTypography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <MDTypography variant="body2" fontWeight="bold" color="dark">
                            {m.quantity}
                          </MDTypography>
                        </td>
                        <td style={{ textAlign: isRTL ? "left" : "right" }}>
                          <MDTypography variant="body2" color="dark">
                            {formatPrice(m.price)}
                          </MDTypography>
                        </td>
                        <td style={{ textAlign: isRTL ? "left" : "right" }}>
                          <MDTypography variant="body2" fontWeight="bold" color="primary.main">
                            {formatPrice((m.price || 0) * m.quantity)}
                          </MDTypography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Box>
              </MDBox>
            )}
          </MDBox>
        </MDBox>

        <Box
          sx={({ breakpoints, functions: { pxToRem } }) => ({
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            [breakpoints.up("xl")]: {
              ...(isRTL
                ? { right: pxToRem(sidenavMargin) }
                : { left: pxToRem(sidenavMargin) }),
            },
            display: "flex",
            flexDirection: isRTL ? "row-reverse" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 1.5, sm: 2 },
            bgcolor: "white",
            boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
            borderTop: "1px solid",
            borderColor: "grey.200",
            zIndex: 1200,
          })}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "flex-start", sm: "center" }, gap: 0.25 }}>
            <MDTypography
              variant="body1"
              fontWeight="bold"
              color="dark"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              {t("checkout.total")}: {totalItems} {t("checkout.items")}
            </MDTypography>
            <MDTypography
              variant="h6"
              fontWeight="bold"
              color="primary.main"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              {formatPrice(totalPrice)}
            </MDTypography>
          </Box>
          <MDButton
            variant="gradient"
            color="primary"
            onClick={handlePay}
            sx={{
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              py: { xs: 1.25, sm: 1.5 },
              fontSize: { xs: "0.875rem", sm: "1rem" },
              fontWeight: 600,
              flexShrink: 0,
              minWidth: { xs: 120, sm: 180 },
            }}
          >
            {t("checkout.payNow")}
          </MDButton>
        </Box>
      </MDBox>
    </DashboardLayout>
  );
}

export default Checkout;
