import { fmt$, stockClass, stockLabel } from "../utils/helpers.js";

export const renderTabla = ({
  productos,
  filtro,
  sortActual,
  tablaBody,
  emptyRow,
  itemsCount,
  onEdit,
  onDelete,
  resaltarId = null,
}) => {
  const lista = filtro
    ? productos.filter(
        (producto) =>
          producto.nombre.toLowerCase().includes(filtro.toLowerCase().trim()) ||
          producto.categoria.toLowerCase().includes(filtro.toLowerCase().trim()),
      )
    : [...productos];

  lista.sort((a, b) => {
    if (sortActual === "nombre") return a.nombre.localeCompare(b.nombre);
    if (sortActual === "precio") return a.precio - b.precio;
    if (sortActual === "stock") return a.stock - b.stock;
    return 0;
  });

  tablaBody.querySelectorAll("tr:not(#emptyRow)").forEach((row) => row.remove());
  itemsCount.textContent = `${lista.length} producto${lista.length !== 1 ? "s" : ""}`;

  if (!lista.length) {
    emptyRow.style.display = "";
    return;
  }

  emptyRow.style.display = "none";

  lista.forEach((producto, index) => {
    const fila = document.createElement("tr");
    if (producto.id === resaltarId) fila.classList.add("new-row");

    fila.innerHTML = `
      <td><span style="color:var(--muted);font-size:.7rem">${String(index + 1).padStart(2, "0")}</span></td>
      <td class="td-name">${producto.nombre}</td>
      <td class="td-cat"><span>${producto.categoria}</span></td>
      <td class="td-stock"><span class="stock-badge ${stockClass(producto.stock)}">${stockLabel(producto.stock)}</span></td>
      <td class="td-price" style="text-align:right">${fmt$(producto.precio)}</td>
      <td class="td-actions">
        <button class="btn-edit" data-id="${producto.id}">Editar</button>
        <button class="btn-del" data-id="${producto.id}">Borrar</button>
      </td>
    `;

    tablaBody.appendChild(fila);
  });

  tablaBody.querySelectorAll(".btn-edit").forEach((button) => {
    button.addEventListener("click", () => onEdit(button.dataset.id));
  });

  tablaBody.querySelectorAll(".btn-del").forEach((button) => {
    button.addEventListener("click", () => onDelete(button.dataset.id));
  });
};
