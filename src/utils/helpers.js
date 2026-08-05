export const uid = () => `p_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

export const hoy = () =>
  new Date().toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const fmt$ = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);

export const stockClass = (stock) =>
  stock === 0 ? "stock-out" : stock < 5 ? "stock-low" : "stock-ok";

export const stockLabel = (stock) =>
  stock === 0 ? "Agotado" : stock < 5 ? `${stock} bajo` : `${stock}`;
