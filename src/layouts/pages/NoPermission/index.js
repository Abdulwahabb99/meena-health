import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import { Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function NoPermission() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
        p={3}
      >
        <MDBox
          mb={4}
          sx={{
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Icon
            sx={{
              fontSize: "30px !important",
              color: "#3C9D76",
              opacity: 0.8,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                opacity: 1,
                filter: "drop-shadow(0 4px 8px rgba(60, 157, 118, 0.3))",
              },
            }}
          >
            block
          </Icon>
        </MDBox>

        <MDTypography
          variant="h3"
          fontWeight="bold"
          mb={2}
          sx={{
            minWidth: 120,
            color: "#3C9D76",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              color: "#2d7a5a",
              textShadow: "0 2px 4px rgba(60, 157, 118, 0.2)",
            },
          }}
        >
          لا يوجد لديك الصلاحية
        </MDTypography>

        <MDTypography
          variant="body1"
          color="text"
          mb={4}
          sx={{
            maxWidth: 400,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              color: "#555",
              transform: "translateY(-2px)",
            },
          }}
        >
          عذراً، ليس لديك الصلاحية للوصول إلى هذه الصفحة. يرجى التواصل مع
          المسؤول للحصول على الصلاحيات المناسبة.
        </MDTypography>

        <MDBox
          display="flex"
          gap={2}
          flexWrap="wrap"
          justifyContent="center"
          sx={{
            "& .MuiButton-root": {
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 16px rgba(60, 157, 118, 0.3)",
              },
            },
          }}
        >
          <Button
            onClick={handleGoHome}
            sx={{
              minWidth: 120,
              backgroundColor: "#3C9D76",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "12px 24px",
              fontSize: "16px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#2d7a5a",
                boxShadow: "0 8px 16px rgba(60, 157, 118, 0.4)",
                transform: "translateY(-2px)",
                color: "#fff",
              },
              "&:active": {
                transform: "translateY(0px)",
                boxShadow: "0 4px 8px rgba(60, 157, 118, 0.3)",
              },
            }}
          >
            الصفحة الرئيسية
          </Button>
        </MDBox>
      </Box>
    </Container>
  );
}

export default NoPermission;
