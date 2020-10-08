import React from "react";
import ReactDOM from "react-dom";
import Conversor from "./conversor";

test("deve renderizar o projeto", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Conversor />, div);
  ReactDOM.unmountComponentAtNode(div);
});
