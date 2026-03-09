import { Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "shared/hooks/useDisclosure";
import AddNewCategoryDialog from "./AddNewCategoryDialog";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";
import { useSearchParams } from "react-router-dom";
import TableWithServerPagination from "layouts/authentication/components/TableWithServerPagination/TableWithServerPagination";
import { useAsyncDebounce } from "react-table";
import TableHeader from "./CategoriesTableHeader";
// import { useFetchCategories } from "services/queries/categories/useFetchCategories";
// import { useFetchCategoriesTypes } from "services/queries/categories/useFetchCategories";
import UpdateCategoryDialog from "./UpdateCategoryDialog";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import { useHasPermission } from "shared/hooks/useHasPermission";

const LIMIT_PAGE = 10;

function CategoriesTable() {
  const [search, setSearch] = useState();
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const searchParam = sp.get("search") || "";

  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const updateCategory = useDisclosure();
  const deleteCategory = useDisclosure();
  const addCategory = useDisclosure();
  const CAN_EDIT_CATEGORY = useHasPermission("categories.edit");
  const CAN_UPDATE_CATEGORY = useHasPermission("categories.update");
  const CAN_DELETE_CATEGORY = useHasPermission("categories.delete");

  // const { data: categoriesData, ... } = useFetchCategories({ ... });
  // const { data: categoriesTypesData, ... } = useFetchCategoriesTypes();
  const categoriesData = {
    data: {
      categories: [
        { id: 1, nameAr: "إلكترونيات", imageUrl: "", categoryType: { nameAr: "رئيسي" }, descriptionAr: "أجهزة إلكترونية" },
        { id: 2, nameAr: "أثاث", imageUrl: "", categoryType: { nameAr: "رئيسي" }, descriptionAr: "أثاث منزلي ومكتبي" },
        { id: 3, nameAr: "ملابس", imageUrl: "", categoryType: { nameAr: "فرعي" }, descriptionAr: "ملابس رجالية ونسائية" },
        { id: 4, nameAr: "أدوات", imageUrl: "", categoryType: { nameAr: "رئيسي" }, descriptionAr: "أدوات منزلية" },
      ],
      pagination: { totalPages: 1 },
    },
  };
  const categoriesLoading = false;
  const categoriesError = false;
  const refreshCategories = () => {};
  const typesLoading = false;

  const categories = categoriesData?.data?.categories ?? [];
  const types = [
    { id: 1, nameAr: "رئيسي", nameEn: "Main" },
    { id: 2, nameAr: "فرعي", nameEn: "Sub" },
  ];

  const openUpdateDialog = (role) => {
    updateCategory.onOpen();
    setSelectedCategory(role);
  };

  const openDeleteDialog = (role) => {
    deleteCategory.onOpen();
    setSelectedCategory(role);
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
    refreshCategories();
  }, [page, searchParam]);

  const tableData =
    categories.length > 0
      ? {
          columns: [
            { Header: "إسم التصنيف", accessor: "name", width: "20%" },
            { Header: "نوع التصنيف", accessor: "categoryType", width: "16%" },
            { Header: "الوصف", accessor: "description", width: "14%" },
            { Header: "الإجراءات", accessor: "actions", width: "10%" },
          ],
          rows: categories?.map((category) => {
            return {
              id: category.id,
              name: (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={category.imageUrl || ""}
                      alt={category.nameAr}
                      width={40}
                      height={40}
                      style={{
                        borderRadius: "50%",
                      }}
                      crossOrigin="anonymous"
                    />

                    <span>{category.nameAr}</span>
                  </div>
                </>
              ),
              categoryType: category.categoryType.nameAr || "لا يوجد",
              description: category.descriptionAr || "لا يوجد",
              role: category.role?.nameAr || "غير محدد",
              actions: (
                <>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {(CAN_EDIT_CATEGORY || CAN_UPDATE_CATEGORY) && (
                      <Icon
                        style={{ cursor: "pointer" }}
                        onClick={() => openUpdateDialog(category)}
                      >
                        edit
                      </Icon>
                    )}
                    {CAN_DELETE_CATEGORY && (
                      <Icon
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => openDeleteDialog(category)}
                      >
                        delete
                      </Icon>
                    )}
                  </div>
                </>
              ),
            };
          }),
        }
      : {};

  if (categoriesError) return <div>حدث خطأ في جلب البيانات</div>;

  return (
    <>
      <TableHeader
        search={search}
        setSearch={setSearch}
        onSearchChange={onSearchChange}
        addCategory={addCategory}
      />
      {categoriesLoading ? (
        <TableSkeleton table={tableData} rows={6} columns={3} />
      ) : (
        <TableWithServerPagination
          table={tableData ?? { columns: [], rows: [] }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          totalPages={categoriesData?.data?.pagination?.totalPages}
          pageNumber={page}
          noEndBorder
          handlePageChange={handlePageChange}
        />
      )}

      {selectedCategory && (
        <UpdateCategoryDialog
          open={updateCategory.open}
          onClose={updateCategory.onClose}
          category={selectedCategory}
          categoryTypes={types}
        />
      )}
      {selectedCategory && (
        <DeleteCategoryDialog
          open={deleteCategory.open}
          onClose={deleteCategory.onClose}
          categoryId={selectedCategory?.id}
        />
      )}

      <AddNewCategoryDialog
        open={addCategory.open}
        onClose={addCategory.onClose}
        categoryTypes={types}
        isLoading={typesLoading}
      />
    </>
  );
}

export default CategoriesTable;
