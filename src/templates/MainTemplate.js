import React from "react";
import Home from "../components/FirebaseAuth/Home";
import { Switch, Route } from "react-router-dom";
import { routes } from "../routes/loggedUserRoutes";

const MainTemplate = () => {
  return (
    <Switch>
      <Route exact path={routes.home} component={Home} />
    </Switch>
  );
};

export default MainTemplate;
