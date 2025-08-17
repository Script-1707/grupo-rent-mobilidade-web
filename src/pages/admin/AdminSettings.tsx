// src/pages/admin/AdminSettings.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Sidebar from "@/components/admin/Sidebar";
import DashboardHeader from "@/components/admin/DashboardHeader";

const AdminSettings = () => {
  const navigate = useNavigate();

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
      }
    } catch (err) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 bg-muted p-8">
        <DashboardHeader
          title="Configurações"
          subtitle="Ajuste as preferências do sistema e sua conta de administrador."
        />

        <form
          onSubmit={handleSave}
          className="bg-white rounded-lg shadow p-6 space-y-6 max-w-2xl"
        >
          {/* Configurações da conta */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Conta do Administrador
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nome</label>
                <input
                  type="text"
                  defaultValue="Administrador"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue="admin@email.com"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Nova Senha</label>
                <input
                  type="password"
                  placeholder="Digite a nova senha"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </div>
          </div>

          {/* Configurações do sistema */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Configurações do Sistema
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">URL da API</label>
                <input
                  type="text"
                  defaultValue={import.meta.env.VITE_API_URL}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Tempo limite da reserva (em horas)
                </label>
                <input
                  type="number"
                  defaultValue={24}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Salvar Configurações
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdminSettings;
