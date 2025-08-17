// src/pages/admin/UsersPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DashboardHeader from "@/components/admin/DashboardHeader";

import { PlusCircle } from "lucide-react";
import { DeleteIcon } from "lucide-react";
import { EditIcon } from "lucide-react";
const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "ROLE_ADMIN" && !decoded.isAdmin)
        return navigate("/");
      fetchUsers(token);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
      setToast({ type: "error", message: "Erro ao carregar usuários" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setToast({ type: "success", message: "Usuário excluído com sucesso" });
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      setToast({ type: "error", message: "Erro ao excluir usuário" });
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData(e.target);
    const newUser = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/register-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newUser),
        }
      );
      if (!res.ok) throw new Error("Erro ao criar usuário");
      const createdUser = await res.json();
      setUsers((prev) => [createdUser, ...prev]);
      setShowCreateModal(false);
      setToast({ type: "success", message: "Usuário criado com sucesso" });
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: "Erro ao criar usuário" });
    }
  };

  // Filtro e paginação
  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 bg-muted p-8">
        <DashboardHeader
          title="Gerenciar Usuários"
          subtitle="Visualize, edite ou remova usuários do sistema."
        />

        {/* Ações */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por nome, email ou role"
            className="border rounded p-2 w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            <PlusCircle />
          </button>
        </div>

        {/* Tabela */}
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Nome</th>
                <th className="p-3">Email</th>
                <th className="p-3">ROLE</th>
                <th className="p-3">Status</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                      {user.isActive ? "Ativo" : "Inativo"}
                    </td>
                    <td className="p-3 flex flex-row gap-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="bg-blue-500 px-2 py-2 text-white rounded"
                      >
                        <EditIcon />
                      </button>

                      <button
                        onClick={() => setUserToDelete(user)} // abre modal
                        className="bg-red-500 px-2 py-2 text-white rounded"
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-3 py-1">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        )}

        {/* Modal de criação */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Novo Usuário</h2>
              <form className="space-y-3" onSubmit={handleCreate}>
                <input
                  name="username"
                  placeholder="Nome"
                  required
                  className="w-full border rounded p-2"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full border rounded p-2"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Senha"
                  required
                  className="w-full border rounded p-2"
                />
                <select name="role" className="w-full border rounded p-2">
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded w-full"
                >
                  Criar
                </button>
              </form>
            </div>
          </div>
        )}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setEditingUser(null)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Editar Usuário</h2>
              <form
                className="space-y-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const token = localStorage.getItem("token");
                  const formData = new FormData(e.target);
                  const updatedUser = {
                    username: formData.get("username"),
                    email: formData.get("email"),
                    role: formData.get("role"),
                  };
                  try {
                    const res = await fetch(
                      `${import.meta.env.VITE_API_URL}/api/users/${
                        editingUser.id
                      }`,
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
                    const data = await res.json();
                    setUsers((prev) =>
                      prev.map((u) => (u.id === data.id ? data : u))
                    );
                    setEditingUser(null);
                    setToast({
                      type: "success",
                      message: "Usuário atualizado com sucesso",
                    });
                  } catch (err) {
                    console.error(err);
                    setToast({
                      type: "error",
                      message: "Erro ao atualizar usuário",
                    });
                  }
                }}
              >
                <input
                  name="username"
                  defaultValue={editingUser.username}
                  placeholder="Nome"
                  required
                  className="w-full border rounded p-2"
                />
                <input
                  name="email"
                  type="email"
                  defaultValue={editingUser.email}
                  placeholder="Email"
                  required
                  className="w-full border rounded p-2"
                />
                <select
                  name="role"
                  defaultValue={editingUser.role}
                  className="w-full border rounded p-2"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                  Salvar
                </button>
              </form>
            </div>
          </div>
        )}
        {/* Modal de confirmação de exclusão */}
        {userToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative shadow-lg">
              <h2 className="text-xl font-bold mb-4">Excluir Usuário</h2>
              <p className="mb-6">
                Tem certeza que deseja excluir o usuário{" "}
                <strong>{userToDelete.username}</strong>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setUserToDelete(null)} // cancela
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    handleDelete(userToDelete.id);
                    setUserToDelete(null);
                  }}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
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
      </main>
    </div>
  );
};

export default UsersPage;
