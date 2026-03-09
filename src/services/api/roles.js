import API from "shared/functions/axios";

export const getRoles = async () => {
  const res = await API.get("/api/v1/roles");
  return res.data;
};

export const getRoleDetails = async (roleId) => {
  const res = await API.get(`/api/v1/roles/${roleId}`);
  return res.data;
};

export const updateRolePermissions = (roleId, payload) =>
  API.post(`/api/v1/roles/${roleId}/permissions`, {
    permissionIds: payload,
  }).then((r) => r.data);

export const updateRole = (roleId, payload) =>
  API.put(`/api/v1/roles/${roleId}`, payload).then((r) => r.data);

export const addRole = (payload) =>
  API.post(`/api/v1/roles`, payload).then((r) => r.data);

export const deleteRole = (roleId) =>
  API.delete(`/api/v1/roles/${roleId}`).then((r) => r.data);
