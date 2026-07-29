import { useState } from "react";
import { obtenerClientes, crearCliente } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "idclientes",     label: "ID" },
  { key: "nombre",         label: "Nombre", accent: true },
  { key: "correo",         label: "Correo" },
  { key: "telefono",       label: "Teléfono" },
  { key: "fecha_registro", label: "Registro" },
];
const EMPTY = { nombre: "", correo: "", telefono: "" };

export default function Clientes() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerClientes, crearCliente);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Clientes" subtitle="Clientes registrados en la tienda" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="idclientes" />
      <Modal title="Nuevo Cliente" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="Nombre"   name="nombre"   value={form.nombre}   onChange={onChange} required />
        <Field label="Correo"   name="correo"   type="email" value={form.correo} onChange={onChange} required />
        <Field label="Teléfono" name="telefono" value={form.telefono} onChange={onChange} />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
