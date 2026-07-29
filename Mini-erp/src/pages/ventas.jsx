import { useState } from "react";
import { obtenerVentas, crearVenta } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id",         label: "ID" },
  { key: "cliente",    label: "Cliente", accent: true },
  { key: "producto",   label: "Producto" },
  { key: "cantidad",   label: "Cantidad" },
  { key: "total",      label: "Total" },
  { key: "fecha",      label: "Fecha" },
];
const EMPTY = { id_cliente: "", id_producto: "", cantidad: "", total: "" };

export default function Ventas() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerVentas, crearVenta);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Ventas" subtitle="Registro de ventas" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id" />
      <Modal title="Nueva Venta" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="ID Cliente"  name="id_cliente"  value={form.id_cliente}  onChange={onChange} required />
        <Field label="ID Producto" name="id_producto" value={form.id_producto} onChange={onChange} required />
        <Field label="Cantidad"    name="cantidad"    type="number" value={form.cantidad} onChange={onChange} required />
        <Field label="Total"       name="total"       type="number" value={form.total}    onChange={onChange} required />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
