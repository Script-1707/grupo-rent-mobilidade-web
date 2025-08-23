// src/pages/admin/ContactInquiryPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DashboardHeader from "@/components/admin/DashboardHeader";

const ContactInquiryPage = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

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
      fetchInquiries(token);
    } catch (err) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchInquiries = async (token) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact-inquiries`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Erro ao buscar mensagens");

      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 bg-muted p-8">
        <DashboardHeader
          title="Mensagens de Contato"
          subtitle="Gerencie as mensagens enviadas pelo formulário de contato"
        />

        {loading ? (
          <p>Carregando mensagens...</p>
        ) : (
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Nome</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Telefone</th>
                  <th className="p-2 border">Assunto</th>
                  <th className="p-2 border">Ação</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length > 0 ? (
                  inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{inquiry.id}</td>
                      <td className="p-2 border">{inquiry.name || "—"}</td>
                      <td className="p-2 border">{inquiry.email || "—"}</td>
                      <td className="p-2 border">{inquiry.phone || "—"}</td>
                      <td className="p-2 border">{inquiry.subject || "—"}</td>
                      <td className="p-2 border text-center">
                        <button
                          onClick={() => setSelectedMessage(inquiry)}
                          className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Ver mensagem
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      Nenhuma mensagem encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <h2 className="text-xl font-bold mb-4">
                Mensagem de {selectedMessage.name}
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {selectedMessage.message}
              </p>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
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

export default ContactInquiryPage;
