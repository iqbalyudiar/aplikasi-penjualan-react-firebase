import React from "react";

// material-ui

import { Container, LinearProgress, Typography } from "@material-ui/core";
import useStyles from "./styles";

const AppLoading = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <div className={classes.loadingBox}>
        <Typography variant="h6" component="h2" className={classes.title}>
          Aplikasi Penjualan
        </Typography>
        <LinearProgress />
      </div>
    </Container>
  );
};

export default AppLoading;
