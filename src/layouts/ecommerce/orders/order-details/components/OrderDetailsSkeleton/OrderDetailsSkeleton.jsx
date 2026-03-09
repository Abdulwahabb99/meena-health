import React from "react";
import { Card, Grid, Divider, Skeleton, Stack, Box } from "@mui/material";
import MDBox from "components/MDBox";

export default function OrderDetailsSkeleton() {
  return (
    <MDBox my={6}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={8}>
          <Card>
            <MDBox pt={2} px={2}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={12} md="auto">
                  <Stack spacing={1}>
                    <Skeleton variant="text" width={180} height={28} />{" "}
                    <Skeleton variant="text" width={260} height={18} />{" "}
                    <Skeleton variant="text" width={140} height={18} />{" "}
                  </Stack>
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={1}>
                    <Skeleton variant="rounded" width={92} height={36} />
                    <Skeleton variant="rounded" width={120} height={36} />
                  </Stack>
                </Grid>
              </Grid>
            </MDBox>

            <Divider />

            <MDBox pt={1} pb={3} px={2}>
              <MDBox mb={3}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <Skeleton variant="circular" width={72} height={72} />
                  </Grid>
                  <Grid item xs>
                    <Stack spacing={1}>
                      <Skeleton variant="text" width={180} height={24} />{" "}
                      <Skeleton variant="rounded" width={88} height={24} />{" "}
                      <Skeleton variant="text" width={210} height={16} />{" "}
                    </Stack>
                  </Grid>
                </Grid>
              </MDBox>

              <Divider />

              <MDBox mt={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={3}>
                    <Stack spacing={3}>
                      {[1, 2, 3, 4].map((i) => (
                        <Grid
                          container
                          key={i}
                          alignItems="center"
                          wrap="nowrap"
                          columnGap={2}
                        >
                          <Grid item>
                            <Skeleton
                              variant="circular"
                              width={32}
                              height={32}
                            />
                          </Grid>
                          <Grid item xs>
                            <Skeleton variant="text" height={18} width="70%" />
                            <Skeleton variant="text" height={14} width="50%" />
                          </Grid>
                        </Grid>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={6} lg={5}>
                    <Stack spacing={1} mb={3}>
                      <Skeleton variant="text" width={150} height={22} />
                      <Skeleton variant="rounded" height={56} />
                    </Stack>
                    <Box>
                      <Skeleton variant="text" width={180} height={22} />
                      <MDBox
                        mt={1}
                        p={2}
                        sx={{
                          borderRadius: 2,
                          border: "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        <Stack spacing={1}>
                          <Skeleton variant="text" width="50%" height={18} />
                          <Skeleton variant="text" width="70%" height={18} />
                          <Skeleton variant="text" width="60%" height={18} />
                          <Skeleton variant="text" width="55%" height={18} />
                        </Stack>
                      </MDBox>
                    </Box>
                  </Grid>

                  <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                    <Stack spacing={1} mb={2}>
                      <Skeleton variant="text" width={150} height={22} />
                    </Stack>
                    <Stack spacing={1.2}>
                      {[1, 2, 3].map((i) => (
                        <Grid container justifyContent="space-between" key={i}>
                          <Skeleton variant="text" width={90} height={18} />
                          <Skeleton variant="text" width={60} height={18} />
                        </Grid>
                      ))}
                      <Divider sx={{ my: 1 }} />
                      <Grid container justifyContent="space-between">
                        <Skeleton variant="text" width={70} height={22} />
                        <Skeleton variant="text" width={80} height={24} />
                      </Grid>
                      <Skeleton variant="rounded" height={40} sx={{ mt: 1 }} />
                    </Stack>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
