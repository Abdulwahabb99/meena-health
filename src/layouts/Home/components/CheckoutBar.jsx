import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import { useMaterialUIController } from "context";
import useLocales from "shared/hooks/useLocales";

function CheckoutBar({ itemCount, onCheckout, itemsLabel, checkoutLabel }) {
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
        px: 8,
        py: 2,
        bgcolor: "#FFFF",
        borderTop: "1px solid",
        borderColor: "grey.200",
        zIndex: 1200,
      })}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Icon
          sx={{
            fontSize: 24,
            color: disabled ? "grey.400" : "primary.main",
          }}
        >
          shopping_cart
        </Icon>
        <MDTypography variant="body1" color={disabled ? "text.secondary" : "dark"}>
          {itemCount} {itemsLabel}
        </MDTypography>
      </Box>
      <MDButton
        variant="gradient"
        color="primary"
        disabled={disabled}
        onClick={onCheckout}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: 600,
          flexShrink: 0,
          minWidth: 180,
        }}
      >
        {checkoutLabel}
      </MDButton>
    </Box>
  );
}

CheckoutBar.propTypes = {
  itemCount: PropTypes.number.isRequired,
  onCheckout: PropTypes.func.isRequired,
  itemsLabel: PropTypes.string.isRequired,
  checkoutLabel: PropTypes.string.isRequired,
};

export default CheckoutBar;
