import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loadingBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    height: "50vh",
  },
}));

export default useStyles;
