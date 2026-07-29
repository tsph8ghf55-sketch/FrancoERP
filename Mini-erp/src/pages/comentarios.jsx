import { useState } from "react";
import { obtenerComentarios, crearComentario } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, FieldArea, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id_comentario", label: "ID" },
  { key: "motero_nombre", label: "Motero", accent: true },
  { key: "evento_nombre", label: "Evento" },
  { key: "contenido",     label: "Comentario" },
  { key: "fecha",         label: "Fecha" },
];
const EMPTY = { id_usuario: "", id_evento: "", contenido: "" };

export default function Comentarios() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerComentarios, crearComentario);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Comentarios" subtitle="Comentarios en eventos" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id_comentario" />
      <Modal title="Nuevo Comentario" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="ID Usuario" name="id_usuario" value={form.id_usuario} onChange={onChange} required />
        <Field label="ID Evento"  name="id_evento"  value={form.id_evento}  onChange={onChange} required />
        <FieldArea label="Contenido" name="contenido" value={form.contenido} onChange={onChange} />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
