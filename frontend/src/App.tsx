import "./app.css";
import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import Container from "@mui/material/Container";
import { Navbar } from "src/components/layout/navbar";
import { Theme } from "src/components/theme";

import { routes } from "./routes";

const App: FC = () => {
  return (
    <Theme>
      <Container maxWidth="md">
        <Navbar />
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={`route-${index}`}
              component={route.component}
              path={route.path}
              exact={route.exact}
            />
          ))}
        </Switch>
      </Container>
    </Theme>
  );
};

export default App;
