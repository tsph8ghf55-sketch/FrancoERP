import React, { useEffect, useRef } from "react";

/**
 * Dashboard de administración.
 *
 * Requiere:
 * - Chart.js instalado (`npm install chart.js`) o cargado globalmente vía CDN.
 * - Una API key de Google Maps propia en `GOOGLE_MAPS_API_KEY`.
 * - Bootstrap 5 CSS cargado globalmente.
 *
 * Los estilos originales estaban embebidos en un <style> del HTML; aquí se
 * pasan a un objeto de estilos + una hoja `dash.css` que puedes crear con
 * el contenido de esa sección <style> si prefieres mantenerlo separado.
 */

const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY"; // reemplaza por tu key real

export default function Dash() {
  const visitasChartRef = useRef(null);
  const categoriasChartRef = useRef(null);
  const mapRef = useRef(null);
  const chartInstancesRef = useRef([]);

  // Gráficas con Chart.js
  useEffect(() => {
    let cancelled = false;

    async function renderCharts() {
      // Usa Chart.js global si ya está cargado por <script>, si no, impórtalo del paquete npm.
      const Chart = window.Chart || (await import("chart.js/auto")).default;
      if (cancelled) return;

      const visitasChart = new Chart(visitasChartRef.current, {
        type: "bar",
        data: {
          labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
          datasets: [
            {
              label: "Visitas",
              data: [120, 180, 300, 250, 400, 350],
              backgroundColor: "#ffc107",
            },
          ],
        },
      });

      const categoriasChart = new Chart(categoriasChartRef.current, {
        type: "pie",
        data: {
          labels: ["Restaurantes", "Hoteles", "Otros sitios"],
          datasets: [
            {
              label: "Vistas por categoría",
              data: [100, 80, 60],
              backgroundColor: ["#0d6efd", "#198754", "#fd7e14"],
            },
          ],
        },
      });

      chartInstancesRef.current = [visitasChart, categoriasChart];
    }

    renderCharts();

    return () => {
      cancelled = true;
      chartInstancesRef.current.forEach((chart) => chart.destroy());
      chartInstancesRef.current = [];
    };
  }, []);

  // Mapa de Google Maps
  useEffect(() => {
    const location = { lat: 6.25184, lng: -75.56359 };

    function initMap() {
      if (!mapRef.current || !window.google) return;
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: location,
      });
      new window.google.maps.Marker({ position: location, map });
    }

    if (window.google?.maps) {
      initMap();
      return;
    }

    const scriptId = "google-maps-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      // No removemos el script para no romper otras instancias del mapa si
      // el dashboard se vuelve a montar durante la navegación de tu SPA.
    };
  }, []);

  return (
    <div style={styles.body}>
      {/* barra lateral */}
      <div style={styles.barralat}>
        <div>
          <h3 style={styles.barralatH3}>Admin Franco</h3>
          <a href="/dash" style={{ ...styles.link, ...styles.linkActive }}>
            Dashboard
          </a>
          <a href="/tienda-admin" style={styles.link}>
            Tienda
          </a>
          <a href="/inscritos" style={styles.link}>
            Inscritos
          </a>
          <a href="/editar-secciones" style={styles.link}>
            Editar Secciones
          </a>
          <a href="#map" style={styles.link}>
            Mapa
          </a>
        </div>
        <div style={styles.bottomSection}>
          <div className="text-center mb-2">Bienvenido, Admin</div>
          <a href="/login" className="btn btn-outline-light w-100 btn-sm">
            Salir
          </a>
        </div>
      </div>

      {/* contenido principal */}
      <div style={styles.mainContent}>
        <h2 className="mb-4 text-center">Estadísticas del Sitio</h2>

        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="card p-3" style={styles.card}>
              <canvas ref={visitasChartRef}></canvas>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3" style={styles.card}>
              <canvas ref={categoriasChartRef}></canvas>
            </div>
          </div>
        </div>

        <h3 className="mb-3">Gestión de Contenidos</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
          <div className="col">
            <div className="card h-100" style={styles.card}>
              <div className="card-body">
                <h5 className="card-title">Tienda</h5>
                <p className="card-text">
                  Agrega, modifica o elimina productos de la tienda Franco Style Shop.
                </p>
                <a href="/tienda-admin" className="btn btn-outline-primary w-100">
                  Administrar tienda
                </a>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100" style={styles.card}>
              <div className="card-body">
                <h5 className="card-title">Inscritos</h5>
                <p className="card-text">Revisa los formularios enviados por los viajeros.</p>
                <a href="/inscritos" className="btn btn-outline-primary w-100">
                  Ver inscritos
                </a>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100" style={styles.card}>
              <div className="card-body">
                <h5 className="card-title">Editar Secciones</h5>
                <p className="card-text">
                  Modifica el contenido de inicio, lugares recomendados, etc.
                </p>
                <a href="/editar-secciones" className="btn btn-outline-primary w-100">
                  Editar contenido
                </a>
              </div>
            </div>
          </div>
        </div>

        <h3 className="mb-3">📍 Ubicación en Tiempo Real (Google Maps)</h3>
        <div id="map" className="mb-5" style={styles.map} ref={mapRef}></div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: '"Roboto", sans-serif',
    background: "#f4f6f9",
    display: "flex",
  },
  barralat: {
    width: 250,
    backgroundColor: "#212529",
    color: "#fff",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "3px 0 10px rgba(0,0,0,0.2)",
  },
  barralatH3: {
    fontFamily: "'Finger Paint', cursive",
    textAlign: "center",
    padding: "20px 0",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  link: {
    color: "#adb5bd",
    textDecoration: "none",
    display: "block",
    padding: "12px 20px",
    transition: "all 0.3s",
    fontSize: 15,
  },
  linkActive: {
    backgroundColor: "#0d6efd",
    color: "#fff",
    borderRadius: "0 30px 30px 0",
  },
  bottomSection: {
    padding: 20,
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  mainContent: {
    marginLeft: 250,
    padding: 40,
    width: "100%",
  },
  card: {
    border: "none",
    borderRadius: 15,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  map: {
    width: "100%",
    height: 400,
    borderRadius: 15,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
};
