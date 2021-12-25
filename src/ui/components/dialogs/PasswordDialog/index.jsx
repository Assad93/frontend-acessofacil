import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import useConsts from "../../../../hooks/useConsts";
import { AuthContext } from "../../../../store/AuthProvider";
import useStyles, { CancelButton, OkButton } from "./styles";
import PropTypes from "prop-types";

function PasswordDialog({ onClose, open, fn, ...other }) {
  let history = useHistory();
  const classes = useStyles();
  const [API_URL, REQ_SIMPLE_CONFIG] = useConsts();
  const { userId } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [err, isErr] = useState(false);

  const handleCancel = () => {
    isErr(false);
    onClose();
  };

  const handleOk = () => {
    auth();
  };

  async function auth() {
    const reqData = {
      id: userId,
      password,
    };
    try {
      const response = await axios
        .post(`${API_URL}/passwordAuth`, reqData, REQ_SIMPLE_CONFIG)
        .catch(function (error) {
          if (error.response.status === 401) {
            isErr(true);
          }
        });

      if (response) {
        fn(true);
        onClose();
      }
    } catch (error) {
      history.push("/error");
    }
  }

  return (
    <Dialog
      maxWidth="md"
      aria-labelledby="password-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="password-dialog-title">
        <span className={classes.title}>Digite sua senha</span>
      </DialogTitle>
      <DialogContent className={classes.inputContainer}>
        <input
          className={classes.input}
          type="password"
          maxLength="6"
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <span className={classes.errorMsg}>Senha Inválida!</span>}
      </DialogContent>
      <DialogActions className={classes.actionsContainer}>
        <CancelButton autoFocus onClick={handleCancel} color="secondary">
          Cancelar
        </CancelButton>
        <OkButton onClick={handleOk} disabled={!password}>
          Confirmar
        </OkButton>
      </DialogActions>
    </Dialog>
  );
}

PasswordDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default PasswordDialog;
