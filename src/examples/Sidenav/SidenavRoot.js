import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

export default styled(Drawer)(({ theme, ownerState }) => {
  const { transitions, breakpoints, functions } = theme;
  const { miniSidenav } = ownerState;

  const sidebarWidth = 240;
  const { pxToRem } = functions;

  const drawerOpenStyles = () => ({
    background: "#F3EEFF",
    transform: "translateX(0)",
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      boxShadow: "none",
      left: "0",
      width: sidebarWidth,
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
  });

  const drawerCloseStyles = () => ({
    background: "#F3EEFF",
    transform: `translateX(${pxToRem(-320)})`,
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      boxShadow: "none",
      left: "0",
      width: pxToRem(73),
      overflowX: "hidden",
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),
    },
  });

  return {
    "& .MuiDrawer-paper": {
      boxShadow: "none",
      border: "none",
      height: "100vh",
      top: 0,
      bottom: 0,
      margin: 0,
      borderRadius: 0,
      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles()),
    },
  };
});
