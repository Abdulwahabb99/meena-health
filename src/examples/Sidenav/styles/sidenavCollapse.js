function collapseItem(theme, ownerState) {
  const { transitions, breakpoints, functions } = theme;
  const { active } = ownerState;

  const { pxToRem } = functions;

  return {
    background: active ? "rgba(140, 86, 255, 0.12)" : "transparent",
    color: active ? "#6B47F5" : "#AF98DB",
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(10)} ${pxToRem(14)}`,
    margin: `${pxToRem(2)} ${pxToRem(10)}`,
    borderRadius: pxToRem(12),
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxShadow: "none",

    [breakpoints.up("xl")]: {
      transition: transitions.create(["box-shadow", "background-color"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },

    "&:hover, &:focus": {
      backgroundColor: active
        ? "rgba(140, 86, 255, 0.15)"
        : "rgba(140, 86, 255, 0.06)",
    },
  };
}

function collapseIconBox(theme, ownerState) {
  const { transitions, functions } = theme;
  const { pxToRem } = functions;
  const { active } = ownerState;

  return {
    minWidth: pxToRem(20),
    minHeight: pxToRem(20),
    color: active ? "#831ED2" : "inherit",
    borderRadius: pxToRem(8),
    display: "grid",
    placeItems: "center",
    transition: transitions.create("margin", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    "& .material-icons, & .MuiSvgIcon-root, & svg, & svg g": {
      color: active ? "#831ED2" : "inherit",
      fontSize: "20px !important",
    },
  };
}

const collapseIcon = (theme, { active }) => ({
  color: active ? "#831ED2" : "inherit",
  fontSize: "20px !important",
});

function collapseText(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { miniSidenav, transparentSidenav, active } = ownerState;

  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem } = functions;

  return {
    marginLeft: pxToRem(10),

    [breakpoints.up("xl")]: {
      opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
      maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
      marginLeft:
        miniSidenav || (miniSidenav && transparentSidenav) ? 0 : pxToRem(10),
      transition: transitions.create(["opacity", "margin"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& span": {
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      lineHeight: 0,
      color: active ? "#6B47F5" : "#AF98DB",
    },
  };
}

function collapseArrow(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { transparentSidenav, miniSidenav, open, active } = ownerState;

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
      display: (transparentSidenav && miniSidenav) || miniSidenav ? "none !important" : "block !important",
    },
  };
}

export {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow,
};
