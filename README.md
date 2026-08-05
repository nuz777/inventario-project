# StockPro · Inventario — Módulo 3 JavaScript ^_^

Aplicación web completa que integra los conceptos fundamentales del **Módulo 3**:
manipulación del DOM, Local Storage y Fetch API con operaciones CRUD.

---

## Estructura del proyecto

```
inventario-project/
├── index.html              ← TASK 1: HTML principal con formulario y lista
├── app.js                  ← TASK 1-6: Lógica de Fetch API, DOM y LocalStorage
├── db.json                 ← Base de datos de JSON Server
├── package.json
└── src/
    ├── main.js             ← Lógica principal del inventario (módulos ES6)
    ├── styles/
    │   └── globals.css     ← Estilos globales + panel API
    ├── components/
    │   ├── dashboard.js    ← Estadísticas del dashboard
    │   ├── modal.js        ← Modal de agregar/editar producto
    │   ├── table.js        ← Tabla de inventario
    │   └── toast.js        ← Notificaciones toast
    ├── services/
    │   ├── productService.js   ← CRUD en memoria
    │   ├── storageService.js   ← Local Storage
    │   └── themeService.js     ← Tema claro/oscuro
    └── utils/
        └── helpers.js      ← Utilidades (uid, formato de moneda, etc.)
```

---

## Tareas implementadas

| Task | Concepto | Ubicación |
|------|----------|-----------|
| TASK 1 | Estructura de archivos, comentarios, enlace JS | `index.html`, `app.js` |
| TASK 2 | Validación de inputs, mensajes DOM dinámicos | `app.js` → `validarProducto`, `mostrarMensajeDom` |
| TASK 3 | `createElement`, `appendChild`, `removeChild` | `app.js` → `agregarItemListaDom`, `quitarItemListaDom` |
| TASK 4 | `localStorage.setItem/getItem`, persistencia entre sesiones | `app.js` → `guardarEnStorage`, `cargarDeStorage` |
| TASK 5 | Fetch API: GET, POST, PUT, DELETE con `async/await` + `try/catch` | `app.js` → `obtenerProductosDeApi`, `crearProductoEnApi`, `actualizarEnApi`, `eliminarDeApi` |
| TASK 6 | Validaciones cruzadas, DOM + LocalStorage + API en conjunto | `app.js` → `sincronizarConApi`, `inicializarModuloApi` |

---

## Cómo ejecutar

### Opción A — Ambos servidores simultáneamente
```bash
npm install
npm run start
```
Esto levanta Vite (puerto 5173) y JSON Server (puerto 3000) al mismo tiempo.

### Opción B — Por separado

**Terminal 1 — Servidor de desarrollo:**
```bash
npm run dev
```

**Terminal 2 — API local (JSON Server):**
```bash
npm run api
# o directamente:
npx json-server db.json --port 3000
```

Abre el navegador en `http://localhost:5173`

---

## Uso del panel Fetch API

El panel aparece al fondo de la página con estos botones:

- ** Sincronizar con API** → Hace GET para ver qué hay en el servidor, luego POST de los productos nuevos del inventario local
- ** Cargar del servidor** → Hace GET y muestra la lista en el DOM
- ** Limpiar caché** → Limpia el LocalStorage del panel API (el inventario principal no se afecta)

En cada fila de producto del panel:
- **Actualizar API** → Hace PUT incrementando el stock (demo de PUT)
- **Eliminar API** → Hace DELETE y remueve el elemento del DOM con `removeChild`

---

## Estructuras de datos ES6 utilizadas

```js
// Array global para el estado en memoria
let productosEnMemoria = [];

// Set: registro de IDs sincronizados (sin duplicados)
const idsSincronizados = new Set();

// Map: registro de errores por tipo de operación
const mapaErrores = new Map();
```

---

## Consola del navegador

Abre las DevTools → Console para ver los logs de cada operación:

```
[Storage] Cargados 4 productos desde Local Storage
[API] GET → http://localhost:3000/productos
[API] GET ✓ Recibidos: 4 productos
[API] POST → http://localhost:3000/productos { nombre: "...", ... }
[API] POST ✓ Creado: { id: 1, nombre: "...", ... }
[API] PUT → http://localhost:3000/productos/1 { ... }
[API] DELETE → http://localhost:3000/productos/2
```
