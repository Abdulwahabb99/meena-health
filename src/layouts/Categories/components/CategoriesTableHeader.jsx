import { Box, Button } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import React from "react";
import { useHasPermission } from "shared/hooks/useHasPermission";

function CategoriesTableHeader({
  search,
  setSearch,
  onSearchChange,
  addCategory,
}) {
  const CAN_ADD_CATEGORY = useHasPermission("categories.create");
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
      {CAN_ADD_CATEGORY && (
        <Box>
          {" "}
          <Button
            variant="contained"
            sx={{ color: "#FFF" }}
            onClick={() => addCategory.onOpen()}
          >
            إضافة تصنيف
          </Button>
        </Box>
      )}
    </MDBox>
  );
}

export default CategoriesTableHeader;
