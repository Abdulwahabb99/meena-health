import API from "shared/functions/axios";

export const getOrders = async ({ page, searchParam, limit }) => {
  const res = await API.get(
    `/api/v1/dashboard/orders?limit=${limit}${page ? `&page=${page}` : ""}${
      searchParam ? `&search=${searchParam}` : ""
    }`
  );
  return res.data;
};

export const updateOrders = (id, payload) =>
  API.put(`/api/v1/dashboard/orders/${id}`, payload).then((r) => r.data);

export const updateOrderItem = (id, orderItemId, payload) =>
  API.put(
    `/api/v1/dashboard/tracking/orders/${id}/products/${orderItemId}/status`, // /api/v1/dashboard/tracking/orders/{orderId}/products/{orderItemId}/status
    payload
  ).then((r) => r.data);

export const deleteOrder = (orderId) =>
  API.delete(`/api/v1/dashboard/orders/${orderId}`).then((r) => r.data);

export const getOrderDetails = async (orderId) => {
  const res = await API.get(`/api/v1/dashboard/orders/${orderId}`);
  return res.data;
};

export const bulkUpdateOrderItems = (payload) =>
  API.put(`/api/v1/dashboard/tracking/products/bulk-status`, payload).then(
    (r) => r.data
  );
