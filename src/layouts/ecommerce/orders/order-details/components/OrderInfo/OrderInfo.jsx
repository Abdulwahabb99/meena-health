import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import SAR from "assets/images/SAR.svg";
import { Box, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getOrderBadgeStatus } from "layouts/Orders/utils/constants";
import { useDisclosure } from "shared/hooks/useDisclosure";
import UpdateOrderItemDialog from "./UpdateOrderItemDialog";
import BulkUpdateOrderItemsDialog from "./BulkUpdateOrderItemsDialog";

function OrderInfo({ orderItems, orderId }) {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const updateOrderItem = useDisclosure();
  const bulkUpdateOrderItems = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelect = (itemId) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === orderItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(orderItems.map((item, index) => index)));
    }
  };

  const handleBulkEdit = () => {
    const selectedOrderItems = orderItems.filter((_, index) =>
      selectedItems.has(index)
    );
    bulkUpdateOrderItems.onOpen();
  };

  const handleEditItem = (item, event) => {
    event.stopPropagation();
    setSelectedItem(item);
    updateOrderItem.onOpen();
  };

  const selectedCount = selectedItems.size;
  const isAllSelected =
    selectedCount === orderItems.length && orderItems.length > 0;

  return (
    <MDBox>
      {orderItems.length > 1 && (
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={isAllSelected}
                indeterminate={selectedCount > 0 && !isAllSelected}
                onChange={handleSelectAll}
                color="primary"
              />
            }
            label={
              <MDTypography variant="button" fontWeight="medium">
                {isAllSelected ? "إلغاء تحديد الكل" : "تحديد الكل"}
              </MDTypography>
            }
          />

          {selectedCount > 1 && (
            <MDButton
              variant="contained"
              color="info"
              size="small"
              startIcon={<EditIcon />}
              onClick={handleBulkEdit}
              sx={{ minWidth: 120 }}
            >
              تعديل جماعي ({selectedCount})
            </MDButton>
          )}
        </MDBox>
      )}
      <Grid container spacing={3} alignItems="center">
        {orderItems.map((item, index) => {
          const isSelected = selectedItems.has(index);
          const orderStatus = getOrderBadgeStatus(item?.tracking?.status);

          return (
            <Grid item xs={12} md={6} p={1} key={index}>
              <MDBox
                display="flex"
                alignItems="center"
                sx={{
                  minHeight: "127px",
                  p: 2,
                  borderRadius: 2,
                  border: isSelected
                    ? "2px solid #1976d2"
                    : "1px solid #e0e0e0",
                  backgroundColor: isSelected ? "#f3f8ff" : "transparent",
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: isSelected ? "#1976d2" : "#bdbdbd",
                    backgroundColor: isSelected ? "#f3f8ff" : "#fafafa",
                  },
                }}
                onClick={() =>
                  orderItems.length > 1 ? handleItemSelect(index) : undefined
                }
              >
                <MDBox mr={2}>
                  <img
                    src={item?.product?.images[0].url}
                    alt={"ريال"}
                    width={70}
                    height={70}
                    crossOrigin="anonymous"
                    loading="lazy"
                    style={{ borderRadius: "50%" }}
                  />
                </MDBox>
                <MDBox lineHeight={1} flex={1}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={1}
                  >
                    <Box>
                      {" "}
                      <MDTypography variant="h6" fontWeight="medium">
                        {item?.product?.nameAr}
                      </MDTypography>
                      <Box
                        mb={2}
                        sx={{ display: "flex", alignItems: "center", gap: 0 }}
                      >
                        <MDTypography variant="button" color="text">
                          <span
                            style={{
                              fontWeight: 500,
                              color: "#000",
                            }}
                          >
                            السعر
                          </span>{" "}
                          :
                        </MDTypography>
                        <MDTypography variant="button" color="text">
                          {Number(item?.product?.price).toFixed(2)}
                        </MDTypography>
                        <img
                          src={SAR}
                          alt={"ريال"}
                          width={20}
                          height={20}
                          crossOrigin="anonymous"
                          loading="lazy"
                          style={{ marginBottom: 3 }}
                        />
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      flexDirection="column"
                      mt={1}
                    >
                      {orderStatus}

                      <IconButton
                        size="small"
                        onClick={(event) => handleEditItem(item, event)}
                        sx={{
                          color: "info.main",
                          "&:hover": {
                            color: "info.dark",
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </MDBox>
              </MDBox>
            </Grid>
          );
        })}
      </Grid>
      <UpdateOrderItemDialog
        open={updateOrderItem.open}
        onClose={updateOrderItem.onClose}
        item={selectedItem}
        orderId={orderId}
      />
      
      <BulkUpdateOrderItemsDialog
        open={bulkUpdateOrderItems.open}
        onClose={bulkUpdateOrderItems.onClose}
        selectedItems={orderItems.filter((_, index) => selectedItems.has(index))}
        setSelectedItems={setSelectedItems}
        orderId={orderId}
      />
    </MDBox>
  );
}

export default OrderInfo;
