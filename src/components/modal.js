export const abrirModal = (elements, datos = null) => {
  elements.modalTitle.innerHTML = `${datos ? "Editar" : "Nuevo"} <span>Producto</span>`;
  elements.editId.value = datos?.id ?? "";
  elements.fNombre.value = datos?.nombre ?? "";
  elements.fPrecio.value = datos?.precio ?? "";
  elements.fStock.value = datos?.stock ?? "";
  elements.fCategoria.value = datos?.categoria ?? "General";
  limpiarErrores(elements);
  elements.modalOverlay.classList.add("open");
  elements.fNombre.focus();
};

export const cerrarModal = (elements) => {
  elements.modalOverlay.classList.remove("open");
  limpiarErrores(elements);
};

export const limpiarErrores = (elements) => {
  elements.errNombre.textContent = "";
  elements.errPrecio.textContent = "";
  elements.errStock.textContent = "";
};

export const validarModal = (elements) => {
  let ok = true;
  const nombre = elements.fNombre.value.trim();
  const precio = elements.fPrecio.value;
  const stock = elements.fStock.value;

  if (!nombre) {
    elements.errNombre.textContent = "El nombre es obligatorio";
    ok = false;
  }

  if (precio === "" || isNaN(+precio) || +precio < 0) {
    elements.errPrecio.textContent = "Precio inválido";
    ok = false;
  }

  if (stock === "" || isNaN(+stock) || +stock < 0) {
    elements.errStock.textContent = "Stock inválido";
    ok = false;
  }

  return ok;
};

export const obtenerDatosModal = (elements) => ({
  id: elements.editId.value,
  nombre: elements.fNombre.value.trim(),
  precio: parseFloat(elements.fPrecio.value),
  stock: parseInt(elements.fStock.value, 10),
  categoria: elements.fCategoria.value,
});
