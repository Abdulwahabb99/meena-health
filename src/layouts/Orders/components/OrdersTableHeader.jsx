import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import React from "react";

function OrdersTableHeader({ search, setSearch, onSearchChange }) {
  return (
    <MDBox
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      p={3}
    >
      <MDBox width="12rem">
        <MDInput
          placeholder="Search..."
          value={search}
          size="small"
          fullWidth
          onChange={({ currentTarget }) => {
            setSearch(currentTarget.value);
            onSearchChange(currentTarget.value);
          }}
        />
      </MDBox>
    </MDBox>
  );
}

export default OrdersTableHeader;
