import React from "react";
import { Button } from "@/components/ui/button";

const DeleteServiceModal = ({ service, isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/services/${service.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Erro ao deletar serviço");
      onDelete(service.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-4">Confirmar Exclusão</h2>
        <p className="mb-6">
          Tem certeza que deseja excluir o serviço{" "}
          <strong>{service.name}</strong>?
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400">
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteServiceModal;
