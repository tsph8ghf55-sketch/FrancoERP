import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/formulario.css";

const initialState = {
  nombre: "",
  referenciaMoto: "",
  cedula: "",
  genero: "Hombre",
  comoSeEntero: "",
};

/**
 * Formulario de inscripción por club. Conecta la persistencia real
 * (guardar en tu ERP / base de datos) en la prop `onSubmitInscripcion`.
 *
 * Prop opcional:
 *   onSubmitInscripcion(data) -> Promise|void
 */
export default function Formulario({ onSubmitInscripcion }) {
  const [form, setForm] = useState(initialState);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null); // { tipo: 'success' | 'error', texto: string }

  const handleChange = (campo) => (event) => {
    setForm((prev) => ({ ...prev, [campo]: event.target.value }));
  };

  const handleCancelar = () => {
    setForm(initialState);
    setMensaje(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensaje(null);

    if (!form.nombre || !form.cedula) {
      setMensaje({ tipo: "error", texto: "Por favor completa los campos obligatorios." });
      return;
    }

    try {
      setEnviando(true);
      if (onSubmitInscripcion) {
        await onSubmitInscripcion(form);
      }
      setMensaje({ tipo: "success", texto: "¡Inscripción enviada con éxito!" });
      setForm(initialState);
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message || "No se pudo enviar la inscripción." });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="public-page form-page">
      <Navbar activePage="formulario" />

      <header className="text-center mt-5">
        <h1 className="display-4 text-light fw-bold">¡Únete a esta aventura!</h1>
      </header>

      <section>
        <div className="text-center my-4">
          <img src="/IMG/IMG_9484.JPG" alt="" className="img-fluid rounded shadow" />
          <p className="mt-3 fst-italic text-white">
            "Cada aventura es única, si lo haces con el corazón."
          </p>
        </div>

        <div className="form">
          <h1>Formulario de inscripción</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Digite sus nombres y apellidos: </label>
            <input
              type="text"
              className="form-control mb-3"
              id="nombre"
              placeholder="Ej: Juan Pérez"
              value={form.nombre}
              onChange={handleChange("nombre")}
            />

            <label htmlFor="referencia-moto">Digite referencia de la moto</label>
            <input
              type="text"
              className="form-control mb-3"
              id="referencia-moto"
              placeholder="Ej: AKT TT 250"
              value={form.referenciaMoto}
              onChange={handleChange("referenciaMoto")}
            />

            <label htmlFor="cedula">Digite su número de identificación</label>
            <input
              type="text"
              className="form-control mb-3"
              id="cedula"
              placeholder="Ej: 1.012.333.665"
              value={form.cedula}
              onChange={handleChange("cedula")}
            />

            <label htmlFor="genero">Seleccione su género</label>
            <select
              className="form-control mb-3"
              name="genero"
              id="genero"
              value={form.genero}
              onChange={handleChange("genero")}
            >
              <option value="Hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="no definido">No definido</option>
              <option value="no sabe">No sabe, no responde</option>
            </select>
            <br />

            <label className="mb-3" htmlFor="comoSeEntero"></label>
            <textarea
              className="form-control mb-3"
              id="comoSeEntero"
              rows="3"
              placeholder="¿Cómo te enteraste del proyecto?"
              value={form.comoSeEntero}
              onChange={handleChange("comoSeEntero")}
            ></textarea>
            <br />

            {mensaje && (
              <div className={`alert ${mensaje.tipo === "success" ? "alert-success" : "alert-danger"}`}>
                {mensaje.texto}
              </div>
            )}

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success px-4" disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar"}
              </button>
              <button type="button" className="btn btn-outline-danger px-4" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
