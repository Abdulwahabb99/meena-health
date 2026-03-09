import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Icon,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
// import { useDeleteRole } from "services/mutations/roles/useDeleteRole";

export default function DeleteRoleDialog({ open, onClose, roleId }) {
  // const { mutate: deleteRoleMutation, isPending: isDeleteLoading } = useDeleteRole({ ... });
  const isDeleteLoading = false;

  const handleDelete = () => {
    toast.success("تم حذف الدور بنجاح");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            borderRadius: "50%",
            backgroundColor: "#FEF9F9",
            width: "fit-content",
          }}
        >
          {" "}
          <Icon color="error">delete</Icon>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography>هل أنت متأكد أنك تريد حذف الدور </Typography>
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={onClose} disabled={isDeleteLoading}>
          إلغاء
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "#FFF",
            backgroundColor: "#F75555",
            "&:hover": {
              backgroundColor: "#d63f3f",
            },
            "&:focus": {
              outline: "none",
              backgroundColor: "#d63f3f",
            },
            "&:active": {
              backgroundColor: "#d63f3f",
              boxShadow: "none",
            },
          }}
          disableElevation
          onClick={handleDelete}
          disabled={isDeleteLoading}
        >
          {isDeleteLoading ? (
            <CircularProgress
              size={22}
              sx={{
                color: "#000",
              }}
            />
          ) : (
            "حذف"
          )}
        </Button>{" "}
      </DialogActions>
    </Dialog>
  );
}
