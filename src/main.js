
import "./styles/globals.css";

import {
  initializeProductos,
  getProductos,
  findProducto,
  createProducto,
  updateProducto,
  deleteProducto,
} from "./services/productService.js";
import {
  loadProductos,
  saveProductos,
  getSavedTheme,
  saveTheme,
} from "./services/storageService.js";
import { applyTheme } from "./services/themeService.js";
import { renderTabla } from "./components/table.js";
import { actualizarDashboard } from "./components/dashboard.js";
import {
  abrirModal,
  cerrarModal,
  validarModal,
  obtenerDatosModal,
} from "./components/modal.js";
import { toast } from "./components/toast.js";

const elements = {
  tablaBody: document.getElementById("tablaBody"),
  emptyRow: document.getElementById("emptyRow"),
  busqueda: document.getElementById("busqueda"),
  modalOverlay: document.getElementById("modalOverlay"),
  btnNuevo: document.getElementById("btnNuevo"),
  btnGuardar: document.getElementById("btnGuardar"),
  btnCancelar: document.getElementById("btnCancelar"),
  editId: document.getElementById("editId"),
  fNombre: document.getElementById("fNombre"),
  fPrecio: document.getElementById("fPrecio"),
  fStock: document.getElementById("fStock"),
  fCategoria: document.getElementById("fCategoria"),
  modalTitle: document.getElementById("modalTitle"),
  errNombre: document.getElementById("errNombre"),
  errPrecio: document.getElementById("errPrecio"),
  errStock: document.getElementById("errStock"),
  toastWrap: document.getElementById("toastWrap"),
  itemsCount: document.getElementById("itemsCount"),
  themeToggle: document.querySelector("#themeToggle"),
  toggleIcon: document.querySelector("#toggleIcon"),
  toggleLabel: document.querySelector("#toggleLabel"),
  html: document.documentElement,
  statTotal: document.getElementById("statTotal"),
  statValor: document.getElementById("statValor"),
  statBajo: document.getElementById("statBajo"),
  statProm: document.getElementById("statProm"),
};

let sortActual = "nombre";
let filtro = "";

const renderApp = (resaltarId = null) => {
  renderTabla({
    productos: getProductos(),
    filtro,
    sortActual,
    tablaBody: elements.tablaBody,
    emptyRow: elements.emptyRow,
    itemsCount: elements.itemsCount,
    onEdit: abrirEditar,
    onDelete: borrarProducto,
    resaltarId,
  });

  actualizarDashboard(getProductos(), {
    statTotal: elements.statTotal,
    statValor: elements.statValor,
    statBajo: elements.statBajo,
    statProm: elements.statProm,
  });
};

const abrirEditar = (id) => {
  const producto = findProducto(id);
  if (producto) abrirModal(elements, producto);
};

const guardarProducto = () => {
  if (!validarModal(elements)) return;

  const datos = obtenerDatosModal(elements);
  if (datos.id) {
    const actualizado = updateProducto(datos.id, datos);
    if (!actualizado) return;
    saveProductos(getProductos());
    cerrarModal(elements);
    renderApp(datos.id);
    toast(elements.toastWrap, `"${actualizado.nombre}" actualizado`, "yellow");
    return;
  }

  const nuevo = createProducto(datos);
  saveProductos(getProductos());
  cerrarModal(elements);
  renderApp(nuevo.id);
  toast(elements.toastWrap, `Producto "${nuevo.nombre}" agregado`, "green");
};

const borrarProducto = (id) => {
  const producto = findProducto(id);
  if (!producto) return;

  if (!confirm(`¿Eliminar "${producto.nombre}"?`)) return;
  deleteProducto(id);
  saveProductos(getProductos());
  renderApp();
  toast(elements.toastWrap, `"${producto.nombre}" eliminado`, "red");
};

const inicializarEventos = () => {
  elements.btnNuevo.addEventListener("click", () => abrirModal(elements));
  elements.btnCancelar.addEventListener("click", () => cerrarModal(elements));

  elements.modalOverlay.addEventListener("click", (event) => {
    if (event.target === elements.modalOverlay) cerrarModal(elements);
  });

  elements.btnGuardar.addEventListener("click", guardarProducto);

  [elements.fNombre, elements.fPrecio, elements.fStock].forEach((input) =>
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      guardarProducto();
    }),
  );

  elements.busqueda.addEventListener("input", () => {
    filtro = elements.busqueda.value;
    renderApp();
  });

  document.querySelectorAll(".sort-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".sort-btn").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      sortActual = button.dataset.sort;
      renderApp();
    });
  });

  elements.themeToggle.addEventListener("click", () => {
    const nuevoTema =
      elements.html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(elements, nuevoTema);
    saveTheme(nuevoTema);
  });
};

const iniciarApp = () => {
  initializeProductos(loadProductos, saveProductos);
  const temaGuardado = getSavedTheme();
  applyTheme(elements, temaGuardado);
  inicializarEventos();
  renderApp();
};

iniciarApp();
