import { useState } from "react";
import { obtenerPedidos, crearPedido } from "../services/api";
import { useCrud } from "../hooks/useCrud";
import { PageShell, DataTable, Modal, Field, FieldSelect, Alert, ModalFooter } from "../components/UI";

const COLS = [
  { key: "id_pedido",      label: "ID" },
  { key: "cliente_nombre", label: "Cliente", accent: true },
  { key: "cliente_correo", label: "Correo" },
  { key: "estado",         label: "Estado" },
  { key: "total",          label: "Total" },
  { key: "fecha_pedido",   label: "Fecha" },
];
const EMPTY = { id_cliente: "", estado: "pendiente", total: "" };
const ESTADOS = [
  { value: "pendiente",   label: "Pendiente" },
  { value: "procesando",  label: "Procesando" },
  { value: "enviado",     label: "Enviado" },
  { value: "entregado",   label: "Entregado" },
  { value: "cancelado",   label: "Cancelado" },
];

export default function Pedidos() {
  const { rows, loading, error, open, setOpen, formError, setFormError, handleCreate } = useCrud(obtenerPedidos, crearPedido);
  const [form, setForm] = useState(EMPTY);
  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const onSubmit = async () => { const ok = await handleCreate(form); if (ok) setForm(EMPTY); };
  if (loading) return <p className="p-4" style={{ color: "var(--text-muted)" }}>Cargando...</p>;
  if (error)   return <p className="p-4" style={{ color: "var(--gray-300)" }}>{error}</p>;
  return (
    <PageShell title="Pedidos" subtitle="Pedidos de clientes" onNuevo={() => setOpen(true)}>
      <DataTable columns={COLS} rows={rows} keyField="id_pedido" />
      <Modal title="Nuevo Pedido" open={open} onClose={() => { setOpen(false); setFormError(null); }}>
        <Alert msg={formError} />
        <Field label="ID Cliente" name="id_cliente" value={form.id_cliente} onChange={onChange} required />
        <Field label="Total"      name="total"       type="number" value={form.total} onChange={onChange} required />
        <FieldSelect label="Estado" name="estado" value={form.estado} onChange={onChange} options={ESTADOS} />
        <ModalFooter onCancel={() => { setOpen(false); setFormError(null); }} onSave={onSubmit} />
      </Modal>
    </PageShell>
  );
}
