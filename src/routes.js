import Icon from "@mui/material/Icon";
import React from "react";

import Home from "layouts/Home/Home";
import News from "layouts/News/News";
import QuickLinks from "layouts/QuickLinks/QuickLinks";
import Departments from "layouts/Departments/Departments";
import DocumentHub from "layouts/DocumentHub/DocumentHub";
import PoliciesProcedures from "layouts/DocumentHub/PoliciesProcedures";
import FormsTemplates from "layouts/DocumentHub/FormsTemplates";
import StaffDirectory from "layouts/StaffDirectory/StaffDirectory";
import HelpSupport from "layouts/HelpSupport/HelpSupport";

export const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/home",
    component: <Home />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "News & Announcements",
    key: "news",
    icon: <Icon fontSize="small">newspaper</Icon>,
    route: "/news",
    component: <News />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Quick Links",
    key: "quick-links",
    icon: <Icon fontSize="small">link</Icon>,
    route: "/quick-links",
    component: <QuickLinks />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Departments",
    key: "departments",
    icon: <Icon fontSize="small">business</Icon>,
    route: "/departments",
    component: <Departments />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Document Hub",
    key: "document-hub",
    icon: <Icon fontSize="small">folder</Icon>,
    route: "/documents",
    component: <DocumentHub />,
    noCollapse: false,
    collapse: [
      {
        name: "Policies & Procedures",
        key: "policies",
        noCollapse: true,
        icon: <Icon fontSize="small">description</Icon>,
        route: "/documents/policies",
        component: <PoliciesProcedures />,
        protected: true,
      },
      {
        name: "Forms & Templates",
        key: "forms",
        noCollapse: true,
        icon: <Icon fontSize="small">assignment</Icon>,
        route: "/documents/forms",
        component: <FormsTemplates />,
        protected: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "Staff Directory",
    key: "staff",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/staff",
    component: <StaffDirectory />,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Help & Support",
    key: "help",
    icon: <Icon fontSize="small">help</Icon>,
    route: "/help",
    component: <HelpSupport />,
    noCollapse: true,
    protected: true,
  },
];
