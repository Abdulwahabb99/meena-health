import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function CheckoutBar({ itemCount, onCheckout, itemsLabel, checkoutLabel, isRTL }) {
  const disabled = itemCount === 0;

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: isRTL ? "row-reverse" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        py: 2,
        bgcolor: "white",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
        borderTop: "1px solid",
        borderColor: "grey.200",
        zIndex: 10,
      }}
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
  isRTL: PropTypes.bool,
};

export default CheckoutBar;
