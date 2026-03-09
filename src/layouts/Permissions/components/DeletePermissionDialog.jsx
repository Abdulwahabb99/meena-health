import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDeletePermission } from "services/mutations/permissions/useDeletePermission";

export default function DeletePermissionDialog({
  open,
  onClose,
  permissionId,
}) {
  const { mutate: deletePermissionMutation, isPending: isDeleteLoading } =
    useDeletePermission({
      onSuccess: () => {
        toast.success("تم حذف الصلاحية بنجاح");
        onClose();
      },
      onError: (error) => {
        toast.error(`حدث خطأ: ${error.message}`);
      },
    });

  const handleDelete = () => {
    deletePermissionMutation({ permissionId });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: "center" }}>تأكيد الحذف</DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography>هل أنت متأكد أنك تريد حذف الصلاحية </Typography>
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
                color: "#FFF",
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
