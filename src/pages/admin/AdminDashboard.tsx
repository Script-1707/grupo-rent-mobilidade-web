import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Sidebar from "@/components/admin/Sidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";
import StatCard from "@/components/admin/StatCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    usuarios: 0,
    reservas: 0,
    veiculos: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "ROLE_ADMIN" && !decoded.isAdmin) {
        navigate("/");
        return;
      }

      fetchDashboardData(token);
    } catch (err) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchDashboardData = async (token) => {
    try {
      const [usuariosRes, reservasRes, veiculosRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/reservations`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/cars`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const usuariosData = await usuariosRes.json();
      const reservasData = await reservasRes.json();
      const veiculosData = await veiculosRes.json();

      setStats({
        usuarios: usuariosData.length || 0,
        reservas: reservasData.length || 0,
        veiculos: veiculosData.length || 0,
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar agora terá link para /admin/users */}

      <main className="flex-1 bg-muted p-8">
        <DashboardHeader
          title="Bem-vindo, Administrador!"
          subtitle="Aqui você pode gerenciar usuários, reservas e veículos do sistema."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/admin/users")}
            className="cursor-pointer"
          >
            <StatCard label="Usuários" value={stats.usuarios} />
          </div>

          <StatCard label="Reservas" value={stats.reservas} />
          <StatCard label="Veículos" value={stats.veiculos} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
