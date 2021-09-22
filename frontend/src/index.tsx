import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { history } from "src/utils/history";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
