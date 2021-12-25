import { Button, makeStyles, withStyles } from "@material-ui/core";
import { green, grey, red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1f46a1",
    display: "flex",
    justifyContent: "center",
  },
  inputContainer: {
    width: 550,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    width: 400,
    height: 100,
    padding: 10,
    fontSize: 64,
    textAlign: "center",
    backgroundColor: "#fff",
    border: "3px solid #152f6e",
    borderRadius: 10,

    "&:focus": {
      border: "5px solid #2688c9",
    },
  },
  errorMsg: {
    fontSize: 36,
    color: red[500],
  },
  actionsContainer: {
    margin: "5px 0",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const OkButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[500],
    fontSize: 36,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: green[700],
    },
    "&:disabled": {
      backgroundColor: grey[500],
    },
  },
}))(Button);

export const CancelButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    fontSize: 36,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: red[900],
    },
  },
}))(Button);

export default useStyles;
