import { useState } from "react";
import { obtenerMoteros, crearMotero } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, FieldSelect, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id_usuario",     label: "ID" },
  { key: "nombre",         label: "Nombre", accent: true },
  { key: "correo",         label: "Correo" },
  { key: "telefono",       label: "Teléfono" },
  { key: "rol",            label: "Rol" },
  { key: "fecha_registro", label: "Registro" },
];
const EMPTY = { nombre: "", telefono: "", correo: "", password: "", foto_perfil: "", rol: "motero" };
const ROLES = [{ value: "motero", label: "Motero" }, { value: "admin", label: "Admin" }];

export default function Moteros() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerMoteros, crearMotero);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--black-300)" }}>{error}</p>;
  return (
    <PageShell title="Moteros" subtitle="Usuarios registrados en la plataforma" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id_usuario" />
      <Modal title="Nuevo Motero" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="Nombre"     name="nombre"      value={form.nombre}      onChange={onChange} required />
        <Field label="Correo"     name="correo"      type="email" value={form.correo} onChange={onChange} required />
        <Field label="Teléfono"   name="telefono"    value={form.telefono}    onChange={onChange} required />
        <Field label="Contraseña" name="password"    type="password" value={form.password} onChange={onChange} required />
        <Field label="Foto (URL)" name="foto_perfil" value={form.foto_perfil} onChange={onChange} />
        <FieldSelect label="Rol" name="rol" value={form.rol} onChange={onChange} options={ROLES} />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
