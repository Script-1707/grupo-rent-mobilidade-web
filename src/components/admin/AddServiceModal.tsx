// src/components/admin/AddServiceModal.jsx
import React, { useState } from "react";

const AddServiceModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [preco, setPreco] = useState("");
  const [destaque, setDestaque] = useState(false);
  const [caracteristicas, setCaracteristicas] = useState([""]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCaracteristicaChange = (index, value) => {
    const updated = [...caracteristicas];
    updated[index] = value;
    setCaracteristicas(updated);
  };

  const addCaracteristicaField = () => {
    setCaracteristicas([...caracteristicas, ""]);
  };

  const removeCaracteristicaField = (index) => {
    setCaracteristicas(caracteristicas.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    const newService = {
      name,
      description,
      preco,
      destaque,
      caracteristicas: caracteristicas.filter((c) => c.trim() !== ""),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newService),
      });

      if (!res.ok) throw new Error("Erro ao salvar serviço");

      const savedService = await res.json();
      onSave(savedService); // atualiza a lista no parent
      onClose(); // fecha o modal
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar serviço.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <h2 className="text-xl font-bold mb-4">Adicionar Serviço</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={destaque}
              onChange={(e) => setDestaque(e.target.checked)}
            />
            <span>Destaque</span>
          </label>

          <div>
            <label className="font-semibold">Características</label>
            {caracteristicas.map((c, idx) => (
              <div key={idx} className="flex space-x-2 mt-1">
                <input
                  type="text"
                  value={c}
                  onChange={(e) =>
                    handleCaracteristicaChange(idx, e.target.value)
                  }
                  className="flex-1 border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeCaracteristicaField(idx)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCaracteristicaField}
              className="text-blue-500 mt-2"
            >
              + Adicionar característica
            </button>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
