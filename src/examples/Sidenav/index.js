import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavItem from "examples/Sidenav/SidenavItem";
import SidenavRoot from "examples/Sidenav/SidenavRoot";

import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

function Sidenav({ color = "info", brand = "", routes, ...rest }) {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const findParentKey = (routesList) => {
      for (const route of routesList) {
        if (route.collapse) {
          for (const child of route.collapse) {
            if (
              child.route === pathname ||
              (child.collapse &&
                child.collapse.some((n) => n.route === pathname))
            ) {
              return route.key;
            }
          }
        }
      }
      return false;
    };

    const parentKey = findParentKey(routes);
    setOpenCollapse(parentKey);
  }, [pathname, routes]);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth >= 1200 ? transparentSidenav : false
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth >= 1200 ? whiteSidenav : false
      );
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, transparentSidenav, whiteSidenav]);

  const renderCollapse = (collapseItems, parentKey) =>
    collapseItems?.map(({ name, key, route, href, icon, collapse }) => {
      if (collapse) {
        return (
          <SidenavItem
            key={key}
            color={color}
            name={name}
            icon={icon}
            active={openCollapse === key}
            open={openCollapse === key}
            onClick={() =>
              openCollapse === key
                ? setOpenCollapse(false)
                : setOpenCollapse(key)
            }
          >
            {renderCollapse(collapse, key)}
          </SidenavItem>
        );
      }

      if (href) {
        return (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavItem
              color={color}
              name={name}
              icon={icon}
              active={pathname === route}
              nested
            />
          </Link>
        );
      }

      return (
        <NavLink to={route} key={key} style={{ textDecoration: "none" }}>
          <SidenavItem
            color={color}
            name={name}
            icon={icon}
            active={pathname === route}
            nested
          />
        </NavLink>
      );
    });

  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, href, route, collapse }) => {
      if (type === "title") {
        return (
          <MDTypography
            key={key}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={2}
            mt={2}
            mb={1}
            ml={1}
            sx={{ color: "#AF98DB", letterSpacing: "0.5px" }}
          >
            {title}
          </MDTypography>
        );
      }

      if (type === "divider") {
        return (
          <Divider
            key={key}
            sx={{ borderColor: "rgba(140, 86, 255, 0.1)", my: 1 }}
          />
        );
      }

      if (type === "collapse") {
        if (noCollapse && route) {
          return (
            <NavLink to={route} key={key} style={{ textDecoration: "none" }}>
              <SidenavCollapse
                name={name}
                icon={icon}
                noCollapse
                active={pathname === route}
              />
            </NavLink>
          );
        }

        return (
          <SidenavCollapse
            key={key}
            name={name}
            icon={icon}
            active={openCollapse === key}
            open={openCollapse === key}
            onClick={() => setOpenCollapse(openCollapse === key ? false : key)}
          >
            {renderCollapse(collapse, key)}
          </SidenavCollapse>
        );
      }

      return null;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={3} textAlign="center">
        <MDBox
          component={NavLink}
          to="/"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          sx={{ textDecoration: "none" }}
        >
          {brand && (
            <MDBox
              component="img"
              src={brand}
              alt="Brand"
              width="4rem"
              mb={0.5}
            />
          )}
          <MDTypography
            variant="h6"
            sx={{
              color: "#8C56FF",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.5px",
            }}
          >
            meena
          </MDTypography>
        </MDBox>
      </MDBox>
      <Divider sx={{ borderColor: "rgba(140, 86, 255, 0.12)", mx: 2 }} />
      <List sx={{ px: 0.5 }}>{renderRoutes}</List>
    </SidenavRoot>
  );
}

Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
