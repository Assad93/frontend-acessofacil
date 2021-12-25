import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import useStyles, { CancelButton, OkButton } from "./styles";

function ConfirmationDialog({ onClose, open, value, type, ...other }) {
  const classes = useStyles();
  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  return (
    <Dialog
      maxWidth="md"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        <span className={classes.title}>Confirmação de {type}</span>
      </DialogTitle>
      <DialogContent className={classes.text}>
        Você deseja confirmar {type === "transferência" ? "a" : "o"} {type} no
        valor de{" "}
        <NumberFormat
          value={value}
          displayType={"text"}
          thousandSeparator={"."}
          decimalSeparator={","}
          prefix={"R$"}
          className={classes.withdrawValue}
        />
      </DialogContent>
      <DialogActions className={classes.actionsContainer}>
        <CancelButton autoFocus onClick={handleCancel} color="secondary">
          Cancelar
        </CancelButton>
        <OkButton onClick={handleOk}>Confirmar</OkButton>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ConfirmationDialog;
