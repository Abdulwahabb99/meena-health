function item(theme, ownerState) {
  const { borders, functions, transitions } = theme;
  const { active, color } = ownerState;

  const { borderRadius } = borders;

  return {
    pl: "15px",
    mt: 0.375,
    mb: 0.3,
    width: "100%",
    borderRadius: borderRadius.md,
    cursor: "pointer",
    backgroundColor: () => {
      if (active === "isParent") {
        return "rgba(140, 86, 255, 0.08)";
      } else if (active) {
        return "rgba(140, 86, 255, 0.12)";
      }
      return "transparent";
    },
    transition: transitions.create("background-color", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.sharp,
    }),

    "&:hover, &:focus": {
      backgroundColor: !active && "rgba(140, 86, 255, 0.06)",
    },
  };
}

function itemContent(theme, ownerState) {
  const { typography, transitions, functions } = theme;
  const { miniSidenav, active } = ownerState;

  const { size, fontWeightRegular, fontWeightLight } = typography;
  const { pxToRem } = functions;

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: `${pxToRem(8)} ${pxToRem(12)}`,
    marginLeft: pxToRem(18),
    userSelect: "none",
    position: "relative",

    "& .MuiListItemText-root": {
      opacity: miniSidenav ? 0 : 1,
      overflow: "hidden",
      maxWidth: miniSidenav ? 0 : "100%",
      transition: transitions.create(["opacity", "maxWidth"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },
    "& .MuiListItemText-root span": {
      color: active ? "#6B47F5" : "#AF98DB",
      fontWeight: active ? fontWeightRegular : fontWeightLight,
      fontSize: size.xs,
    },

    "&::before": {
      color: "#831ED2",
      fontWeight: fontWeightRegular,
      display: "flex",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: pxToRem(-15),
      opacity: 1,
      borderRadius: "50%",
      fontSize: size.xs,
    },
  };
}

function itemArrow(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const {
    noCollapse,
    transparentSidenav,
    miniSidenav,
    open,
    active,
  } = ownerState;

  const { size } = typography;
  const { pxToRem } = functions;

  return {
    fontSize: `${size.lg} !important`,
    fontWeight: 700,
    marginBottom: pxToRem(-1),
    transform: open ? "rotate(0)" : "rotate(-180deg)",
    color: open || active ? "#8C56FF" : "#AF98DB",
    transition: transitions.create(["color", "transform", "opacity"], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      display:
        noCollapse || (transparentSidenav && miniSidenav) || miniSidenav
          ? "none !important"
          : "block !important",
    },
  };
}

export { item, itemContent, itemArrow };
