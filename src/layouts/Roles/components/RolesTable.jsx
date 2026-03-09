import { Button, Icon } from "@mui/material";
import React from "react";
import UpdateRoleDialog from "./UpdateRoleDialog";
import { useDisclosure } from "shared/hooks/useDisclosure";
import DeleteRoleDialog from "./DeleteRoleDialog";
import AddNewRoleDialog from "./AddNewRoleDialog";
import TableComponent from "layouts/authentication/components/TableComponent/TableComponent";
// import { useFetchRoles } from "services/queries/roles/useFetchRoles";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";
import { useNavigate } from "react-router-dom";
import { useHasPermission } from "shared/hooks/useHasPermission";

function RolesTable() {
  const [selectedRole, setSelectedRole] = React.useState(null);
  const navigate = useNavigate();
  const updateRole = useDisclosure();
  const deleteRole = useDisclosure();
  const addRole = useDisclosure();
  const CAN_EDIT_ROLE = useHasPermission("roles.edit");
  const CAN_DELETE_ROLE = useHasPermission("roles.delete");
  // const { data: rolesData, isLoading: rolesLoading, isError: rolesError } = useFetchRoles();
  const rolesLoading = false;
  const rolesError = false;

  const roles = [
    { id: 1, nameAr: "مدير النظام", nameEn: "Admin", key: "admin" },
    { id: 2, nameAr: "مستخدم", nameEn: "User", key: "user" },
    { id: 3, nameAr: "بائع", nameEn: "Seller", key: "seller" },
    { id: 4, nameAr: "مشرف", nameEn: "Supervisor", key: "supervisor" },
  ];

  const openUpdateDialog = (role) => {
    updateRole.onOpen();
    setSelectedRole(role);
  };

  const openDeleteDialog = (role) => {
    deleteRole.onOpen();
    setSelectedRole(role);
  };

  const tableData =
    roles.length > 0
      ? {
          columns: [
            { Header: "اسم الدور", accessor: "name", width: "22%" },
            { Header: "الكود", accessor: "key", width: "16%" },
            { Header: "الإجراءات", accessor: "actions", width: "14%" },
          ],
          rows: roles?.map((role) => ({
            id: role.id,
            name: role.nameAr || role.nameEn,
            key: role.key,
            actions: (
              <>
                <div style={{ display: "flex", gap: "8px" }}>
                  {CAN_EDIT_ROLE && (
                    <Icon
                      style={{ cursor: "pointer" }}
                      onClick={() => openUpdateDialog(role)}
                    >
                      edit
                    </Icon>
                  )}
                  {CAN_DELETE_ROLE && (
                    <Icon
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => openDeleteDialog(role)}
                    >
                      delete
                    </Icon>
                  )}
                  {CAN_EDIT_ROLE && (
                    <Icon
                      style={{ cursor: "pointer", color: "#379C7C" }}
                      onClick={() => navigate(`/roles/${role.id}`)}
                    >
                      lock
                    </Icon>
                  )}
                </div>
              </>
            ),
          })),
        }
      : {};

  if (rolesLoading)
    return <TableSkeleton table={tableData} rows={6} columns={3} />;
  if (rolesError) return <div>حدث خطأ في جلب البيانات</div>;

  return (
    <>
      <TableComponent
        table={tableData}
        isSorted={false}
        entriesPerPage={false}
        showTotalEntries={false}
        canSearch={true}
        noEndBorder
        canAddButton
        addButtonChildren={
          <Button
            variant="contained"
            sx={{ color: "#FFF" }}
            onClick={() => addRole.onOpen()}
          >
            إضافة دور
          </Button>
        }
      />
      {selectedRole && (
        <UpdateRoleDialog
          open={updateRole.open}
          onClose={updateRole.onClose}
          role={selectedRole}
        />
      )}
      {selectedRole && (
        <DeleteRoleDialog
          open={deleteRole.open}
          onClose={deleteRole.onClose}
          roleId={selectedRole?.id}
        />
      )}
      <AddNewRoleDialog open={addRole.open} onClose={addRole.onClose} />
    </>
  );
}

export default RolesTable;
