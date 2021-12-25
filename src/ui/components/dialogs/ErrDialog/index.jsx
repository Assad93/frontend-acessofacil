import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import ErrIcon from "@material-ui/icons/Error";
import useStyles, { OkButton } from "./styles";

function ErrDialog({ onClose, open, msg, ...other }) {
  const classes = useStyles();

  const handleOk = () => {
    onClose();
  };

  return (
    <Dialog
      maxWidth="md"
      aria-labelledby="error-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle
        id="confirmation-dialog-title"
        className={classes.dialogTitle}
      >
        <span className={classes.title}>ERRO</span>
      </DialogTitle>
      <DialogContent className={classes.text}>
        <ErrIcon className={classes.errIcon} />
        {msg}
      </DialogContent>
      <DialogActions className={classes.actionsContainer}>
        <OkButton onClick={handleOk}>Ok</OkButton>
      </DialogActions>
    </Dialog>
  );
}

ErrDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ErrDialog;
