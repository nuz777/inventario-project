import { fmt$ } from "../utils/helpers.js";

export const actualizarDashboard = (productos, elements) => {
  const total = productos.length;
  const valor = productos.reduce((acc, producto) => acc + producto.precio * producto.stock, 0);
  const bajo = productos.filter((producto) => producto.stock < 5).length;
  const promedio = total
    ? productos.reduce((acc, producto) => acc + producto.precio, 0) / total
    : 0;

  elements.statTotal.textContent = total;
  elements.statValor.textContent = fmt$(valor);
  elements.statBajo.textContent = bajo;
  elements.statProm.textContent = fmt$(promedio);
};
