import API from "shared/functions/axios";

export const getUsers = async ({ page, searchParam, limit }) => {
  const res = await API.get(
    `/api/v1/dashboard/users?limit=${limit}${page ? `&page=${page}` : ""}${
      searchParam ? `&search=${searchParam}` : ""
    }`
  );
  return res.data;
};

export const addUser = (payload) =>
  API.post(`/api/v1/dashboard/users`, payload).then((r) => r.data);

export const updateUser = (userId, payload) =>
  API.put(`/api/v1/dashboard/users/${userId}`, payload).then((r) => r.data);

export const deleteUser = (userId) =>
  API.delete(`/api/v1/dashboard/users/${userId}`).then((r) => r.data);
