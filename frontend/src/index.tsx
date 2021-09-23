import App from "./app";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { history } from "src/utils/history";

import { store } from "./redux/store";

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
