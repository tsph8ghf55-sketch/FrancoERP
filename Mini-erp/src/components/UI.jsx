/* Componentes compartidos — Bootstrap + escala de grises retro */

/* ── Modal ── */
export function Modal({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fv-modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="fv-modal-box">
        <div className="fv-modal-header">
          <span className="fv-modal-title">{title}</span>
          <button className="fv-close" onClick={onClose}>×</button>
        </div>
        <div className="fv-modal-body">{children}</div>
      </div>
    </div>
  );
}

/* ── Alerta ── */
export function Alert({ msg }) {
  if (!msg) return null;
  return <div className="fv-alert">{msg}</div>;
}

/* ── Campo texto ── */
export function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div className="mb-3">
      <label className="fv-label">
        {label}{required && <span style={{ color: "#aaa", marginLeft: "2px" }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control fv-input"
      />
    </div>
  );
}

/* ── Textarea ── */
export function FieldArea({ label, name, value, onChange }) {
  return (
    <div className="mb-3">
      <label className="fv-label">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="form-control fv-input"
        style={{ resize: "vertical" }}
      />
    </div>
  );
}

/* ── Select ── */
export function FieldSelect({ label, name, value, onChange, options }) {
  return (
    <div className="mb-3">
      <label className="fv-label">{label}</label>
      <select name={name} value={value} onChange={onChange} className="form-select fv-input">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

/* ── Pie de modal ── */
export function ModalFooter({ onCancel, onSave }) {
  return (
    <div className="d-flex justify-content-end gap-2 mt-3">
      <button className="btn btn-retro-outline" onClick={onCancel}>Cancelar</button>
      <button className="btn btn-retro" onClick={onSave}>Guardar</button>
    </div>
  );
}

/* ── Tabla ── */
export function DataTable({ columns, rows, keyField }) {
  if (!rows.length) return <p className="fv-empty">Sin registros aún.</p>;
  return (
    <div className="table-responsive fv-table-wrap">
      <table className="table table-hover table-striped fv-table">
        <thead>
          <tr>
            {columns.map(col => <th key={col.key}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row[keyField] ?? i}>
              {columns.map(col => (
                <td key={col.key} className={col.accent ? "accent" : ""}>
                  {row[col.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Shell de página ── */
export function PageShell({ title, subtitle, onNuevo, children }) {
  return (
    <div className="fv-page">
      <div className="fv-page-header">
        <div>
          <h2 className="fv-page-title">{title}</h2>
          {subtitle && <p className="fv-page-subtitle">{subtitle}</p>}
        </div>
        {onNuevo && (
          <button className="btn btn-retro" onClick={onNuevo}>+ Nuevo</button>
        )}
      </div>
      <div className="fv-card fv-content-card">
        {children}
      </div>
    </div>
  );
}
