export const toast = (toastWrap, message, tipo = "green") => {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="toast-dot ${tipo}"></span>${message}`;
  toastWrap.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("out");
    toast.addEventListener("animationend", () => toast.remove());
  }, 2800);
};
