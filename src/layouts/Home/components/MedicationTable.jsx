import { useMemo } from "react";
import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import QuantityControl from "./QuantityControl";
import PropTypes from "prop-types";

function MedicationTable({
  medications,
  onUpdateQuantity,
  onRemove,
  emptyMessage,
  columns,
  isRTL,
}) {
  const table = useMemo(() => {
    const cols = [
      {
        Header: columns.drugCode,
        accessor: "code",
        width: "20%",
        align: "left",
        Cell: ({ value }) => (
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
            {value}
          </Box>
        ),
      },
      {
        Header: columns.drugName,
        accessor: "name",
        width: "35%",
        align: "left",
        Cell: ({ value }) => (
          <MDTypography variant="body2" color="dark">
            {value}
          </MDTypography>
        ),
      },
      {
        Header: columns.quantity,
        accessor: "quantity",
        width: "25%",
        align: "center",
        Cell: ({ value, row }) => (
          <QuantityControl
            quantity={value}
            onIncrease={() => onUpdateQuantity(row.original._index, value + 1)}
            onDecrease={() =>
              onUpdateQuantity(row.original._index, Math.max(1, value - 1))
            }
          />
        ),
      },
      {
        Header: columns.actions,
        accessor: "actions",
        width: "20%",
        align: "right",
        Cell: ({ row }) => (
          <IconButton
            size="small"
            onClick={() => onRemove(row.original._index)}
            sx={{ color: "error.main" }}
            aria-label="delete"
          >
            <Icon fontSize="small">delete</Icon>
          </IconButton>
        ),
      },
    ];

    const rows = medications.map((m, index) => ({
      ...m,
      _index: index,
    }));

    return { columns: cols, rows };
  }, [medications, columns, onUpdateQuantity, onRemove]);

  if (medications.length === 0) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <MDTypography variant="body1" color="text.secondary">
          {emptyMessage}
        </MDTypography>
      </Box>
    );
  }

  return (
    <DataTable
      table={table}
      canSearch={false}
      showTotalEntries={true}
      entriesPerPage={{ defaultValue: 10, entries: [5, 10, 15, 20, 25] }}
      isSorted={false}
      isRTL={isRTL}
      pagination={{ variant: "gradient", color: "info" }}
    />
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
