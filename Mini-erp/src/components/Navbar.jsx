import { useNavigate, useLocation } from "react-router-dom";

const LABELS = {
  "/moteros": "Moteros", "/destinos": "Destinos", "/viajes": "Viajes",
  "/itinerario": "Itinerario", "/eventos": "Eventos",
  "/inscripciones": "Inscripciones", "/comentarios": "Comentarios",
  "/clientes": "Clientes", "/productos": "Productos",
  "/pedidos": "Pedidos", "/ventas": "Ventas", "/imagenes": "Imágenes",
};

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const label = LABELS[pathname] || "Panel";

  return (
    <header style={{
      background: "#1c1c1c",
      borderBottom: "1px solid #333333",
      height: "50px",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          width: "3px",
          height: "16px",
          background: "#888888",
          borderRadius: "2px",
        }} />
        <span style={{
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#e4e4e4",
        }}>{label}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{ fontSize: "12px", color: "#555555" }}>Admin</span>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: "1px solid #464646",
            color: "#888888",
            padding: "4px 12px",
            borderRadius: "4px",
            fontSize: "12px",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "#888888"; e.target.style.color = "#e4e4e4"; }}
          onMouseLeave={e => { e.target.style.borderColor = "#464646"; e.target.style.color = "#888888"; }}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
