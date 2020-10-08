import React from "react";
import ReactDOM from "react-dom";
import ListarMoedas from "./ListarMoedas";

describe("Componente de listar moedas", () => {
  it("deve renderizar o componente", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ListarMoedas />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
