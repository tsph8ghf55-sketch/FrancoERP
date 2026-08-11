# Franco el Viajero — Componentes React

Conversión de las páginas `.html`/`.css` a componentes `.jsx` sueltos, listos para integrar
en tu mini ERP. Mantiene Bootstrap 5 y tus hojas de estilo originales tal cual.

## Estructura

```
franco-jsx/
├── components/
│   ├── Navbar.jsx      → navbar compartido (recibe prop activePage)
│   └── Footer.jsx      → footer con redes sociales
├── pages/
│   ├── Inicio.jsx       (inicio.html)
│   ├── Login.jsx        (login.html)
│   ├── Formulario.jsx   (formulario.html)
│   ├── Tienda.jsx       (tienda.html + tienda.js)
│   └── Dash.jsx         (dash.html)
└── styles/
    ├── inicio.css
    ├── login.css
    ├── formulario.css
    └── tienda.css
```

## Pasos para integrarlos

1. **Carpeta `public/IMG`**: copia todas tus imágenes actuales (logo, fotos de motos,
   productos, etc.) a `public/IMG/` en tu proyecto React. Los componentes referencian
   rutas absolutas como `/IMG/logo.png.jpg`.

2. **Dependencias globales** (en tu `index.html` o punto de entrada, tal como ya las
   tenías por CDN):
   - Bootstrap 5 CSS **y** el bundle JS (`bootstrap.bundle.js`) — necesario para el
     navbar-toggler, el carrusel y el modal del carrito.
   - `animate.css`
   - Font Awesome
   - Google Fonts "Roboto" (y "Finger Paint"/"Sancreek" si los usas en `inicio.css`)

3. **Chart.js** (solo para `Dash.jsx`): `npm install chart.js`, o mantenlo por CDN
   (el componente detecta `window.Chart` si ya está cargado globalmente).

4. **Google Maps** (solo para `Dash.jsx`): reemplaza `GOOGLE_MAPS_API_KEY` en
   `Dash.jsx` por tu clave real.

5. **Rutas**: los enlaces usan rutas tipo `/inicio`, `/tienda`, `/login`, `/dash`, etc.
   Ajusta esos `href` según el router que ya use tu ERP (React Router, tu propio
   sistema, etc.). Si prefieres navegación SPA sin recarga, cambia los `<a href="...">`
   por el componente `<Link>` de tu router.

## Qué cambió respecto al HTML/JS original

- **`tienda.js` → `useState` + `useEffect`**: toda la lógica del carrito (agregar,
  quitar, cambiar cantidad, vaciar, checkout) ahora vive como estado de React en
  `Tienda.jsx`, sigue persistiendo en `localStorage` bajo la misma clave
  (`francoElViajeroCart`), y el modal se controla con la API de Bootstrap
  (`window.bootstrap.Modal`) vía `useRef`.
- **Formularios** (`login.html`, `formulario.html`): pasaron de manipulación directa
  del DOM a inputs controlados con `useState`. Ambos aceptan una prop callback
  (`onLogin`, `onSubmitInscripcion`) para que conectes ahí la llamada real a tu API/ERP
  en vez de la simulación original.
- **`dash.html`**: el `<style>` embebido se pasó a un objeto de estilos en JS (podrías
  moverlo a un `dash.css` si prefieres separarlo). Chart.js y Google Maps se inicializan
  en `useEffect`, con limpieza de las instancias de Chart.js al desmontar.
- Todo `class` → `className`, `for` → `htmlFor`, comentarios HTML → `{/* */}`, y los
  atributos `data-bs-*` de Bootstrap se mantuvieron igual (siguen funcionando en JSX).

## Pendiente de tu lado

- Conectar `onLogin` y `onSubmitInscripcion` a los endpoints reales de tu ERP.
- Reemplazar la simulación de `PRODUCTS` en `Tienda.jsx` por una carga desde tu API.
- Ajustar las rutas de navegación al router que uses.
