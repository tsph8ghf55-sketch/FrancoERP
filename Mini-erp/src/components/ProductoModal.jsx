import { useState } from "react";
import { crearProducto } from "../services/api";

function ProductoModal({ onProductoCreado }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validaciones frontend
    if (!form.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    const res = await crearProducto(form);
    if (!res.success) {
      setError(res.message);
      return;
    }

    setError(null);
    onProductoCreado(); // refresca lista
    document.getElementById("cerrarProductoModal").click(); // cierra modal
  };

  return (
    <div className="modal fade" id="productoModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nuevo producto</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" id="cerrarModal"></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <input className="form-control mb-2" placeholder="Nombre" name="nombre" onChange={handleChange} />
            <input className="form-control mb-2" placeholder="Descripcion" name="descripcion" onChange={handleChange} />
            <input className="form-control mb-2" placeholder="Precio" name="precio" onChange={handleChange} />
            <input className="form-control mb-2" placeholder="Stock" name="stock" onChange={handleChange} />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoModal;
