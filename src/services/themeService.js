import { SUN_ICON, MOON_ICON } from "../utils/icons.js";

export const getSavedTheme = () =>
  localStorage.getItem("stockpro_tema") || "dark";

export const saveTheme = (theme) =>
  localStorage.setItem("stockpro_tema", theme);

export const applyTheme = ({ html, toggleIcon, toggleLabel }, theme) => {
  html.setAttribute("data-theme", theme);
  toggleIcon.innerHTML = theme === "dark" ? SUN_ICON : MOON_ICON;
  toggleLabel.textContent = theme === "dark" ? "Claro" : "Oscuro";
};
