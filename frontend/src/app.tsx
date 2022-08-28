import "./app.css";
import React, { FC } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Container from "@mui/material/Container";
import { Navbar } from "src/components/layout/navbar";
import { Footer } from "src/components/layout/footer";
import { Theme } from "src/components/theme";
import { config } from "src/config";

import { routes } from "./routes";

axios.defaults.baseURL = `${config.api.url}/rest`;

const App: FC = () => {
  return (
    <Theme>
      <Container maxWidth="lg">
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
        <Footer />
      </Container>
    </Theme>
  );
};

export default App;
