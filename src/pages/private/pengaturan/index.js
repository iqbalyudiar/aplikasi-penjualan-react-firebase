import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

//komponen halaman pengguna
import Pengguna from "./pengguna";
import Toko from "./toko";

const Pengaturan = () => {
  return (
    <Switch>
      <Route path="/pengaturan/pengguna" component={Pengguna} />
      <Route path="/pengaturan/toko" component={Toko} />
      <Redirect to="/pengaturan/pengguna" />
    </Switch>
  );
};

export default Pengaturan;
