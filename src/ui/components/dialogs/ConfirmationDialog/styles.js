import { Button, makeStyles, withStyles } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1f46a1",
  },
  text: {
    fontSize: 30,
    marginBottom: 30,
  },
  withdrawValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1f46a1",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const OkButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
    fontSize: 36,
    fontWeight: "bold",
  },
}))(Button);

export const CancelButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[900],
    },
    fontSize: 36,
    fontWeight: "bold",
  },
}))(Button);

export default useStyles;
