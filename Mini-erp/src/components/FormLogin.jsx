import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/moteros");
  };

  return (
    <div className="fv-login-bg">
      {/* Grain retro */}
      <div className="fv-grain" />

      <div style={{ position: "relative", zIndex: 1, width: "min(100%, 360px)", padding: "0 16px" }}>

        {/* Logo */}
        <div className="text-center mb-4">
          <div className="fv-logo-text">FRANCO</div>
          <div className="fv-logo-sub">El Viajero</div>
          <div className="fv-divider" />
          <p style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginTop: "8px",
          }}>Panel Administrativo</p>
        </div>

        {/* Card login */}
        <div className="fv-login-card">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="fv-label">Usuario</label>
              <input
                type="email"
                required
                placeholder="usuario@correo.com"
                className="form-control fv-input"
              />
            </div>

            <div className="mb-4">
              <label className="fv-label">Contraseña</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="form-control fv-input"
              />
            </div>

            <button type="submit" className="btn btn-retro w-100 py-2">
              Ingresar
            </button>
          </form>

          {/* Separador retro */}
          <div style={{
            marginTop: "24px",
            paddingTop: "18px",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
          }}>
            <span style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}>
              Franco El Viajero &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
