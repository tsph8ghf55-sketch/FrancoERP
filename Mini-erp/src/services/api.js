const BASE = "http://localhost/FRANCOERP/backend";

async function get(path) {
  const r = await fetch(`${BASE}${path}`);
  if (!r.ok) throw new Error(`Error ${r.status}`);
  return r.json();
}

async function post(path, body) {
  const r = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
}

export const obtenerClientes      = () => get("/clientes/listar.php");
export const crearCliente         = (d) => post("/clientes/crear.php", d);
export const obtenerProductos     = () => get("/productos/listar.php");
export const crearProducto        = (d) => post("/productos/crear.php", d);
export const obtenerVentas        = () => get("/ventas/listar.php");
export const crearVenta           = (d) => post("/ventas/crear.php", d);
export const obtenerMoteros       = () => get("/moteros/listar.php");
export const crearMotero          = (d) => post("/moteros/crear.php", d);
export const obtenerDestinos      = () => get("/destinos/listar.php");
export const crearDestino         = (d) => post("/destinos/crear.php", d);
export const obtenerViajes        = () => get("/viajes/listar.php");
export const crearViaje           = (d) => post("/viajes/crear.php", d);
export const obtenerItinerarios   = () => get("/itinerario/listar.php");
export const crearItinerario      = (d) => post("/itinerario/crear.php", d);
export const obtenerEventos       = () => get("/eventos/listar.php");
export const crearEvento          = (d) => post("/eventos/crear.php", d);
export const obtenerInscripciones = () => get("/inscripciones/listar.php");
export const crearInscripcion     = (d) => post("/inscripciones/crear.php", d);
export const obtenerComentarios   = () => get("/comentarios/listar.php");
export const crearComentario      = (d) => post("/comentarios/crear.php", d);
export const obtenerPedidos       = () => get("/pedidos/listar.php");
export const crearPedido          = (d) => post("/pedidos/crear.php", d);
export const obtenerImagenes      = () => get("/imagenes/listar.php");
export const crearImagen          = (d) => post("/imagenes/crear.php", d);
