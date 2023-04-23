import React from "react";
import ReactDOM from "react-dom";

import "./styles/main.scss";

const App = () => <div>hello northwind!</div>;

export function bootstrapApp() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
