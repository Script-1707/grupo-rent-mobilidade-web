// src/components/admin/AdminLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 bg-muted p-8">
        <Outlet />
      </main>
    </div>
  );
}
