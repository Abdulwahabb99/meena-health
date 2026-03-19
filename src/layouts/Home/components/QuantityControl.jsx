import { Box, IconButton } from "@mui/material";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function QuantityControl({ quantity, onIncrease, onDecrease, min = 1 }) {
  const canDecrease = quantity > min;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
      }}
    >
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={!canDecrease}
        sx={{
          width: 32,
          height: 32,
          bgcolor: "grey.200",
          "&:hover": { bgcolor: "grey.300" },
          "&.Mui-disabled": { bgcolor: "grey.100", color: "grey.400" },
        }}
      >
        −
      </IconButton>
      <MDTypography variant="button" fontWeight="bold" sx={{ minWidth: 24, textAlign: "center" }}>
        {quantity}
      </MDTypography>
      <IconButton
        size="small"
        onClick={onIncrease}
        sx={{
          width: 32,
          height: 32,
          bgcolor: "grey.200",
          "&:hover": { bgcolor: "grey.300" },
        }}
      >
        +
      </IconButton>
    </Box>
  );
}

QuantityControl.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  min: PropTypes.number,
};

export default QuantityControl;
