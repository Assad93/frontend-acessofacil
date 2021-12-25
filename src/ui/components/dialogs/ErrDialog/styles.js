import { Button, makeStyles, withStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(() => ({
  dialogTitle: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ff0000",
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 1.6,
    marginBottom: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  withdrawValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1f46a1",
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  errIcon: {
    fontSize: 100,
    color: "#ff0000",
  },
}));

export const OkButton = withStyles((theme) => ({
  root: {
    width: 200,
    marginBottom: 20,
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
    fontSize: 36,
  },
}))(Button);

export default useStyles;
