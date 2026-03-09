/** 
  All of the routes for the page layout of Tajhiz are added here,
  You can add a new route, customize the routes and delete the routes here.

*/

import Profile from "layouts/Profile/Profile";
import { lazy } from "react";
const RolesEdit = lazy(() => import("layouts/RolesEdit/RolesEdit"));
const ProductPage = lazy(() =>
  import("layouts/ecommerce/products/product-page/ProductPage")
);
const OrderDetailsPage = lazy(() =>
  import("layouts/ecommerce/orders/order-details/OrderDetails")
);
const NoPermission = lazy(() => import("layouts/pages/NoPermission"));

const pageRoutes = [
  { id: 1, name: "profile", route: "/profile", component: <Profile /> },
  { id: 2, name: "roles/:id", route: "/roles/:id", component: <RolesEdit /> },
  {
    id: 3,
    name: "products/:id",
    route: "/products/:id",
    component: <ProductPage />,
  },
  {
    id: 4,
    name: "orders/:id",
    route: "/orders/:id",
    component: <OrderDetailsPage />,
  },
  {
    id: 5,
    name: "no-permission",
    route: "/no-permission",
    component: <NoPermission />,
  },
];

export default pageRoutes;
