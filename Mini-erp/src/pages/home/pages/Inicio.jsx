import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/inicio.css";

/**
 * Página de inicio (landing) de Franco el Viajero.
 * Requiere las imágenes referenciadas en /public/IMG/... y los íconos
 * de Font Awesome + animate.css cargados globalmente (los tenías por CDN
 * en el <head> del HTML original; muévelos al index.html de tu app o
 * impórtalos en tu punto de entrada).
 */
export default function Inicio() {
  return (
    <>
      <Navbar activePage="inicio" />

      <section className="hero-section text-white text-center p-5">
        <div className="container">
          <h1 className="display-4 fw-bold">¡Bienvenido a Franco el Viajero!</h1>
          <p className="lead">
            Explora destinos únicos, conoce culturas y compra productos pensados para los
            verdaderos aventureros.
          </p>
          <a href="/tienda" className="btn btn-warning btn-lg mt-3">
            Ir a la Tienda
          </a>
        </div>
      </section>

      <section id="tienda" className="store-section">
        <div className="container">
          <h2 className="text-center mb-5">Destacados de la semana</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card">
                <img src="/IMG/Casco 1.jpg" className="card-img-top" alt="Producto 1" />
                <div className="card-body">
                  <h5 className="card-title">Guantes FOX</h5>
                  <p className="card-text">Ideal para todos tus viajes con estilo y seguridad.</p>
                  <button className="btn btn-success w-100 mt-2">Añadir al carrito</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img src="/IMG/CHAQUETA 1.jpg" className="card-img-top" alt="Producto 2" />
                <div className="card-body">
                  <h5 className="card-title">Casco BELL</h5>
                  <p className="card-text">Protégete del viento y los impactos durante tus viajes.</p>
                  <button className="btn btn-success w-100 mt-2">Añadir al carrito</button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img src="/IMG/GUANTES 1.webp" className="card-img-top" alt="Producto 3" />
                <div className="card-body">
                  <h5 className="card-title">Chaqueta de aventura</h5>
                  <p className="card-text">Resistentes y cómodas para explorar el mundo.</p>
                  <button className="btn btn-success w-100 mt-2">Añadir al carrito</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />

      <div
        id="carouselExample"
        className="carousel slide animate__animated animate__fadeInUp"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/IMG/IMG_9480.JPG" className="d-block w-100 mx-auto" alt="..." />
          </div>
          <div className="carousel-item">
            <img
              src="/IMG/logo.png.jpg"
              className="d-block w-100 mx-auto"
              alt="imagen ilustrativa del carrusel"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/IMG/IMG_9510.JPG"
              className="d-block w-100 mx-auto"
              alt="imagen ilustrativa del carrusel"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/IMG/IMG_9481.JPG"
              className="d-block w-100 mx-auto"
              alt="imagen ilustrativa del carrusel"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/IMG/IMG_9509-2.jpg"
              className="d-block w-100 mx-auto"
              alt="imagen ilustrativa del carrusel"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/IMG/IMG_9512.JPG"
              className="d-block w-100 mx-auto"
              alt="imagen ilustrativa del carrusel"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="animate__animated animate__fadeInLeft">
        <h2 className="text-white">¿Quién Soy?</h2>
      </div>

      <div className="descripcion">
        <h5>
          Franco el Viajero es un creador de contenido colombiano que comparte sus experiencias
          viajando por distintos lugares, especialmente mostrando la cultura, la gastronomía, las
          historias curiosas y los personajes únicos que encuentra en el camino. Con un estilo
          cercano, auténtico y muchas veces divertido, Franco inspira a otros a conocer el mundo
          desde una mirada más humana y real. Además, combina sus viajes con emprendimientos como
          su tienda de ropa y productos llamada Franco Style Shop, vinculando su estilo de vida
          con su marca personal.
        </h5>
      </div>
      <br />

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Lugares Recomendados por Franco</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100 shadow-lg border-0">
                <img
                  src="/IMG/IMG_9483.JPG"
                  className="card-img-top"
                  alt="Restaurantes recomendados"
                />
                <div className="card-body">
                  <h5 className="card-title">Restaurantes</h5>
                  <p className="card-text">
                    Sabores inolvidables en lugares únicos que he descubierto en mis viajes.
                  </p>
                  <a href="#" className="btn btn-warning w-100 fw-bold">
                    Quiero saber más
                  </a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow-lg border-0">
                <img src="/IMG/IMG_9489.JPG" className="card-img-top" alt="Hoteles recomendados" />
                <div className="card-body">
                  <h5 className="card-title">Hoteles</h5>
                  <p className="card-text">
                    Alojamientos cómodos, auténticos y llenos de historia, ideales para descansar.
                  </p>
                  <a href="#" className="btn btn-warning w-100 fw-bold">
                    Quiero saber más
                  </a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow-lg border-0">
                <img
                  src="/IMG/IMG_5055.JPEG"
                  className="card-img-top"
                  alt="Otros lugares recomendados"
                />
                <div className="card-body">
                  <h5 className="card-title">Otros lugares</h5>
                  <p className="card-text">
                    Desde pueblos mágicos hasta miradores escondidos: joyas que debes visitar.
                  </p>
                  <a href="#" className="btn btn-warning w-100 fw-bold">
                    Quiero saber más
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center mb-5">Motos Recomendadas por Franco</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100 shadow border-0">
                <img src="/IMG/IMG_9492.JPG" className="card-img-top" alt="Moto 1" />
                <div className="card-body">
                  <h5 className="card-title">Honda XR 150L</h5>
                  <p className="card-text">
                    Ideal para aventuras largas por carretera y caminos destapados. Versátil y
                    confiable.
                  </p>
                  <a href="#" className="btn btn-outline-primary w-100 fw-bold">
                    Ver más
                  </a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow border-0">
                <img src="/IMG/IMG_9488.JPG" className="card-img-top" alt="Moto 2" />
                <div className="card-body">
                  <h5 className="card-title">Royal Enfield Himalayan</h5>
                  <p className="card-text">
                    Pensada para exploradores. Comodidad en viajes largos y buen rendimiento en
                    terrenos difíciles.
                  </p>
                  <a href="#" className="btn btn-outline-primary w-100 fw-bold">
                    Ver más
                  </a>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100 shadow border-0">
                <img src="/IMG/IMG_9483.JPG" className="card-img-top" alt="Moto 3" />
                <div className="card-body">
                  <h5 className="card-title">Yamaha MT 09</h5>
                  <p className="card-text">
                    Una de las preferidas por jóvenes colombianos. Ligera, potente y lista para el
                    candeleo.
                  </p>
                  <a href="#" className="btn btn-outline-primary w-100 fw-bold">
                    Ver más
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-5">Nuestros Patrocinadores</h2>
          <div className="row justify-content-center align-items-center g-4">
            <div className="card" style={{ width: "18rem" }}>
              <img
                src="/IMG/Royal-Enfield-Emblem.jpg"
                className="card-img-top"
                alt="Royal Enfield"
              />
              <div className="card-body">
                <h5 className="card-title">Royal Enfield</h5>
                <p className="card-text">
                  Es una marca clásica fundada en 1901, sinónimo de innovación, aventura y el
                  espíritu de la libertad.
                </p>
              </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
              <img src="/IMG/logo akt.jpg" className="card-img-top" alt="Akt Motos" />
              <div className="card-body">
                <h5 className="card-title">Akt Motos</h5>
                <p className="card-text">
                  Marca colombiana dedicada a la fabricación de motocicletas de alta calidad,
                  rendimiento y confiabilidad.
                </p>
              </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
              <img src="/IMG/logo fp.jpeg" className="card-img-top" alt="Fire Parts" />
              <div className="card-body">
                <h5 className="card-title">Fire Parts</h5>
                <p className="card-text">
                  Especializada en piezas y accesorios para motocicletas, manteniendo tu moto en
                  perfecto estado.
                </p>
              </div>
            </div>

            <div className="card" style={{ width: "18rem" }}>
              <img src="/IMG/logo spar.png" className="card-img-top" alt="Spartan Acc" />
              <div className="card-body">
                <h5 className="card-title">Spartan Acc</h5>
                <p className="card-text">
                  Especialista en accesorios para motocicletas, reconocida por su calidad, diseño
                  innovador y durabilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
