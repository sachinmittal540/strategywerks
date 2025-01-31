// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { StyleProvider } from "@ant-design/cssinjs";
import Navbar from "./components/Navbar";
import store from "./redux/store/store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <StyleProvider hashPriority="high">
      <Navbar />
      <App />
    </StyleProvider>
  </Provider>,
  document.getElementById("root")
);
