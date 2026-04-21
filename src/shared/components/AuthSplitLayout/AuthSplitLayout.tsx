import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AuthLanguageSwitcher from "layouts/authentication/components/AuthLanguageSwitcher";
import SignInHeroLottie from "components/SignInHeroLottie";
import { MEENA_LOGO_SRC } from "constants/branding";

type AuthSplitLayoutProps = {
  isRTL: boolean;
  children: ReactNode;
};

export default function AuthSplitLayout({
  isRTL,
  children,
}: AuthSplitLayoutProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: { xs: "auto", md: "hidden" },
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: isRTL ? "row" : "row-reverse",
        },
        direction: isRTL ? "rtl" : "ltr",
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100vh",
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          p: 4,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <SignInHeroLottie sizes={{ lg: 420, xl: 540, xxl: 660 }} />
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", lg: "45%" },
          minHeight: { xs: "100vh", lg: "auto" },
          height: { xs: "100vh", lg: "100vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", lg: "space-between" },
          overflow: { xs: "auto", lg: "hidden" },
          px: { xs: 3, md: 6, lg: 10 },
          py: { xs: 5, md: 6 },
          pt: { xs: 8, lg: 6 },
          backgroundColor: "background.paper",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            flexDirection: isRTL ? "row" : "row-reverse",
            mb: { xs: 5, lg: 2 },
            flexShrink: 0,
          }}
        >
          <AuthLanguageSwitcher />
          <Box
            component="img"
            src={MEENA_LOGO_SRC}
            alt="Meena"
            sx={{
              width: 160,
              height: "auto",
              maxHeight: 56,
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
        </Stack>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 420,
            width: "100%",
            mx: "auto",
          }}
        >
          {children}
        </Box>

        <Typography
          variant="caption"
          sx={{
            pt: 4,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          © {new Date().getFullYear()} Meena Health. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
