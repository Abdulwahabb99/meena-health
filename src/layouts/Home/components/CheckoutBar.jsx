import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import useLocales from "shared/hooks/useLocales";

const formatPrice = (amount) =>
  amount != null ? `${Number(amount).toFixed(2)} ر.س` : "0.00 ر.س";

function CheckoutBar({ itemCount, totalPrice = 0, onCheckout, itemsLabel, checkoutLabel }) {
  const [controller] = useMaterialUIController();
  const { miniSidenav } = controller;
  const { isRTL } = useLocales();
  const disabled = itemCount === 0;
  const sidenavMargin = miniSidenav ? 73 : 240;

  return (
    <Box
      sx={({ breakpoints, functions: { pxToRem } }) => ({
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        [breakpoints.up("xl")]: {
          ...(isRTL ? { right: pxToRem(sidenavMargin) } : { left: pxToRem(sidenavMargin) }),
        },
        display: "flex",
        flexDirection: isRTL ? "row-reverse" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 1.5, sm: 2 },
        bgcolor: "#FFFF",
        borderTop: "1px solid",
        borderColor: "grey.200",
        zIndex: 1200,
      })}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "flex-start", sm: "center" }, gap: 0.25 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Icon
            sx={{
              fontSize: 24,
              color: disabled ? "grey.400" : "primary.main",
            }}
          >
            shopping_cart
          </Icon>
          <MDTypography
            variant="body1"
            color={disabled ? "text.secondary" : "dark"}
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {itemCount} {itemsLabel}
          </MDTypography>
        </Box>
        <MDTypography
          variant="body2"
          color="primary.main"
          fontWeight="bold"
          sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
        >
          {formatPrice(totalPrice)}
        </MDTypography>
      </Box>
      <MDButton
        variant="gradient"
        color="primary"
        disabled={disabled}
        onClick={onCheckout}
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
        {checkoutLabel}
      </MDButton>
    </Box>
  );
}

CheckoutBar.propTypes = {
  itemCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number,
  onCheckout: PropTypes.func.isRequired,
  itemsLabel: PropTypes.string.isRequired,
  checkoutLabel: PropTypes.string.isRequired,
};

export default CheckoutBar;
