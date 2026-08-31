import React from "react";

/**
 * Navbar compartido para las páginas públicas de Franco el Viajero.
 * Usa react-router-dom si está disponible en tu ERP; si no, reemplaza
 * los <Link> por <a href="..."> normales.
 *
 * Requiere que el logo esté disponible en /IMG/logo.png.jpg (carpeta public)
 * y que Bootstrap 5 (CSS + bundle JS) esté cargado globalmente en tu app,
 * ya que el toggler del menú depende del JS de Bootstrap (data-bs-toggle).
 */
export default function Navbar({ activePage = "" }) {
  const isActive = (page) => (activePage === page ? "active" : "");

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark px-4 animate__animated animate__fadeInDown">
      <a className="navbar-brand d-flex align-items-center" href="/">
        <img src="/IMG/logo.png.jpg" alt="Logo" height="50" className="me-2" />
        <span className="fs-4">Franco el Viajero</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#menuNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="menuNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className={`nav-link ${isActive("inicio")}`} href="/">
              Inicio
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${isActive("formulario")}`} href="/formulario">
              Inscripción por club
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${isActive("tienda")}`} href="/tienda">
              Tienda
            </a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${isActive("login")}`} href="/login">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
