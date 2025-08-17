import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DashboardHeader from "@/components/admin/DashboardHeader";
import AddServiceModal from "@/components/admin/AddServiceModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DeleteServiceModal from "@/components/admin/DeleteServiceModal";
import EditServiceModal from "@/components/admin/EditServiceModal";
import { PlusCircle } from "lucide-react";
const ServicesPage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [deleteService, setDeleteService] = useState(null);

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
      fetchServices(token);
    } catch (err) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchServices = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao buscar serviços");

      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveService = (savedService) => {
    setServices((prev) => [...prev, savedService]);
    setIsModalOpen(false);
  };

  const getDestaqueColor = (destaque) => {
    switch (destaque) {
      case "Mais Popular":
        return "bg-yellow-400 text-white";
      case "Premium":
        return "bg-purple-600 text-white";
      case "Empresarial":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 bg-muted p-8">
        <DashboardHeader
          title="Serviços"
          subtitle="Gerencie os serviços oferecidos pelo sistema"
        />
        <div className="mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4 md:mt-0"
          >
            <PlusCircle />
          </button>
        </div>
        {loading ? (
          <p>Carregando serviços...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services && services.length > 0 ? (
              services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-elegant overflow-hidden hover:shadow-lg transition relative"
                >
                  {service.destaque && (
                    <Badge
                      className={`absolute top-4 right-4 ${getDestaqueColor(
                        service.destaque
                      )}`}
                    >
                      {service.destaque}
                    </Badge>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">
                        {service.name || "—"}
                      </h3>
                      <span className="text-sm text-gray-500">
                        #{String(service.id).slice(-4)}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-3">
                      {service.description || "—"}
                    </p>

                    {service.caracteristicas &&
                      service.caracteristicas.length > 0 && (
                        <ul className="mb-4 space-y-1">
                          {service.caracteristicas.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                    <p className="font-semibold text-primary mb-4">
                      Preço:{" "}
                      <span className="text-primary">
                        {service.preco || "—"}
                      </span>
                    </p>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => setEditService(service)}
                      >
                        Editar
                      </Button>
                      <Button
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => setDeleteService(service)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Nenhum serviço encontrado
              </div>
            )}
          </div>
        )}

        {isModalOpen && (
          <AddServiceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveService}
          />
        )}
      </main>
      {editService && (
        <EditServiceModal
          service={editService}
          isOpen={!!editService}
          onClose={() => setEditService(null)}
          onSave={(updated) => {
            setServices((prev) =>
              prev.map((s) => (s.id === updated.id ? updated : s))
            );
            setEditService(null);
          }}
        />
      )}

      {deleteService && (
        <DeleteServiceModal
          service={deleteService}
          isOpen={!!deleteService}
          onClose={() => setDeleteService(null)}
          onDelete={(id) => {
            setServices((prev) => prev.filter((s) => s.id !== id));
            setDeleteService(null);
          }}
        />
      )}
    </div>
  );
};

export default ServicesPage;
