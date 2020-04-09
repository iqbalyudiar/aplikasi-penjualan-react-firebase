import React from "react";

// material-ui

import { CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

const AppLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loadingBox}>
      <CircularProgress />
    </div>
  );
};

export default AppLoading;
