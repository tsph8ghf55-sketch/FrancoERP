import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/login.css";

/**
 * Página de login. La lógica de autenticación real la conectas en
 * `onLogin` (por ejemplo, una llamada a tu API del mini ERP). Si no
 * pasas la prop, cae en un comportamiento simulado como el original
 * (redirige a /dash con cualquier campo lleno).
 *
 * Prop opcional:
 *   onLogin(email, password) -> Promise|void  (lanza un Error para mostrar mensaje)
 */
export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      if (onLogin) {
        await onLogin(email, password);
      } else {
        // Comportamiento por defecto, equivalente al original.
        window.location.href = "/dash";
      }
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar activePage="login" />

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="col-md-5 login-container text-center">
          <img
            src="/IMG/logo.png.jpg"
            alt="Franco el Viajero Logo"
            className="brand-logo rounded-circle"
          />
          <h2 className="login-title mb-4">Franco el Viajero</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="viajero@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </div>
            <div className="mt-3">
              <a href="#" className="text-decoration-none text-secondary">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
