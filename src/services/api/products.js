import API from "shared/functions/axios";

export const getProducts = async ({ page, searchParam, limit }) => {
  const res = await API.get(
    `/api/v1/dashboard/products?limit=${limit}${page ? `&page=${page}` : ""}${
      searchParam ? `&search=${searchParam}` : ""
    }`
  );
  return res.data;
};

export const addProduct = (formData) =>
  API.post(`/api/v1/dashboard/products`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    transformRequest: (v) => v,
  }).then((r) => r.data);

export const updateProduct = (id, formData) =>
  API.put(`/api/v1/dashboard/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    transformRequest: (v) => v,
  }).then((r) => r.data);

export const deleteProduct = (productId) =>
  API.delete(`/api/v1/dashboard/products/${productId}`).then((r) => r.data);

export const getProductDetails = async (productId) => {
  const res = await API.get(`/api/v1/dashboard/products/${productId}`);
  return res.data;
};
