import { Icon } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import UpdateProductDialog from "./UpdateProductDialog";
import { useDisclosure } from "shared/hooks/useDisclosure";
import DeleteProductDialog from "./DeleteProductDialog";
import AddNewProductDialog from "./AddNewProductDialog";
import TableSkeleton from "components/TableSkeleton/TableSkeleton";
import { useSearchParams } from "react-router-dom";
import TableWithServerPagination from "layouts/authentication/components/TableWithServerPagination/TableWithServerPagination";
import { useAsyncDebounce } from "react-table";
import TableHeader from "./ProductTableHeader";
// import { useFetchProducts } from "services/queries/products/useFetchProducts";
import SAR from "assets/images/SAR.svg";
import { useHasPermission } from "shared/hooks/useHasPermission";

const LIMIT_PAGE = 10;

const STATIC_PRODUCTS = [
  { id: 1, nameAr: "منتج تجريبي 1", price: 500, discountPrice: 450, images: [{ url: "" }], category: { nameAr: "إلكترونيات" }, hasDelivery: true },
  { id: 2, nameAr: "منتج تجريبي 2", price: 1200, discountPrice: 1000, images: [{ url: "" }], category: { nameAr: "أثاث" }, hasDelivery: true },
  { id: 3, nameAr: "منتج تجريبي 3", price: 300, discountPrice: 250, images: [{ url: "" }], category: { nameAr: "ملابس" }, hasDelivery: false },
  { id: 4, nameAr: "منتج تجريبي 4", price: 800, discountPrice: 700, images: [{ url: "" }], category: { nameAr: "إلكترونيات" }, hasDelivery: true },
  { id: 5, nameAr: "منتج تجريبي 5", price: 150, discountPrice: 120, images: [{ url: "" }], category: { nameAr: "أدوات" }, hasDelivery: false },
];

function ProductsTable() {
  const [search, setSearch] = useState();
  const [sp, setSp] = useSearchParams();
  const page = Number(sp.get("page") || 1);
  const searchParam = sp.get("search") || "";

  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const updateProduct = useDisclosure();
  const deleteProduct = useDisclosure();
  const addProduct = useDisclosure();
  const CAN_EDIT_PRODUCT = useHasPermission("products.edit");
  const CAN_UPDATE_PRODUCT = useHasPermission("products.update");
  const CAN_DELETE_PRODUCT = useHasPermission("products.delete");

  // const {
  //   data: productsData,
  //   isLoading: productsLoading,
  //   isError: productsError,
  //   refetch: refreshProducts,
  // } = useFetchProducts({
  //   page,
  //   searchParam: search ? searchParam : undefined,
  //   limit: LIMIT_PAGE,
  // });
  const productsData = { data: { products: STATIC_PRODUCTS, pagination: { totalPages: 1 } } };
  const productsLoading = false;
  const productsError = false;
  const refreshProducts = () => {};

  const products = useMemo(() => {
    return productsData?.data?.products || [];
  }, [productsData]);

  const openUpdateDialog = (product) => {
    updateProduct.onOpen();
    setSelectedProduct(product);
  };

  const openDeleteDialog = (product) => {
    deleteProduct.onOpen();
    setSelectedProduct(product);
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
    refreshProducts();
  }, [page, searchParam]);

  const tableData =
    products.length > 0
      ? {
          columns: [
            { Header: "المنتج", accessor: "name", width: "20%" },
            { Header: "السعر", accessor: "price", width: "5%" },
            { Header: "الخصم", accessor: "discount", width: "5%" },
            { Header: "التصنيف", accessor: "category", width: "10%" },
            { Header: "قابل للشحن", accessor: "delivery", width: "20%" },
            { Header: "الإجراءات", accessor: "actions", width: "30%" },
          ],
          rows: products?.map((product) => {
            return {
              id: product.id,
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
                      src={product.images[0].url || ""}
                      alt={product.nameAr}
                      width={40}
                      height={40}
                      style={{
                        borderRadius: "50%",
                      }}
                      crossOrigin="anonymous"
                      loading="lazy"
                    />

                    <span
                      style={{
                        maxWidth: "350px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                      title={product?.nameAr}
                    >
                      {product?.nameAr}
                    </span>
                  </div>
                </>
              ),
              price: (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <span>{Number(product?.price).toFixed(2)}</span>
                    <img
                      src={SAR}
                      alt={"ريال"}
                      width={20}
                      height={20}
                      crossOrigin="anonymous"
                      loading="lazy"
                    />
                  </div>
                </>
              ),
              discount: (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <span>{Number(product?.discountPrice).toFixed(2)}</span>
                    <img
                      src={SAR}
                      alt={"ريال"}
                      width={20}
                      height={20}
                      crossOrigin="anonymous"
                      loading="lazy"
                    />
                  </div>
                </>
              ),
              category: product.category?.nameAr || "غير محدد",
              delivery: product?.hasDelivery ? "نعم" : "لا",
              actions: (
                <>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    {(CAN_EDIT_PRODUCT || CAN_UPDATE_PRODUCT) && (
                      <Icon
                        style={{ cursor: "pointer", zIndex: 10000 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openUpdateDialog(product);
                        }}
                      >
                        edit
                      </Icon>
                    )}{" "}
                    {CAN_DELETE_PRODUCT && (
                      <Icon
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteDialog(product);
                        }}
                      >
                        delete
                      </Icon>
                    )}{" "}
                  </div>
                </>
              ),
            };
          }),
        }
      : {};

  if (productsError) return <div>حدث خطأ في جلب البيانات</div>;

  return (
    <>
      <TableHeader
        search={search}
        setSearch={setSearch}
        onSearchChange={onSearchChange}
        addProduct={addProduct}
      />
      {productsLoading ? (
        <TableSkeleton table={tableData} rows={6} columns={3} />
      ) : (
        <TableWithServerPagination
          table={tableData ?? { columns: [], rows: [] }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          totalPages={productsData?.data?.pagination?.totalPages}
          pageNumber={page}
          noEndBorder
          handlePageChange={handlePageChange}
          url="products"
        />
      )}

      {selectedProduct && (
        <UpdateProductDialog
          open={updateProduct.open}
          onClose={updateProduct.onClose}
          product={selectedProduct}
        />
      )}
      {selectedProduct && (
        <DeleteProductDialog
          open={deleteProduct.open}
          onClose={deleteProduct.onClose}
          productId={selectedProduct?.id}
        />
      )}

      <AddNewProductDialog
        open={addProduct.open}
        onClose={addProduct.onClose}
      />
    </>
  );
}

export default ProductsTable;
