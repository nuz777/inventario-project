export const STORAGE_KEY = "stockpro_productos";
const THEME_KEY = "stockpro_tema";

export const saveProductos = (productos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
  console.log(
    "%c[Storage] Inventario guardado:",
    "color:#f5c518",
    productos.length,
    "productos",
  );
};

export const loadProductos = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
};

export const getSavedTheme = () => localStorage.getItem(THEME_KEY) || "dark";

export const saveTheme = (theme) => localStorage.setItem(THEME_KEY, theme);
