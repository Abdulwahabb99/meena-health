import React from "react";
import { Box, ListItem, Skeleton } from "@mui/material";

export default function PermissionsListSkeleton({ rows = 10 }) {
  return (
    <Box>
      {Array.from({ length: rows }).map((_, i) => (
        <ListItem key={i} divider sx={{ py: 0.5, px: 1.5 }}>
          <Skeleton
            variant="rounded"
            width={20}
            height={20}
            sx={{ borderRadius: "4px", flexShrink: 0 }}
          />
          <Box sx={{ mx: 1, width: "100%" }}>
            <Skeleton variant="text" width="35%" height={22} />
            <Skeleton variant="text" width="18%" height={16} sx={{ mt: 0.5 }} />
          </Box>
        </ListItem>
      ))}
    </Box>
  );
}
