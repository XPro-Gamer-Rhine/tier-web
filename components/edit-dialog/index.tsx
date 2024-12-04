import { useConvoDashboardStore } from "@/store/useConvoDashboardStore";
import { Close, Save } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
  SlideProps,
} from "@mui/material";
import React, { ReactNode, FormEvent } from "react";

const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

interface EditDialogWrapperProps {
  children: ReactNode;
  dialogType: string;
  title: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const EditDialogWrapper: React.FC<EditDialogWrapperProps> = ({
  children,
  dialogType,
  title,
  onSubmit,
}) => {
  const dialogState = useConvoDashboardStore((state: any) => state.editDialog);

  const changeDialogState = useConvoDashboardStore(
    (state: any) => state.setEditDialog
  );

  const handleClose = () => {
    changeDialogState({ isOpen: false, forItem: "team" });
  };

  const handleFormSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    onSubmit(event as unknown as FormEvent<HTMLFormElement>);
  };

  return (
    <Dialog
      open={dialogState.isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      maxWidth={false}
      fullScreen={false}
      component="form"
      onSubmit={handleFormSubmit}
      PaperProps={{
        sx: {
          width: "50vw",
          height: "100vh",
          maxHeight: "100vh",
          position: "absolute",
          right: 0,
          margin: 0,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="span">
          {title}
        </Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>

      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          sx={{ marginRight: "auto" }}
          type="submit"
        >
          Save
        </Button>
        <Button variant="outlined" onClick={handleClose} startIcon={<Close />}>
          Discard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialogWrapper;
