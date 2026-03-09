import React from "react";
import { Card, Grid, Stack, Skeleton, Box } from "@mui/material";
import MDBox from "components/MDBox";

export default function ProductSkeleton() {
  return (
    <MDBox py={3}>
      <Card sx={{ overflow: "visible" }}>
        <MDBox p={3}>
          <MDBox mb={3}>
            <Skeleton variant="text" width={140} height={28} />
          </MDBox>

          <Grid container spacing={3}>
            {/* LEFT: Images */}
            <Grid item xs={12} lg={6} xl={5}>
              <Stack spacing={2}>
                {/* main image */}
                <Skeleton
                  variant="rounded"
                  height={280}
                  sx={{ borderRadius: 2 }}
                />
                {/* thumbnails row */}
                <Stack direction="row" spacing={2}>
                  <Skeleton
                    variant="rounded"
                    height={90}
                    sx={{ flex: 1, borderRadius: 2 }}
                  />
                  <Skeleton
                    variant="rounded"
                    height={90}
                    sx={{ flex: 1, borderRadius: 2 }}
                  />
                </Stack>
              </Stack>
            </Grid>

            {/* RIGHT: Info */}
            <Grid item xs={12} lg={5} sx={{ mx: "auto" }}>
              <Stack spacing={2}>
                {/* Title */}
                <Skeleton variant="text" height={44} width="70%" />
                {/* Stars */}
                <Skeleton variant="text" height={22} width={120} />
                {/* Price */}
                <Skeleton variant="text" height={36} width={160} />
                {/* In-stock badge */}
                <Skeleton
                  variant="rounded"
                  width={110}
                  height={28}
                  sx={{ borderRadius: 8 }}
                />

                {/* Description header */}
                <MDBox mt={1}>
                  <Skeleton variant="text" width={110} height={24} />
                </MDBox>

                {/* Bullet lines */}
                <Stack spacing={1}>
                  <Skeleton variant="text" height={18} width="95%" />
                  <Skeleton variant="text" height={18} width="92%" />
                  <Skeleton variant="text" height={18} width="88%" />
                  <Skeleton variant="text" height={18} width="80%" />
                </Stack>

                {/* Selects row: Quantity / Color / Frame */}
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={12} md={4}>
                    <Skeleton variant="text" width={90} height={18} />
                    <Skeleton
                      variant="rounded"
                      height={42}
                      sx={{ borderRadius: 1.5 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Skeleton variant="text" width={70} height={18} />
                    <Skeleton
                      variant="rounded"
                      height={42}
                      sx={{ borderRadius: 1.5 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Skeleton variant="text" width={110} height={18} />
                    <Skeleton
                      variant="rounded"
                      height={42}
                      sx={{ borderRadius: 1.5 }}
                    />
                  </Grid>
                </Grid>

                {/* Add to Cart button */}
                <Box mt={1}>
                  <Skeleton
                    variant="rounded"
                    height={44}
                    width={220}
                    sx={{ borderRadius: 2 }}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}
