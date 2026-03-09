import { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  ListItem,
  Typography,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPermissions } from "services/queries/permissions/useFetchPermissions";
import { useGetRoleDetails } from "services/queries/roles/useGetRoleDetails";
import PermissionsListSkeleton from "./components/PermissionsListSkeleton";
import { useUpdateRolePermissions } from "services/mutations/roles/useUpdateRolePermissions";
import { toast } from "react-toastify";

function RolesEdit() {
  const [selectedPermissionIds, setSelectedPermissionIds] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: role, isLoading: roleLoading } = useGetRoleDetails(id);
  const { data: permissions, isLoading: permissionsLoading } =
    useGetPermissions();

  const { mutate: updateRolePermissionsMutation, isPending: isUpdateLoading } =
    useUpdateRolePermissions({
      onSuccess: () => {
        toast.success("تم تحديث الدور بنجاح");
        navigate("/roles");
      },
      onError: (error) => {
        toast.error(`حدث خطأ: ${error.message}`);
      },
    });

  const permissionsData = permissions?.data?.permissions || [];
  const roleData = role?.data?.role?.rolePermissions || [];

  useEffect(() => {
    if (roleData.length) {
      setSelectedPermissionIds(roleData.map((rp) => rp.permissionId));
    }
  }, [roleData]);

  const handleTogglePermission = (permissionId) => {
    setSelectedPermissionIds((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSave = () => {
    updateRolePermissionsMutation({
      roleId: id,
      permissions: selectedPermissionIds,
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {permissionsLoading || roleLoading ? (
        <PermissionsListSkeleton rows={15} />
      ) : (
        <Box>
          {permissionsData.map((perm) => {
            const isChecked = selectedPermissionIds.includes(perm.id);

            return (
              <ListItem key={perm.id} divider sx={{ py: 0.5, px: 1.5 }}>
                <Checkbox
                  edge="start"
                  checked={isChecked}
                  onChange={() => handleTogglePermission(perm.id)}
                />
                <Box sx={{ mx: 1 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {perm.nameAr}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ({perm.key})
                  </Typography>
                </Box>
              </ListItem>
            );
          })}

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 3 }}
            justifyContent="flex-start"
          >
            <Button
              variant="contained"
              sx={{ color: "#FFF" }}
              onClick={handleSave}
            >
              {isUpdateLoading ? (
                <CircularProgress
                  size={22}
                  sx={{
                    color: "#FFF",
                  }}
                />
              ) : (
                "حفظ"
              )}
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#000",
                borderColor: "#000",
                "&:hover": {
                  borderColor: "#000",
                },
              }}
              onClick={() => navigate("/roles")}
            >
              الغاء
            </Button>
          </Stack>
        </Box>
      )}
    </DashboardLayout>
  );
}

export default RolesEdit;
