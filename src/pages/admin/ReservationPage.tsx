// src/pages/admin/Reservations.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DashboardHeader from "@/components/admin/DashboardHeader";
import toast from "react-hot-toast";

const Reservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [newStatus, setNewStatus] = useState("");
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
      fetchReservations(token);
    } catch (err) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchReservations = async (token) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reservations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Erro ao buscar reservas");

      const data = await res.json();
      setReservations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseModal = () => {
    setSelectedReservation(null);
    setNewStatus(""); // 👈 reset
  };
  const updateStatus = async (id) => {
    if (!newStatus) return;
    const toastId = toast.loading("A atualizar status..."); // 👈 loading
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reservations/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Erro ao atualizar status");

      const updated = await res.json();

      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: updated.status } : r))
      );

      setSelectedReservation((prev) =>
        prev ? { ...prev, status: updated.status } : prev
      );

      setNewStatus("");
      handleCloseModal();

      toast.success("✅ Status atualizado com sucesso!", { id: toastId }); // substitui o loading
    } catch (err) {
      console.error(err);
      toast.error("❌ Erro ao atualizar status.", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 bg-muted p-8">
        <DashboardHeader
          title="Reservas"
          subtitle="Gerencie as reservas do sistema, pode clicar para ver detalhadamente cada item"
        />

        {loading ? (
          <p>Carregando reservas...</p>
        ) : (
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Cliente</th>
                  <th className="p-2 border">Veículo</th>
                  <th className="p-2 border">Data Início</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.length > 0 ? (
                  reservations.map((reserva) => (
                    <tr
                      key={reserva.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedReservation(reserva)}
                    >
                      <td className="p-2 border">{reserva.id}</td>
                      <td className="p-2 border">{reserva.clientName}</td>
                      <td className="p-2 border">{reserva.car?.name || "—"}</td>
                      <td className="p-2 border">
                        {new Date(reserva.pickupDate).toLocaleDateString(
                          "pt-PT"
                        )}
                      </td>
                      <td className="p-2 border text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold
              ${
                reserva.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : reserva.status === "APPROVED"
                  ? "bg-green-100 text-green-700"
                  : reserva.status === "CANCELLED"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
                        >
                          {reserva.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      Nenhuma reserva encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {selectedReservation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 max-w-2xl relative transform transition-all duration-300 scale-100">
              {/* Cabeçalho */}
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Detalhes da Reserva
                </h2>
                <button
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>

              {/* Conteúdo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p>
                    <strong>ID:</strong> {selectedReservation.id}
                  </p>
                  <p>
                    <strong>Cliente:</strong> {selectedReservation.clientName}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedReservation.clientEmail}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {selectedReservation.clientPhone}
                  </p>
                  <p>
                    <strong>Veículo:</strong>{" "}
                    {selectedReservation.car?.name || "—"}
                  </p>
                  <p>
                    <strong>Com Motorista:</strong>{" "}
                    {selectedReservation.withDriver ? "Sim" : "Não"}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Data Início:</strong>{" "}
                    {new Date(
                      selectedReservation.pickupDate
                    ).toLocaleDateString("pt-PT")}
                  </p>
                  <p>
                    <strong>Local Início:</strong>{" "}
                    {selectedReservation.pickupLocation}
                  </p>
                  <p>
                    <strong>Data Fim:</strong>{" "}
                    {new Date(
                      selectedReservation.returnDate
                    ).toLocaleDateString("pt-PT")}
                  </p>
                  <p>
                    <strong>Local Fim:</strong>{" "}
                    {selectedReservation.returnLocation}
                  </p>
                  <p>
                    <strong>Nota:</strong> {selectedReservation.note || "—"}
                  </p>
                  <p>
                    <strong>Preço Total:</strong>{" "}
                    {selectedReservation.totalPrice} Kz
                  </p>
                  <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <select
                      value={newStatus || selectedReservation.status}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  onClick={() => updateStatus(selectedReservation.id)}
                >
                  Salvar
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  onClick={() => setSelectedReservation(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Reservations;
