import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Login         from "./pages/login";
import Moteros       from "./pages/moteros";
import Destinos      from "./pages/destinos";
import Viajes        from "./pages/viajes";
import Itinerario    from "./pages/itinerario";
import Eventos       from "./pages/eventos";
import Inscripciones from "./pages/inscripciones";
import Comentarios   from "./pages/comentarios";
import Clientes      from "./pages/clientes";
import Productos     from "./pages/productos";
import Pedidos       from "./pages/pedidos";
import Ventas        from "./pages/ventas";
import Imagenes      from "./pages/imagenes";

function DL({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<Login />} />
        <Route path="/login"         element={<Login />} />
        <Route path="/moteros"       element={<DL><Moteros /></DL>} />
        <Route path="/destinos"      element={<DL><Destinos /></DL>} />
        <Route path="/viajes"        element={<DL><Viajes /></DL>} />
        <Route path="/itinerario"    element={<DL><Itinerario /></DL>} />
        <Route path="/eventos"       element={<DL><Eventos /></DL>} />
        <Route path="/inscripciones" element={<DL><Inscripciones /></DL>} />
        <Route path="/comentarios"   element={<DL><Comentarios /></DL>} />
        <Route path="/clientes"      element={<DL><Clientes /></DL>} />
        <Route path="/productos"     element={<DL><Productos /></DL>} />
        <Route path="/pedidos"       element={<DL><Pedidos /></DL>} />
        <Route path="/ventas"        element={<DL><Ventas /></DL>} />
        <Route path="/imagenes"      element={<DL><Imagenes /></DL>} />
      </Routes>
    </BrowserRouter>
  );
}
