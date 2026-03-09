import { Button, Icon } from "@mui/material";
import React from "react";
import { useGetPermissions } from "services/queries/permissions/useFetchPermissions";
import UpdatePermissionDialog from "./UpdatePermissionDialog";
import { useDisclosure } from "shared/hooks/useDisclosure";
import DeletePermissionDialog from "./DeletePermissionDialog";
import AddNewPermissionDialog from "./AddNewPermissionDialog";
import TableComponent from "layouts/authentication/components/TableComponent/TableComponent";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";

function PermissionsTable() {
  const [selectedPermission, setSelectedPermission] = React.useState(null);
  const { data, isLoading, isError } = useGetPermissions();
  const permissions = data?.data?.permissions ?? [];
  const updatePermission = useDisclosure();
  const deletePermission = useDisclosure();
  const addPermission = useDisclosure();

  const openUpdateDialog = (permission) => {
    updatePermission.onOpen();
    setSelectedPermission(permission);
  };

  const openDeleteDialog = (permission) => {
    deletePermission.onOpen();
    setSelectedPermission(permission);
  };

  const tableData =
    permissions.length > 0
      ? {
          columns: [
            { Header: "اسم الصلاحية", accessor: "name", width: "22%" },
            { Header: "الكود", accessor: "key", width: "16%" },
            { Header: "الموديول", accessor: "module", width: "14%" },
            { Header: "الإجراءات", accessor: "actions", width: "14%" },
          ],
          rows: permissions?.map((permission) => ({
            id: permission.id,
            name: permission.nameAr || permission.nameEn,
            key: permission.key,
            module: permission.module,
            actions: (
              <>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Icon
                    style={{ cursor: "pointer" }}
                    onClick={() => openUpdateDialog(permission)}
                  >
                    edit
                  </Icon>
                  <Icon
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => openDeleteDialog(permission)}
                  >
                    delete
                  </Icon>
                </div>
              </>
            ),
          })),
        }
      : {};

  if (isLoading) return <TableSkeleton table={tableData} />;
  if (isError) return <div>حدث خطأ في جلب البيانات</div>;

  return (
    <>
      {" "}
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
            onClick={() => addPermission.onOpen()}
          >
            إضافة صلاحية
          </Button>
        }
      />
      {selectedPermission && (
        <UpdatePermissionDialog
          open={updatePermission.open}
          onClose={updatePermission.onClose}
          permission={selectedPermission}
        />
      )}
      {selectedPermission && (
        <DeletePermissionDialog
          open={deletePermission.open}
          onClose={deletePermission.onClose}
          permissionId={selectedPermission?.id}
        />
      )}
      <AddNewPermissionDialog
        open={addPermission.open}
        onClose={addPermission.onClose}
      />
    </>
  );
}

export default PermissionsTable;
