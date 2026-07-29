import { useState } from "react";
import { obtenerDestinos, crearDestino } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, FieldArea, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id_destino", label: "ID" },
  { key: "nombre",     label: "Nombre", accent: true },
  { key: "pais",       label: "País" },
  { key: "ciudad",     label: "Ciudad" },
  { key: "categoria",  label: "Categoría" },
];
const EMPTY = { nombre: "", pais: "", ciudad: "", descripcion: "", imagen: "", categoria: "", fecha_recomendacion: "" };

export default function Destinos() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerDestinos, crearDestino);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Destinos" subtitle="Lugares de viaje registrados" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id_destino" />
      <Modal title="Nuevo Destino" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="Nombre"              name="nombre"               value={form.nombre}               onChange={onChange} required />
        <Field label="País"                name="pais"                 value={form.pais}                 onChange={onChange} required />
        <Field label="Ciudad"              name="ciudad"               value={form.ciudad}               onChange={onChange} required />
        <Field label="Categoría"           name="categoria"            value={form.categoria}            onChange={onChange} />
        <Field label="Imagen (URL)"        name="imagen"               value={form.imagen}               onChange={onChange} />
        <Field label="Fecha recomendación" name="fecha_recomendacion"  type="datetime-local" value={form.fecha_recomendacion} onChange={onChange} />
        <FieldArea label="Descripción"     name="descripcion"          value={form.descripcion}          onChange={onChange} />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
