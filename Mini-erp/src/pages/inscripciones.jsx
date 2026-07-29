import { useState } from "react";
import { obtenerInscripciones, crearInscripcion } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id_inscripcion",    label: "ID" },
  { key: "motero_nombre",     label: "Motero", accent: true },
  { key: "evento_nombre",     label: "Evento" },
  { key: "fecha_inscripcion", label: "Fecha" },
];
const EMPTY = { id_usuario: "", id_evento: "" };

export default function Inscripciones() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerInscripciones, crearInscripcion);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Inscripciones" subtitle="Inscripciones a eventos" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id_inscripcion" />
      <Modal title="Nueva Inscripción" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="ID Usuario" name="id_usuario" value={form.id_usuario} onChange={onChange} required />
        <Field label="ID Evento"  name="id_evento"  value={form.id_evento}  onChange={onChange} required />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
