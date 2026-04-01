/**
 * Page routes for Meena Intranet
 * Detail / nested routes - empty for now, add when needed
 */

import Checkout from "layouts/Checkout/Checkout";
import CustomerDetails from "layouts/CustomerDetails/CustomerDetails";

const pageRoutes = [
  {
    id: "order-customer",
    route: "/order/customer",
    component: <CustomerDetails />,
  },
  {
    id: "checkout",
    route: "/checkout",
    component: <Checkout />,
  },
];

export default pageRoutes;
