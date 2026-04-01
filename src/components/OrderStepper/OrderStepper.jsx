import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import useTranslate from "shared/hooks/useTranslate";

function OrderStepper({ activeStep, sx }) {
  const { t } = useTranslate();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const steps = [
    t("orderFlow.stepMedications"),
    t("orderFlow.stepYourDetails"),
    t("orderFlow.stepCheckout"),
  ];

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        background: "transparent",
        boxShadow: "none",
        py: 0.5,
        px: 0,
        m: 0,
        overflow: "hidden",
        boxSizing: "border-box",
        "& .MuiStep-root": {
          minWidth: 0,
          flex: "1 1 0",
          px: { xs: 0.25, sm: 0.5 },
        },
        "& .MuiStepConnector-root": {
          top: 14,
          left: "calc(-50% + 16px)",
          right: "calc(50% + 16px)",
        },
        "& .MuiStepConnector-line": {
          borderColor: theme.palette.grey[300],
          borderTopWidth: 2,
        },
        "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line, & .MuiStepConnector-root.Mui-completed .MuiStepConnector-line":
          {
            borderColor: primary,
          },
        "& .MuiStepIcon-root": {
          color: theme.palette.grey[400],
          width: 28,
          height: 28,
        },
        "& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed": {
          color: primary,
        },
        "& .MuiStepIcon-text": {
          fill: theme.palette.common.white,
          fontSize: "0.7rem",
          fontWeight: 700,
        },
        "& .MuiStepLabel-labelContainer": {
          maxWidth: "100%",
        },
        "& .MuiStepLabel-label": {
          fontSize: { xs: "0.62rem", sm: "0.72rem" },
          fontWeight: 500,
          color: theme.palette.text.secondary,
          lineHeight: 1.2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
          mt: 0.5,
          "&.Mui-active": {
            color: primary,
            fontWeight: 700,
          },
          "&.Mui-completed": {
            color: primary,
            fontWeight: 600,
          },
        },
        ...sx,
      }}
    >
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

OrderStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

OrderStepper.defaultProps = {
  sx: undefined,
};

export default OrderStepper;
