function item(theme, ownerState) {
  const { borders, functions, transitions, palette } = theme;
  const { active, color, miniSidenav } = ownerState;
  const { meena } = palette;
  const { borderRadius } = borders;

  return {
    pl: "15px",
    mt: 0.375,
    mb: 0.3,
    width: "100%",
    borderRadius: borderRadius.md,
    cursor: "pointer",
    ...(active && !miniSidenav && {
      borderLeft: `3px solid ${meena?.icon || "#831ED2"}`,
      paddingLeft: "12px",
    }),
    backgroundColor: () => {
      if (active === "isParent") {
        return meena?.hoverBg || "rgba(140, 86, 255, 0.08)";
      } else if (active) {
        return meena?.activeBg || "rgba(140, 86, 255, 0.12)";
      }
      return "transparent";
    },
    transition: transitions.create(
      ["background-color", "border-color", "padding"],
      {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.sharp,
      }
    ),

    "&:hover, &:focus": {
      backgroundColor: !active && (meena?.hoverBg || "rgba(140, 86, 255, 0.06)"),
    },
  };
}

function itemIconBox(theme, ownerState) {
  const { transitions, functions, palette } = theme;
  const { pxToRem } = functions;
  const { active, miniSidenav } = ownerState;
  const iconColor = palette?.meena?.icon || "#831ED2";

  const hideIconWhenActive = active && !miniSidenav;

  return {
    minWidth: hideIconWhenActive ? 0 : pxToRem(20),
    minHeight: pxToRem(20),
    width: hideIconWhenActive ? 0 : "auto",
    padding: hideIconWhenActive ? 0 : undefined,
    overflow: "hidden",
    color: active ? iconColor : "inherit",
    display: "grid",
    placeItems: "center",
    transition: transitions.create(
      ["margin", "min-width", "width", "padding", "opacity"],
      {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }
    ),
    opacity: hideIconWhenActive ? 0 : 1,
    visibility: hideIconWhenActive ? "hidden" : "visible",
    "& .material-icons, & .MuiSvgIcon-root, & svg": {
      color: active ? iconColor : "inherit",
      fontSize: "20px !important",
    },
  };
}

const itemIcon = (theme, { active }) => ({
  color: active ? (theme.palette?.meena?.icon || "#831ED2") : "inherit",
  fontSize: "20px !important",
});

function itemContent(theme, ownerState) {
  const { typography, transitions, functions, palette } = theme;
  const { miniSidenav, active } = ownerState;
  const { meena } = palette;
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
    color: active ? (meena?.secondary || "#6B47F5") : (meena?.tertiary || "#AF98DB"),

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
      color: active ? (meena?.secondary || "#6B47F5") : (meena?.tertiary || "#AF98DB"),
      fontWeight: active ? fontWeightRegular : fontWeightLight,
      fontSize: size.xs,
    },

    "&::before": {
      color: meena?.icon || "#831ED2",
      fontWeight: fontWeightRegular,
      display: "flex",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: pxToRem(-15),
      opacity: active && !miniSidenav ? 0 : 1,
      borderRadius: "50%",
      fontSize: size.xs,
    },
  };
}

function itemArrow(theme, ownerState) {
  const { typography, transitions, breakpoints, functions, palette } = theme;
  const {
    noCollapse,
    transparentSidenav,
    miniSidenav,
    open,
    active,
  } = ownerState;
  const { meena } = palette;
  const { size } = typography;
  const { pxToRem } = functions;

  return {
    fontSize: `${size.lg} !important`,
    fontWeight: 700,
    marginBottom: pxToRem(-1),
    transform: open ? "rotate(0)" : "rotate(-180deg)",
    color: open || active ? (meena?.primary || "#8C56FF") : (meena?.tertiary || "#AF98DB"),
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

export { item, itemContent, itemArrow, itemIconBox, itemIcon };
