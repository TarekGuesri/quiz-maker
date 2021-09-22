import React, { FC, Suspense, lazy } from "react";
import Container from "@mui/material/Container";
import { Route, Switch } from "react-router-dom";
import { Loading } from "src/components/layout/loading";
import { Navbar } from "src/components/layout/navbar";
import { Theme } from "src/components/theme";

import { routes } from "./routes";
import "./App.css";

const App: FC = () => {
  return (
    <Theme>
      <Suspense fallback={<Loading />}>
        <Container maxWidth="md">
          <Navbar />
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={`route-${index}`}
                component={lazy(() => route.component)}
                path={route.path}
                exact={route.exact}
              />
            ))}
          </Switch>
        </Container>
      </Suspense>
    </Theme>
  );
};

export default App;
