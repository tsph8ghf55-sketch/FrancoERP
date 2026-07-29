import { useState } from "react";
import { obtenerImagenes, crearImagen } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id_imagen",    label: "ID" },
  { key: "viaje_titulo", label: "Viaje", accent: true },
  { key: "url",          label: "URL" },
  { key: "descripcion",  label: "Descripción" },
];
const EMPTY = { id_viaje: "", url: "", descripcion: "" };

export default function Imagenes() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerImagenes, crearImagen);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Imágenes" subtitle="Galería de viajes" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id_imagen" />
      <Modal title="Nueva Imagen" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="ID Viaje"    name="id_viaje"    value={form.id_viaje}    onChange={onChange} required />
        <Field label="URL Imagen"  name="url"         value={form.url}         onChange={onChange} required />
        <Field label="Descripción" name="descripcion" value={form.descripcion} onChange={onChange} />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
