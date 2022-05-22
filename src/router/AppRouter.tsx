import React from "react";
import { Routes } from "./index";
import { Redirect, Switch, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <Switch>
      {Routes.map((route) => (
        <Route
          component={route.component}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}
      <Redirect to="/" />
    </Switch>
  );
};
