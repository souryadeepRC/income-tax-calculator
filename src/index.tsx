import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "react-web-theme";
// component
import App from "./App";
// style
import "./index.scss";
// store
import { rootStore } from "src/store/root-store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={rootStore}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
