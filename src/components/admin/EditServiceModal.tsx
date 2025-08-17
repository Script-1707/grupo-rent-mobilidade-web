import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const EditServiceModal = ({ service, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    preco: "",
    destaque: "",
    caracteristicas: [],
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        description: service.description || "",
        preco: service.preco || "",
        destaque: service.destaque || "",
        caracteristicas: service.caracteristicas || [],
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/services/${service.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Erro ao atualizar serviço");

      const updated = await res.json();
      onSave(updated); // Atualiza lista no ServicesPage
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Editar Serviço</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          name="preco"
          value={formData.preco}
          onChange={handleChange}
          placeholder="Preço"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          name="destaque"
          value={formData.destaque}
          onChange={handleChange}
          placeholder="Destaque"
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400">
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditServiceModal;
