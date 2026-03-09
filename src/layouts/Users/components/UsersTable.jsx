import { Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import UpdateUserDialog from "./UpdateUserDialog";
import { useDisclosure } from "shared/hooks/useDisclosure";
import DeleteUserDialog from "./DeleteUserDialog";
import AddNewUserDialog from "./AddNewUserDialog";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";
import { useSearchParams } from "react-router-dom";
// import { useFetchUsers } from "services/queries/users/useFetchUsers";
import TableWithServerPagination from "layouts/authentication/components/TableWithServerPagination/TableWithServerPagination";
import { useAsyncDebounce } from "react-table";
import TableHeader from "./TableHeader";
import { useHasPermission } from "shared/hooks/useHasPermission";

const LIMIT_PAGE = 10;

function UsersTable() {
  const [search, setSearch] = useState();
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const searchParam = sp.get("search") || "";
  const CAN_EDIT_USER = useHasPermission("users.edit");
  const CAN_DELETE_USER = useHasPermission("users.delete");
  const [selectedUser, setSelectedUser] = React.useState(null);
  const updateUser = useDisclosure();
  const deleteUser = useDisclosure();
  const addUser = useDisclosure();
  // const { data: usersData, ... } = useFetchUsers({ ... });
  const usersData = {
    data: {
      users: [
        { id: 1, fullName: "أحمد محمد", email: "ahmed@example.com", phoneNumber: "0501234567", role: { nameAr: "مدير" } },
        { id: 2, fullName: "سارة علي", email: "sara@example.com", phoneNumber: "0509876543", role: { nameAr: "مستخدم" } },
        { id: 3, fullName: "خالد عبدالله", email: "khaled@example.com", phoneNumber: "0551112233", role: { nameAr: "بائع" } },
        { id: 4, fullName: "فاطمة حسن", email: "fatima@example.com", phoneNumber: "0567778899", role: { nameAr: "مستخدم" } },
      ],
      pagination: { totalPages: 1 },
    },
  };
  const usersLoading = false;
  const usersError = false;
  const refreshUsers = () => {};

  const users = usersData?.data?.users ?? [];

  const openUpdateDialog = (role) => {
    updateUser.onOpen();
    setSelectedUser(role);
  };

  const openDeleteDialog = (role) => {
    deleteUser.onOpen();
    setSelectedUser(role);
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

  useEffect(() => {
    refreshUsers();
  }, [page, searchParam]);

  const tableData =
    users.length > 0
      ? {
          columns: [
            { Header: "الاسم", accessor: "name", width: "20%" },
            { Header: "البريد الإلكتروني", accessor: "email", width: "16%" },
            { Header: "رقم الهاتف", accessor: "phone", width: "14%" },
            { Header: "الدور", accessor: "role", width: "14%" },
            { Header: "الإجراءات", accessor: "actions", width: "10%" },
          ],
          rows: users?.map((user) => ({
            id: user.id,
            name: user.fullName,
            email: user.email || "لا يوجد",
            phone: user.phoneNumber || "لا يوجد",
            role: user.role?.nameAr || "غير محدد",
            actions: (
              <>
                <div style={{ display: "flex", gap: "8px" }}>
                  {CAN_EDIT_USER && (
                    <Icon
                      style={{ cursor: "pointer" }}
                      onClick={() => openUpdateDialog(user)}
                    >
                      edit
                    </Icon>
                  )}
                  {CAN_DELETE_USER && (
                    <Icon
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => openDeleteDialog(user)}
                    >
                      delete
                    </Icon>
                  )}
                </div>
              </>
            ),
          })),
        }
      : {};

  if (usersError) return <div>حدث خطأ في جلب البيانات</div>;

  return (
    <>
      <TableHeader
        search={search}
        setSearch={setSearch}
        onSearchChange={onSearchChange}
        addUser={addUser}
      />
      {usersLoading ? (
        <TableSkeleton table={tableData} rows={6} columns={3} />
      ) : (
        <TableWithServerPagination
          table={tableData ?? { columns: [], rows: [] }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          totalPages={usersData?.data?.pagination?.totalPages}
          pageNumber={page}
          noEndBorder
          handlePageChange={handlePageChange}
        />
      )}

      {selectedUser && (
        <UpdateUserDialog
          open={updateUser.open}
          onClose={updateUser.onClose}
          user={selectedUser}
        />
      )}
      {selectedUser && (
        <DeleteUserDialog
          open={deleteUser.open}
          onClose={deleteUser.onClose}
          userId={selectedUser?.id}
        />
      )}

      <AddNewUserDialog open={addUser.open} onClose={addUser.onClose} />
    </>
  );
}

export default UsersTable;
