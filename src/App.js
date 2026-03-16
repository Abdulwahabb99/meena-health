import { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import { routes } from "routes";
import { useMaterialUIController, setMiniSidenav } from "context";
import ProtectedRoutes from "shared/component/ProtectedRoutes";
import pageRoutes from "page.routes";
import SignIn from "layouts/authentication/sign-in/SignIn/SignIn";
import SignUp from "layouts/authentication/sign-up/cover";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAuth } from "shared/hooks/useAuth";
import SuspenseLoading from "components/SuspenseLoading/SuspenseLoading";

const brandLogo = "/meena-logo.png";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction = "ltr",
    layout,
    sidenavColor,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { pathname } = useLocation();
  const { ready } = useAuth();

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 1200);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const MENU_ITEMS = routes;

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute("dir", "ltr");
  }, [direction]);

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
            brand={brandLogo}
            routes={MENU_ITEMS}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {isSmallScreen && !miniSidenav && (
            <Box
              onClick={() => setMiniSidenav(dispatch, true)}
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.2)",
                zIndex: 1199,
              }}
            />
          )}
        </>
      )}
      <Suspense fallback={<SuspenseLoading />}>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          {getRoutes(MENU_ITEMS)}
          {pageRoutes.map((route) => (
            <Route
              key={route.id}
              path={route.route}
              element={<ProtectedRoutes>{route.component}</ProtectedRoutes>}
            />
          ))}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}
