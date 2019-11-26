import { render, waitForElement } from "@testing-library/react";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import UserForm from "./components/user-forms/UserForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("should render UserForm without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
