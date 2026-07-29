import { useState } from "react";
import { obtenerProductos, crearProducto } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, FieldArea, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id_producto", label: "ID" },
  { key: "nombre",      label: "Producto", accent: true },
  { key: "precio",      label: "Precio" },
  { key: "stock",       label: "Stock" },
  { key: "categoria",   label: "Categoría" },
];
const EMPTY = { nombre: "", descripcion: "", precio: "", stock: "", imagen: "", categoria: "" };

export default function Productos() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerProductos, crearProducto);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Productos" subtitle="Catálogo de productos" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id_producto" />
      <Modal title="Nuevo Producto" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="Nombre"       name="nombre"    value={form.nombre}    onChange={onChange} required />
        <Field label="Precio"       name="precio"    type="number" value={form.precio}  onChange={onChange} required />
        <Field label="Stock"        name="stock"     type="number" value={form.stock}   onChange={onChange} required />
        <Field label="Categoría"    name="categoria" value={form.categoria} onChange={onChange} />
        <Field label="Imagen (URL)" name="imagen"    value={form.imagen}    onChange={onChange} />
        <FieldArea label="Descripción" name="descripcion" value={form.descripcion} onChange={onChange} />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
