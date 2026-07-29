import { useState } from "react";
import { obtenerViajes, crearViaje } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, FieldArea, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id_viaje",       label: "ID" },
  { key: "titulo",         label: "Título", accent: true },
  { key: "destino_nombre", label: "Destino" },
  { key: "ciudad",         label: "Ciudad" },
  { key: "fecha_viaje",    label: "Fecha" },
];
const EMPTY = { id_destino: "", titulo: "", descripcion: "", fecha_viaje: "" };

export default function Viajes() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerViajes, crearViaje);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Viajes" subtitle="Viajes publicados" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id_viaje" />
      <Modal title="Nuevo Viaje" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="ID Destino"  name="id_destino"  value={form.id_destino}  onChange={onChange} required />
        <Field label="Título"      name="titulo"      value={form.titulo}      onChange={onChange} required />
        <Field label="Fecha viaje" name="fecha_viaje" type="date" value={form.fecha_viaje} onChange={onChange} required />
        <FieldArea label="Descripción" name="descripcion" value={form.descripcion} onChange={onChange} />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
