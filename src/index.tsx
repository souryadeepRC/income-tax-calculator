import React from "react";
import ReactDOM from "react-dom/client";
// library
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "react-web-theme";
// component
import { App, AppDependency } from "src/application";
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
        <BrowserRouter>
          <AppDependency>
            <App />
          </AppDependency>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
