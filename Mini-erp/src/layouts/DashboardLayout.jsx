import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex fv-dashboard" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0, background: "var(--bg)" }}>
        <Navbar />
        <main className="flex-grow-1 fv-main p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
