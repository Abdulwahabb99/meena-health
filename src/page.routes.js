/**
 * Page routes for Meena Intranet
 * Detail / nested routes not in the main sidebar
 */

import { lazy } from "react";
import DocumentHub from "layouts/DocumentHub/DocumentHub";

const DepartmentPage = lazy(() =>
  import("layouts/Departments/DepartmentPage")
);
const NoPermission = lazy(() =>
  import("layouts/pages/NoPermission")
);

const pageRoutes = [
  {
    id: 1,
    name: "departments/:slug",
    route: "/departments/:slug",
    component: <DepartmentPage />,
  },
  {
    id: 2,
    name: "documents",
    route: "/documents",
    component: <DocumentHub />,
  },
  {
    id: 3,
    name: "no-permission",
    route: "/no-permission",
    component: <NoPermission />,
  },
];

export default pageRoutes;
