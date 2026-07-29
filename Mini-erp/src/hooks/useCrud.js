import { useEffect, useState } from "react";

export function useCrud(fetchFn, createFn) {
  const [rows, setRows]           = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [open, setOpen]           = useState(false);
  const [formError, setFormError] = useState(null);

  const load = () => {
    setLoading(true);
    fetchFn()
      .then(data => { setRows(data); setLoading(false); })
      .catch(() => { setError("No se pudieron cargar los datos"); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (form) => {
    const res = await createFn(form);
    if (!res.success) { setFormError(res.message); return false; }
    setFormError(null);
    setOpen(false);
    load();
    return true;
  };

  return { rows, loading, error, open, setOpen, formError, setFormError, handleCreate };
}
