import { uid, hoy } from "../utils/helpers.js";

let productos = [];

const exampleProducts = [
  {
    id: uid(),
    nombre: "Café molido 500g",
    precio: 12500,
    stock: 18,
    categoria: "Alimentos",
    fecha: hoy(),
  },
  {
    id: uid(),
    nombre: "Agua mineral 1.5L",
    precio: 2200,
    stock: 42,
    categoria: "Bebidas",
    fecha: hoy(),
  },
  {
    id: uid(),
    nombre: "Cuaderno A4 100h",
    precio: 4800,
    stock: 3,
    categoria: "Papelería",
    fecha: hoy(),
  },
  {
    id: uid(),
    nombre: "Jabón antibacterial",
    precio: 3500,
    stock: 0,
    categoria: "Limpieza",
    fecha: hoy(),
  },
];

export const initializeProductos = (loadFn, saveFn) => {
  const loaded = loadFn();
  if (loaded && loaded.length) {
    productos = loaded;
    console.log(
      `%c[Storage] Cargados ${productos.length} productos desde Local Storage`,
      "color:#f5c518",
    );
    return;
  }

  productos = exampleProducts;
  saveFn(productos);
  console.log("%c[Storage] Datos de ejemplo cargados", "color:#7a7a8a");
};

export const getProductos = () => productos;

export const findProducto = (id) => productos.find((producto) => producto.id === id);

export const createProducto = ({ nombre, precio, stock, categoria }) => {
  const nuevo = {
    id: uid(),
    nombre,
    precio,
    stock,
    categoria,
    fecha: hoy(),
  };
  productos.push(nuevo);
  return nuevo;
};

export const updateProducto = (id, data) => {
  const index = productos.findIndex((producto) => producto.id === id);
  if (index === -1) return null;
  productos[index] = {
    ...productos[index],
    nombre: data.nombre,
    precio: data.precio,
    stock: data.stock,
    categoria: data.categoria,
  };
  return productos[index];
};

export const deleteProducto = (id) => {
  const producto = findProducto(id);
  if (!producto) return null;
  productos = productos.filter((item) => item.id !== id);
  return producto;
};

export const filterAndSortProductos = (filtro, sortKey) => {
  const query = filtro.toLowerCase().trim();
  const lista = query
    ? productos.filter(
        (p) =>
          p.nombre.toLowerCase().includes(query) ||
          p.categoria.toLowerCase().includes(query),
      )
    : [...productos];

  lista.sort((a, b) => {
    if (sortKey === "nombre") return a.nombre.localeCompare(b.nombre);
    if (sortKey === "precio") return a.precio - b.precio;
    if (sortKey === "stock") return a.stock - b.stock;
    return 0;
  });

  return lista;
};
