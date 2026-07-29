import { useState } from "react";
import { obtenerEventos, crearEvento } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, FieldArea, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id_evento",     label: "ID" },
  { key: "nombre",        label: "Evento", accent: true },
  { key: "motero_nombre", label: "Organizador" },
  { key: "viaje_titulo",  label: "Viaje" },
  { key: "fecha",         label: "Fecha" },
  { key: "capacidad",     label: "Cap." },
];
const EMPTY = { id_usuario: "", id_viaje: "", nombre: "", descripcion: "", fecha: "", imagen: "", capacidad: "" };

export default function Eventos() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerEventos, crearEvento);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Eventos" subtitle="Eventos vinculados a viajes" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id_evento" />
      <Modal title="Nuevo Evento" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="ID Usuario"  name="id_usuario"  value={form.id_usuario}  onChange={onChange} required />
        <Field label="ID Viaje"    name="id_viaje"    value={form.id_viaje}    onChange={onChange} required />
        <Field label="Nombre"      name="nombre"      value={form.nombre}      onChange={onChange} required />
        <Field label="Fecha"       name="fecha"       type="datetime-local" value={form.fecha} onChange={onChange} required />
        <Field label="Capacidad"   name="capacidad"   type="number" value={form.capacidad} onChange={onChange} required />
        <Field label="Imagen (URL)" name="imagen"     value={form.imagen}      onChange={onChange} />
        <FieldArea label="Descripción" name="descripcion" value={form.descripcion} onChange={onChange} />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
