import API from "shared/functions/axios";

export const getCategories = async ({ page, searchParam, limit }) => {
  const res = await API.get(
    `/api/v1/dashboard/categories?limit=${limit}${page ? `&page=${page}` : ""}${
      searchParam ? `&search=${searchParam}` : ""
    }`
  );
  return res.data;
};
export const getCategoriesTypes = async () => {
  const res = await API.get(`/api/v1/categories/types`);
  return res.data;
};
export const getSubcategories = async () => {
  const res = await API.get(`/api/v1/categories/subcategories`);
  return res.data;
};

export const addCategory = (formData) =>
  API.post(`/api/v1/dashboard/categories`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    transformRequest: (v) => v,
  }).then((r) => r.data);

export const updateCategory = (id, formData) =>
  API.put(`/api/v1/dashboard/categories/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    transformRequest: (v) => v,
  }).then((r) => r.data);

export const deleteCategory = (categoryId) =>
  API.delete(`/api/v1/dashboard/categories/${categoryId}`).then((r) => r.data);
