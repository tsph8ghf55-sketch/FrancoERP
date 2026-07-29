import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/moteros",       label: "Moteros" },
  { to: "/destinos",      label: "Destinos" },
  { to: "/viajes",        label: "Viajes" },
  { to: "/itinerario",    label: "Itinerario" },
  { to: "/eventos",       label: "Eventos" },
  { to: "/inscripciones", label: "Inscripciones" },
  { to: "/comentarios",   label: "Comentarios" },
  { to: "/clientes",      label: "Clientes" },
  { to: "/productos",     label: "Productos" },
  { to: "/pedidos",       label: "Pedidos" },
  { to: "/ventas",        label: "Ventas" },
  { to: "/imagenes",      label: "Imágenes" },
];

const linkBase = {
  display: "block",
  padding: "5px 10px",
  marginBottom: "1px",
  borderRadius: "4px",
  borderLeft: "2px solid transparent",
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "1.4",
  color: "#aaaaaa",
  textDecoration: "none",
  transition: "all 0.15s",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const linkActive = {
  ...linkBase,
  color: "#ffffff",
  background: "rgba(255,255,255,0.08)",
  borderLeft: "2px solid #cccccc",
  fontWeight: 500,
};

export default function Sidebar() {
  return (
    <aside style={{
      width: "185px",
      minWidth: "185px",
      minHeight: "100vh",
      background: "#1c1c1c",
      borderRight: "1px solid #333333",
      display: "flex",
      flexDirection: "column",
      position: "sticky",
      top: 0,
    }}>

      {/* Brand */}
      <div style={{
        padding: "18px 14px 14px",
        borderBottom: "1px solid #333333",
      }}>
        <div style={{
          fontSize: "17px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#e4e4e4",
          lineHeight: 1,
        }}>Franco</div>
        <div style={{
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#555555",
          marginTop: "3px",
        }}>El Viajero</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "8px 8px" }}>
        <div style={{
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#555555",
          padding: "4px 6px 6px",
        }}>Navegación</div>

        {NAV_ITEMS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => isActive ? linkActive : linkBase}
            onMouseEnter={e => {
              if (e.currentTarget.style.color !== "rgb(255, 255, 255)") {
                e.currentTarget.style.color = "#e4e4e4";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }
            }}
            onMouseLeave={e => {
              if (e.currentTarget.style.color !== "rgb(255, 255, 255)") {
                e.currentTarget.style.color = "#aaaaaa";
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: "10px 14px",
        borderTop: "1px solid #333333",
        fontSize: "10px",
        color: "#555555",
      }}>v1.0 — Admin</div>
    </aside>
  );
}
