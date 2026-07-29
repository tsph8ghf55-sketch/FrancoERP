import { useState } from "react";
import { obtenerItinerarios, crearItinerario } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, FieldArea, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id_itinerario",   label: "ID" },
  { key: "viaje_titulo",    label: "Viaje", accent: true },
  { key: "lugar",           label: "Lugar" },
  { key: "fecha",           label: "Fecha" },
  { key: "orden_recorrido", label: "Orden" },
];
const EMPTY = { id_viaje: "", lugar: "", descripcion: "", fecha: "", orden_recorrido: "" };

export default function Itinerario() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerItinerarios, crearItinerario);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Itinerario" subtitle="Paradas y recorridos" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id_itinerario" />
      <Modal title="Nueva Parada" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="ID Viaje"        name="id_viaje"        value={form.id_viaje}        onChange={onChange} required />
        <Field label="Lugar"           name="lugar"           value={form.lugar}           onChange={onChange} required />
        <Field label="Fecha"           name="fecha"           type="datetime-local" value={form.fecha} onChange={onChange} required />
        <Field label="Orden recorrido" name="orden_recorrido" type="number" value={form.orden_recorrido} onChange={onChange} required />
        <FieldArea label="Descripción" name="descripcion" value={form.descripcion} onChange={onChange} />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
