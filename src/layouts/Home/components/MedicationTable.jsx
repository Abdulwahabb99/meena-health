import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";
import QuantityControl from "./QuantityControl";
import PropTypes from "prop-types";

function MedicationTable({ medications, onUpdateQuantity, onRemove, emptyMessage, columns, isRTL }) {
  if (medications.length === 0) {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: "center",
        }}
      >
        <MDTypography variant="body1" color="text.secondary">
          {emptyMessage}
        </MDTypography>
      </Box>
    );
  }

  return (
    <TableContainer sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 500 }} dir={isRTL ? "rtl" : "ltr"}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: "dark.main", borderBottom: 2 }}>
              {columns.drugCode}
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "dark.main", borderBottom: 2 }}>
              {columns.drugName}
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: "dark.main", borderBottom: 2, textAlign: "center" }}>
              {columns.quantity}
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                color: "dark.main",
                borderBottom: 2,
                textAlign: isRTL ? "left" : "right",
              }}
            >
              {columns.actions}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medications.map((item, index) => (
            <TableRow key={`${item.code}-${index}`} sx={{ "&:last-child td": { borderBottom: 0 } }}>
              <TableCell>
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
                  {item.code}
                </Box>
              </TableCell>
              <TableCell>
                <MDTypography variant="body2" color="dark">
                  {item.name}
                </MDTypography>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <QuantityControl
                  quantity={item.quantity}
                  onIncrease={() => onUpdateQuantity(index, item.quantity + 1)}
                  onDecrease={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                />
              </TableCell>
              <TableCell sx={{ textAlign: isRTL ? "left" : "right" }}>
                <IconButton
                  size="small"
                  onClick={() => onRemove(index)}
                  sx={{ color: "error.main" }}
                  aria-label="delete"
                >
                  <Icon fontSize="small">delete</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MedicationTable.propTypes = {
  medications: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  columns: PropTypes.shape({
    drugCode: PropTypes.string.isRequired,
    drugName: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    actions: PropTypes.string.isRequired,
  }).isRequired,
  isRTL: PropTypes.bool,
};

export default MedicationTable;
