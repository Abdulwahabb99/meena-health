import { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
// import themeDarkRTL from "assets/theme-dark/theme-rtl";
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
import { routes } from "routes";
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import brandWhite from "assets/images/tajhiz-logo.png";
import brandDark from "assets/images/tajhiz-logo.png";
import ProtectedRoutes from "shared/component/ProtectedRoutes";
import pageRoutes from "page.routes";
import SignIn from "layouts/authentication/sign-in/SignIn/SignIn";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAuth } from "shared/hooks/useAuth";
import { SUPER_ADMIN } from "constants/names";
import { sellerRoutes } from "routes";
import SuspenseLoading from "components/SuspenseLoading/SuspenseLoading";
import { OPERATOR } from "constants/names";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction = "ltr",
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const { user, ready } = useAuth();

  const IS_SUPER_ADMIN = user?.role === SUPER_ADMIN;
  const IS_OPERATOR = user?.role === OPERATOR;
  const MENU_ITEMS = IS_SUPER_ADMIN || IS_OPERATOR ? routes : sellerRoutes;

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", "ltr");
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.flatMap((route) => {
      if (route.collapse) return getRoutes(route.collapse);

      if (route.route) {
        const Element = route.protected ? (
          <ProtectedRoutes>{route.component}</ProtectedRoutes>
        ) : (
          route.component
        );

        return <Route key={route.key} path={route.route} element={Element} />;
      }

      return [];
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />

        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={
                (transparentSidenav && !darkMode) || whiteSidenav
                  ? brandDark
                  : brandWhite
              }
              routes={MENU_ITEMS}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            {/* <Configurator /> */}
            {/* {configsButton} */}
          </>
        )}
        <Suspense fallback={<SuspenseLoading />}>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            {getRoutes(MENU_ITEMS)}
            {pageRoutes.map((route) => (
              <Route
                key={route.id}
                path={route.route}
                element={<ProtectedRoutes>{route.component}</ProtectedRoutes>}
              />
            ))}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
  );

  // direction === "rtl" ? (
  //   <CacheProvider value={rtlCache}>
  //     <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
  //       <CssBaseline />
  //       {layout === "dashboard" && (
  //         <>
  //           <Sidenav
  //             color={sidenavColor}
  //             brand={
  //               (transparentSidenav && !darkMode) || whiteSidenav
  //                 ? brandDark
  //                 : brandWhite
  //             }
  //             brandName="Creative Tim"
  //             routes={routes}
  //             onMouseEnter={handleOnMouseEnter}
  //             onMouseLeave={handleOnMouseLeave}
  //           />
  //           <Configurator />
  //           {configsButton}
  //         </>
  //       )}
  //       {layout === "vr" && <Configurator />}
  //       <Routes>
  //         {getRoutes(routes)}
  //         <Route path="*" element={<Navigate to="/dashboards/analytics" />} />
  //       </Routes>
  //     </ThemeProvider>
  //   </CacheProvider>
  // ) : (
  //   <ThemeProvider theme={darkMode ? themeDark : theme}>
  //     <CssBaseline />
  //     {layout === "dashboard" && (
  //       <>
  //         <Sidenav
  //           color={sidenavColor}
  //           brand={
  //             (transparentSidenav && !darkMode) || whiteSidenav
  //               ? brandDark
  //               : brandWhite
  //           }
  //           brandName="Creative Tim"
  //           routes={routes}
  //           onMouseEnter={handleOnMouseEnter}
  //           onMouseLeave={handleOnMouseLeave}
  //         />
  //         <Configurator />
  //         {configsButton}
  //       </>
  //     )}
  //     {layout === "vr" && <Configurator />}
  //     <Routes>
  //       {getRoutes(routes)}
  //       <Route path="*" element={<Navigate to="/dashboards/analytics" />} />
  //     </Routes>
  //   </ThemeProvider>
  // );
}
