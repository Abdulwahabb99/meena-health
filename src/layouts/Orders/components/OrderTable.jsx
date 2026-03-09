import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAsyncDebounce } from "react-table";
// import { useFetchOrders } from "services/queries/Orders/useFetchOrders";
import { useDisclosure } from "shared/hooks/useDisclosure";
import { getOrderStatus } from "../utils/constants";
import CustomerCell from "layouts/ecommerce/orders/order-list/components/CustomerCell";
import OrdersTableHeader from "./OrdersTableHeader";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";
import TableWithServerPagination from "layouts/authentication/components/TableWithServerPagination/TableWithServerPagination";
import SAR from "assets/images/SAR.svg";
import { Icon } from "@mui/material";
import UpdateOrderDialog from "./UpdateOrderDialog";
import { useHasPermission } from "shared/hooks/useHasPermission";

const LIMIT_PAGE = 10;

const STATIC_ORDERS = [
  { id: 1, orderNumber: "ORD-001", createdAt: "2025-12-01T10:30:00", status: "pending", user: { fullName: "أحمد محمد", avatar: null }, totalAmount: 1500 },
  { id: 2, orderNumber: "ORD-002", createdAt: "2025-12-02T14:20:00", status: "completed", user: { fullName: "سارة علي", avatar: null }, totalAmount: 2300 },
  { id: 3, orderNumber: "ORD-003", createdAt: "2025-12-03T09:15:00", status: "processing", user: { fullName: "خالد عبدالله", avatar: null }, totalAmount: 850 },
  { id: 4, orderNumber: "ORD-004", createdAt: "2025-12-04T16:45:00", status: "shipped", user: { fullName: "فاطمة حسن", avatar: null }, totalAmount: 3200 },
  { id: 5, orderNumber: "ORD-005", createdAt: "2025-12-05T11:00:00", status: "pending", user: { fullName: "عمر يوسف", avatar: null }, totalAmount: 1100 },
];

function OrderTable() {
  const [search, setSearch] = useState();
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const searchParam = sp.get("search") || "";

  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const updateOrder = useDisclosure();
  const CAN_EDIT_ORDER = useHasPermission("orders.edit");
  const CAN_UPDATE_ORDER = useHasPermission("orders.update");

  // const {
  //   data: orderData,
  //   isLoading: ordersLoading,
  //   isError: ordersError,
  //   refetch: refreshOrders,
  // } = useFetchOrders({
  //   page,
  //   searchParam: search ? searchParam : undefined,
  //   limit: LIMIT_PAGE,
  // });
  const orderData = { data: { orders: STATIC_ORDERS, pagination: { totalPages: 1 } } };
  const ordersLoading = false;

  const orders = useMemo(() => {
    return orderData?.data?.orders || [];
  }, [orderData]);

  const openUpdateDialog = (order) => {
    updateOrder.onOpen();
    setSelectedOrder(order);
  };

  const handlePageChange = (_e, p) => {
    const next = new URLSearchParams(sp);
    next.set("page", String(p));
    setSp(next, { replace: true });
  };

  const onSearchChange = useAsyncDebounce((value) => {
    const param = new URLSearchParams(sp);
    if (value) param.set("search", value);
    else param.delete("search");

    param.set("page", "1");
    setSp(param, { replace: true });
  }, 200);

  const tableData =
    orders?.length > 0
      ? {
          columns: [
            {
              Header: "الرقم التعريفي",
              accessor: "orderNumber",
              Cell: ({ value }) => value,
            },
            {
              Header: "التاريخ",
              accessor: "createdAt",
              Cell: ({ value }) => {
                const date = new Date(value).toLocaleString("en-eg", {
                  dateStyle: "short",
                  timeStyle: "short",
                });
                return date;
              },
            },
            {
              Header: "الحالة",
              accessor: "status",
              Cell: ({ value }) => {
                return getOrderStatus(value);
              },
            },
            {
              Header: "العميل",
              accessor: "customer",
              Cell: ({ value }) => {
                return (
                  <CustomerCell
                    image={value.image || "U"}
                    color={value.color || "dark"}
                    name={value.name}
                  />
                );
              },
            },
            {
              Header: "السعر",
              accessor: "totalAmount",
              Cell: ({ value }) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <span>{Number(value)?.toFixed(2)}</span>
                    <img
                      src={SAR}
                      alt={"ريال"}
                      width={20}
                      height={20}
                      crossOrigin="anonymous"
                      loading="lazy"
                    />
                  </div>
                );
              },
            },
            { Header: "الإجراءات", accessor: "actions" },
          ],

          rows: orders.map((order) => {
            return {
              id: order.id,
              orderNumber: order.orderNumber,
              createdAt: order.createdAt,
              status: order.status.toLowerCase(),
              customer: {
                name: order.user?.fullName,
                image: order.user?.avatar || order.user?.fullName?.charAt(0),
              },
              totalAmount: order.totalAmount,
              actions: (
                <>
                  {(CAN_EDIT_ORDER || CAN_UPDATE_ORDER) && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openUpdateDialog(order);
                      }}
                      style={{
                        display: "flex",
                        gap: "8px",
                        padding: "8px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "8px",
                      }}
                    >
                      <Icon style={{ cursor: "pointer" }}>edit</Icon>
                    </div>
                  )}
                </>
              ),
            };
          }),
        }
      : {};

  return (
    <>
      <OrdersTableHeader
        search={search}
        setSearch={setSearch}
        onSearchChange={onSearchChange}
      />
      {ordersLoading ? (
        <TableSkeleton table={tableData} rows={10} columns={6} />
      ) : (
        <TableWithServerPagination
          table={tableData ?? { columns: [], rows: [] }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          totalPages={orderData?.data?.pagination?.totalPages}
          pageNumber={page}
          noEndBorder
          handlePageChange={handlePageChange}
          url="orders"
        />
      )}
      {selectedOrder && (
        <UpdateOrderDialog
          open={updateOrder.open}
          onClose={updateOrder.onClose}
          order={selectedOrder}
        />
      )}
    </>
  );
}

export default OrderTable;
