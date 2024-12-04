import React from "react";
import {
  Archive,
  GroupRemove,
  PersonOff,
  RemoveCircleOutline,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useConvoDashboardStore } from "@/store/useConvoDashboardStore";

interface DialogState {
  isOpen: boolean;
  forItem: "admin" | "sr" | "team" | string;
  onOk: () => void;
}

const IconMapper: Record<string, JSX.Element> = {
  admin: <PersonOff style={{ color: "#F44336", fontSize: 50 }} />,
  sr: <Archive style={{ fill: "#F44336", fontSize: 50 }} />,
  team: <GroupRemove style={{ color: "#F44336", fontSize: 50 }} />,
  default: <RemoveCircleOutline style={{ color: "#F44336", fontSize: 50 }} />,
};

export const DeleteDialog: React.FC = () => {
  const dialogState = useConvoDashboardStore(
    (state: any) => state.deleteDialog
  ) as DialogState;

  const changeDialogState = useConvoDashboardStore(
    (state: any) => state.setDeleteDialog
  );

  const closeDialog = (): void => {
    changeDialogState({ isOpen: false });
  };

  const handleDelete = (): void => {
    changeDialogState({ isOpen: false });
    dialogState.onOk();
  };

  return (
    <Dialog
      open={dialogState.isOpen}
      onClose={closeDialog}
      maxWidth="xs"
      sx={{ textAlign: "center" }}
      PaperProps={{ sx: { padding: 1 } }}
    >
      <DialogTitle>
        {(dialogState.isOpen && IconMapper[dialogState.forItem]) ??
          IconMapper.default}

        <Typography
          variant="h6"
          style={{ marginTop: "10px", textTransform: "capitalize" }}
        >
          Delete {dialogState.forItem}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this {dialogState.forItem}?
          <br />
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions
        style={{ justifyContent: "center", paddingBottom: "20px" }}
      >
        <Button
          fullWidth
          color="error"
          variant="contained"
          onClick={handleDelete}
        >
          Yes
        </Button>
        <Button fullWidth variant="outlined" onClick={closeDialog} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
