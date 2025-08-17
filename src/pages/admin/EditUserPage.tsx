// src/pages/admin/EditUserPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "@/components/admin/DashboardHeader";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Erro ao carregar usuário");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setToast({ type: "error", message: "Erro ao carregar usuário" });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(e.target);

    const updatedUser = {
      username: formData.get("username"),
      email: formData.get("email"),
      role: formData.get("role"),
      isActive: formData.get("isActive") === "true",
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (!res.ok) throw new Error("Erro ao atualizar usuário");
      setToast({ type: "success", message: "Usuário atualizado com sucesso" });
      setTimeout(() => navigate("/admin/users"), 1500);
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Erro ao atualizar usuário" });
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!user) return <p>Usuário não encontrado</p>;

  return (
    <div className="min-h-screen p-8 bg-muted">
      <DashboardHeader title="Editar Usuário" subtitle={`ID: ${user.id}`} />
      <form
        onSubmit={handleUpdate}
        className="max-w-md bg-white p-6 rounded shadow space-y-3"
      >
        <input
          name="username"
          placeholder="Nome"
          defaultValue={user.username}
          required
          className="w-full border rounded p-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={user.email}
          required
          className="w-full border rounded p-2"
        />
        <select
          name="role"
          defaultValue={user.role}
          className="w-full border rounded p-2"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <select
          name="isActive"
          defaultValue={user.isActive.toString()}
          className="w-full border rounded p-2"
        >
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Salvar
        </button>
      </form>

      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default EditUserPage;
