import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <h4 id="redes">Síguenos en nuestras redes sociales</h4>
        <div className="d-flex justify-content-center my-3 gap-4">
          <a
            href="https://www.tiktok.com/@franco_el_viajero"
            target="_blank"
            rel="noreferrer"
            className="text-white fs-4"
            aria-label="TikTok"
          >
            <i className="fab fa-tiktok"></i>
          </a>
          <a
            href="https://www.facebook.com/norbey.valenciafranco"
            target="_blank"
            rel="noreferrer"
            className="text-white fs-4"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/franco_el_viajero"
            target="_blank"
            rel="noreferrer"
            className="text-white fs-4"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://youtube.com/@franco_el_viajero"
            target="_blank"
            rel="noreferrer"
            className="text-white fs-4"
            aria-label="YouTube"
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <p className="mb-0">&copy; {new Date().getFullYear()} Franco el Viajero. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
