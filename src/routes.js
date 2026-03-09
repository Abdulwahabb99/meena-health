import NewProduct from "layouts/ecommerce/products/new-product";
import Icon from "@mui/material/Icon";
import Dashboard from "layouts/Dashboard/Dashboard";
import Users from "layouts/Users/Users";
import React, { lazy } from "react";
import Orders from "layouts/Orders/Orders";
import Categories from "layouts/Categories/Categories";

const Roles = lazy(() => import("layouts/Roles/Roles"));
const Permissions = lazy(() => import("layouts/Permissions/Permissions"));
const Products = lazy(() => import("layouts/Products/Products"));

export const routes = [
  {
    type: "collapse",
    name: "الرئيسية",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "المنتجات",
    key: "products",
    route: "/products",
    icon: <Icon fontSize="small">shop</Icon>,
    component: <Products />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "التصنيفات",
    key: "categories",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/categories",
    component: <Categories />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "الطلبات",
    key: "orders",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/orders",
    component: <Orders />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "إدارة المستخدمين",
    key: "users management",
    icon: <Icon fontSize="small">manage_accounts</Icon>,
    component: <Users />,
    collapse: [
      {
        name: "المستخدمين",
        key: "users",
        noCollapse: true,
        icon: <Icon fontSize="small">group</Icon>,
        route: "/users",
        component: <Users />,
        protected: true,
      },
      {
        name: "الأدوار",
        key: "roles",
        noCollapse: true,
        icon: <Icon fontSize="small">admin_panel_settings</Icon>,
        route: "/roles",
        component: <Roles />,
        protected: true,
      },
      {
        name: "الصلاحيات",
        key: "permissions",
        noCollapse: true,
        icon: <Icon fontSize="small">lock</Icon>,
        route: "/permissions",
        component: <Permissions />,
        protected: true,
      },
    ],
  },
];

export const sellerRoutes = [
  {
    type: "collapse",
    name: "الرئيسية",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "المنتجات",
    key: "products",
    route: "/products",
    icon: <Icon fontSize="small">shop</Icon>,
    component: <Products />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "التصنيفات",
    key: "categories",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/categories",
    component: <Categories />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "الطلبات",
    key: "orders",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/orders",
    component: <Orders />,
    noCollapse: true,
    protected: true,
  },
];
