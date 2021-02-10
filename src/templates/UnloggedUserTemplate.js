import React from "react";
import { Switch, Route } from "react-router-dom";
import FirebaseRegisterForm from "../components/FirebaseAuth/FirebaseRegisterForm";
import FirebaseLoginForm from "../components/FirebaseAuth/FirebaseLoginForm";
import { routes } from "../routes/unloggedUserRoutes";

const UnloggedUserTemplate = () => {
  return (
    <Switch>
      <Route exact path={routes.login} component={FirebaseLoginForm} />
      <Route exact path={routes.register} component={FirebaseRegisterForm} />
    </Switch>
  );
};

export default UnloggedUserTemplate;
