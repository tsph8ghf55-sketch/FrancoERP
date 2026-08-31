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
    <header className="fv-topbar" style={{
      background: "#111111",
      borderBottom: "1px solid #222222",
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
          background: "#e07e2d",
          borderRadius: "2px",
        }} />
        <span style={{
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#f7efe3",
        }}>{label}</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{ fontSize: "12px", color: "#f7efe3" }}>Admin</span>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: "1px solid #4c4c4c",
            color: "#e4d7c4",
            padding: "4px 12px",
            borderRadius: "4px",
            fontSize: "12px",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.target.style.borderColor = "#e07e2d"; e.target.style.color = "#fff2e6"; }}
          onMouseLeave={e => { e.target.style.borderColor = "#4c4c4c"; e.target.style.color = "#e4d7c4"; }}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
