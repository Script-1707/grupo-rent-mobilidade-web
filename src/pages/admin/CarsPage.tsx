import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Fuel, Settings, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialCarState = {
  name: "",
  description: "",
  specifications: [],
  priceDaily: "",
  priceWeekly: "",
  priceMonthly: "",
  transmission: "",
  fuelType: "",
  seats: "",
  imageFile: null,
  status: "",
  categoryId: "",
};

const CarsPage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);

  // paginação
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  const [newCar, setNewCar] = useState(initialCarState);

  const handleCardClick = (car) => setSelectedCar(car);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Erro ao buscar categorias");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Erro ao carregar categorias:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "ROLE_ADMIN" && !decoded.isAdmin) {
        navigate("/");
        return;
      }
      fetchCars(token);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const fetchCars = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cars`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao buscar veículos");
      const data = await res.json();
      setCars(data || []);
    } catch (err) {
      console.error("Erro ao carregar carros:", err);
      toast.error("Erro ao carregar veículos!");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const formData = new FormData();

      const carData = {
        name: newCar.name,
        description: newCar.description,
        priceDaily: parseFloat(newCar.priceDaily) || 0,
        priceWeekly: parseFloat(newCar.priceWeekly) || 0,
        priceMonthly: parseFloat(newCar.priceMonthly) || 0,
        transmission: newCar.transmission,
        fuelType: newCar.fuelType,
        seats: parseInt(newCar.seats, 10) || 0,
        status: newCar.status,
        category: { id: newCar.categoryId },
        specifications: newCar.specifications
          .filter(Boolean)
          .map((s) => ({ name: s })),
      };

      formData.append(
        "car",
        new Blob([JSON.stringify(carData)], { type: "application/json" })
      );

      if (newCar.imageFile) {
        formData.append("image", newCar.imageFile);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cars`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Erro ao adicionar veículo");
      }

      const createdCar = await res.json();
      setCars((prev) => [...prev, createdCar]);

      // reset form
      setShowForm(false);
      setStep(1);
      setNewCar(initialCarState);

      toast.success("Veículo adicionado com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar veículo:", err);
      toast.error("Erro ao adicionar veículo!");
    }
  };

  const handleChange = (field, value) => {
    setNewCar((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 bg-muted p-8">
        <DashboardHeader
          title="Veículos"
          subtitle="Gerencie a frota de veículos do sistema"
        />

        <div className="mb-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <PlusCircle />
          </button>
        </div>

        {loading ? (
          <p>Carregando veículos...</p>
        ) : (
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            {/* Lista de Carros */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                {cars.length > 0 ? (
                  <>
                    {/* Grid de carros */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {currentCars.map((car) => (
                        <Card
                          key={car.id}
                          className="overflow-hidden hover:scale-105 shadow-elegant w-full"
                          onClick={() => handleCardClick(car)}
                        >
                          {/* Imagem e Categoria */}
                          <div className="relative">
                            <img
                              src={
                                car.image ||
                                "https://via.placeholder.com/800x400"
                              }
                              alt={car.name}
                              className="w-full h-48 object-cover"
                            />
                            <Badge
                              className={`absolute top-4 left-4 ${
                                {
                                  ECONÓMICO: "bg-green-500",
                                  SUV: "bg-yellow-500",
                                  PICKUP: "bg-gray-500",
                                  VAN: "bg-blue-500",
                                  INTERMEDIÁRIO: "bg-blue-700",
                                  LUXO: "bg-purple-600",
                                }[car.category?.name] || "bg-gray-400"
                              }`}
                            >
                              {car.category?.name || "—"}
                            </Badge>
                          </div>

                          {/* Cabeçalho */}
                          <CardHeader>
                            <CardTitle className="text-lg">
                              {car.name || "—"}
                            </CardTitle>
                            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {car.seats || "—"} lugares
                              </div>
                              <div className="flex items-center gap-1">
                                <Fuel className="w-4 h-4" />
                                {car.fuelType || "—"}
                              </div>
                              <div className="flex items-center gap-1">
                                <Settings className="w-4 h-4" />
                                {car.transmission || "—"}
                              </div>
                            </div>
                          </CardHeader>

                          {/* Conteúdo */}
                          <CardContent className="space-y-1">
                            {car.specifications?.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-1">
                                  Características:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {car.specifications.map((spec) => (
                                    <Badge
                                      key={spec.id}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {spec.name}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="space-y-1">
                              <h4 className="font-semibold">Preços:</h4>
                              <div className="text-xs space-y-1">
                                <div className="flex justify-between">
                                  <span>Diário:</span>
                                  <span className="font-medium">
                                    {car.priceDaily
                                      ? `${car.priceDaily} Kz`
                                      : "—"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Semanal:</span>
                                  <span className="font-medium">
                                    {car.priceWeekly
                                      ? `${car.priceWeekly} Kz`
                                      : "—"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Mensal:</span>
                                  <span className="font-medium">
                                    {car.priceMonthly
                                      ? `${car.priceMonthly} Kz`
                                      : "—"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-sm">
                              Reservar
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Paginação */}
                    <div className="flex justify-center mt-8 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                      >
                        Anterior
                      </Button>
                      {[...Array(totalPages)].map((_, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={
                            currentPage === index + 1 ? "default" : "outline"
                          }
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                      >
                        Próxima
                      </Button>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-500">
                    Nenhum veículo encontrado
                  </p>
                )}
              </div>
            </section>
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Adicionar Veículo</h2>

              <form onSubmit={handleAddCar}>
                {step === 1 && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={newCar.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full border p-2 rounded"
                      required
                    />
                    <textarea
                      placeholder="Descrição"
                      value={newCar.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    />
                    <div className="space-y-2">
                      <label className="block font-medium">
                        Especificações
                      </label>
                      {newCar.specifications.map((spec, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={spec}
                            onChange={(e) => {
                              const specs = [...newCar.specifications];
                              specs[idx] = e.target.value;
                              handleChange("specifications", specs);
                            }}
                            className="flex-1 border p-2 rounded"
                            placeholder="Ex: Airbag"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const specs = newCar.specifications.filter(
                                (_, i) => i !== idx
                              );
                              handleChange("specifications", specs);
                            }}
                            className="px-2 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          handleChange("specifications", [
                            ...newCar.specifications,
                            "",
                          ])
                        }
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        + Adicionar especificação
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <select
                      value={newCar.categoryId}
                      onChange={(e) =>
                        handleChange("categoryId", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Transmissão"
                      value={newCar.transmission}
                      onChange={(e) =>
                        handleChange("transmission", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Tipo de Combustível"
                      value={newCar.fuelType}
                      onChange={(e) => handleChange("fuelType", e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Número de Assentos"
                      value={newCar.seats}
                      onChange={(e) => handleChange("seats", e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleChange("imageFile", e.target.files[0])
                      }
                      className="w-full border p-2 rounded"
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Preço Diário"
                      value={newCar.priceDaily}
                      onChange={(e) =>
                        handleChange("priceDaily", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Preço Semanal"
                      value={newCar.priceWeekly}
                      onChange={(e) =>
                        handleChange("priceWeekly", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Preço Mensal"
                      value={newCar.priceMonthly}
                      onChange={(e) =>
                        handleChange("priceMonthly", e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Status"
                      value={newCar.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                )}

                <div className="flex justify-between mt-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Voltar
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s + 1)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Próximo
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Salvar
                    </button>
                  )}
                </div>
              </form>

              <button
                onClick={() => setShowForm(false)}
                className="mt-4 text-sm text-gray-500 hover:underline"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </main>
      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Editar Veículo</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={selectedCar.name}
                  onChange={(e) =>
                    setSelectedCar({ ...selectedCar, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Descrição</label>
                <textarea
                  value={selectedCar.description}
                  onChange={(e) =>
                    setSelectedCar({
                      ...selectedCar,
                      description: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Adicione os outros campos que deseja editar */}
              {selectedCar && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">
                      Editar Veículo: {selectedCar.name}
                    </h2>

                    <div className="space-y-4">
                      {/* Nome */}
                      <div>
                        <label className="block font-medium mb-1">Nome</label>
                        <input
                          type="text"
                          value={selectedCar.name}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              name: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                        />
                      </div>

                      {/* Descrição */}
                      <div>
                        <label className="block font-medium mb-1">
                          Descrição
                        </label>
                        <textarea
                          value={selectedCar.description}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              description: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                          rows={3}
                        />
                      </div>

                      {/* Categoria */}
                      <div>
                        <label className="block font-medium mb-1">
                          Categoria
                        </label>
                        <select
                          value={selectedCar.category?.id || ""}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              category: { id: e.target.value },
                            })
                          }
                          className="w-full border p-2 rounded"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Especificações */}
                      <div>
                        <label className="block font-medium mb-1">
                          Especificações
                        </label>
                        <div className="space-y-2">
                          {selectedCar.specifications?.map((spec, index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={spec.name || spec}
                                onChange={(e) => {
                                  const newSpecs = [
                                    ...selectedCar.specifications,
                                  ];
                                  newSpecs[index] = { name: e.target.value };
                                  setSelectedCar({
                                    ...selectedCar,
                                    specifications: newSpecs,
                                  });
                                }}
                                className="flex-1 border p-2 rounded"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newSpecs =
                                    selectedCar.specifications.filter(
                                      (_, i) => i !== index
                                    );
                                  setSelectedCar({
                                    ...selectedCar,
                                    specifications: newSpecs,
                                  });
                                }}
                                className="px-2 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCar({
                                ...selectedCar,
                                specifications: [
                                  ...selectedCar.specifications,
                                  { name: "" },
                                ],
                              });
                            }}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                          >
                            + Adicionar especificação
                          </button>
                        </div>
                      </div>

                      {/* Preços */}
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block font-medium mb-1">
                            Preço Diário
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={selectedCar.priceDaily}
                            onChange={(e) =>
                              setSelectedCar({
                                ...selectedCar,
                                priceDaily: e.target.value,
                              })
                            }
                            className="w-full border p-2 rounded"
                          />
                        </div>
                        <div>
                          <label className="block font-medium mb-1">
                            Preço Semanal
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={selectedCar.priceWeekly}
                            onChange={(e) =>
                              setSelectedCar({
                                ...selectedCar,
                                priceWeekly: e.target.value,
                              })
                            }
                            className="w-full border p-2 rounded"
                          />
                        </div>
                        <div>
                          <label className="block font-medium mb-1">
                            Preço Mensal
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={selectedCar.priceMonthly}
                            onChange={(e) =>
                              setSelectedCar({
                                ...selectedCar,
                                priceMonthly: e.target.value,
                              })
                            }
                            className="w-full border p-2 rounded"
                          />
                        </div>
                      </div>

                      {/* Detalhes técnicos */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-medium mb-1">
                            Transmissão
                          </label>
                          <input
                            type="text"
                            value={selectedCar.transmission}
                            onChange={(e) =>
                              setSelectedCar({
                                ...selectedCar,
                                transmission: e.target.value,
                              })
                            }
                            className="w-full border p-2 rounded"
                          />
                        </div>
                        <div>
                          <label className="block font-medium mb-1">
                            Tipo de Combustível
                          </label>
                          <input
                            type="text"
                            value={selectedCar.fuelType}
                            onChange={(e) =>
                              setSelectedCar({
                                ...selectedCar,
                                fuelType: e.target.value,
                              })
                            }
                            className="w-full border p-2 rounded"
                          />
                        </div>
                        <div>
                          <label className="block font-medium mb-1">
                            Número de Assentos
                          </label>
                          <input
                            type="number"
                            value={selectedCar.seats}
                            onChange={(e) =>
                              setSelectedCar({
                                ...selectedCar,
                                seats: e.target.value,
                              })
                            }
                            className="w-full border p-2 rounded"
                          />
                        </div>
                        <div>
                          <label className="block font-medium mb-1">
                            Status
                          </label>
                          <select
                            value={selectedCar.status}
                            onChange={(e) =>
                              setSelectedCar({
                                ...selectedCar,
                                status: e.target.value,
                              })
                            }
                            className="w-full border p-2 rounded"
                          >
                            <option value="on">Disponível</option>
                            <option value="off">Indisponível</option>
                            <option value="maintenance">Em Manutenção</option>
                          </select>
                        </div>
                      </div>
                      {/* Imagem */}
                      <div className="mt-4">
                        <label className="block font-medium mb-1">
                          URL da Imagem
                        </label>
                        <input
                          type="text"
                          value={selectedCar.image}
                          onChange={(e) =>
                            setSelectedCar({
                              ...selectedCar,
                              image: e.target.value,
                            })
                          }
                          className="w-full border p-2 rounded"
                        />
                        {/* Preview */}
                        {selectedCar.imageFile ? (
                          <div className="mt-2">
                            <img
                              src={URL.createObjectURL(selectedCar.imageFile)}
                              alt="Preview"
                              className="w-full h-40 object-contain border rounded"
                            />
                          </div>
                        ) : selectedCar.image ? (
                          <div className="mt-2">
                            <img
                              src={selectedCar.image}
                              alt="Preview"
                              className="w-full h-40 object-contain border rounded"
                            />
                          </div>
                        ) : null}
                      </div>

                      {/* Botões */}
                      <div className="flex justify-end gap-2 pt-4">
                        <button
                          onClick={() => setSelectedCar(null)}
                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              const token = localStorage.getItem("token");
                              const formData = new FormData();

                              formData.append(
                                "car",
                                new Blob(
                                  [
                                    JSON.stringify({
                                      id: selectedCar.id,
                                      name: selectedCar.name,
                                      description: selectedCar.description,
                                      priceWeekly: selectedCar.priceWeekly,
                                      priceDaily: selectedCar.priceDaily,
                                      priceMonthly: selectedCar.priceMonthly,
                                      transmission: selectedCar.transmission,
                                      fuelType: selectedCar.fuelType,
                                      seats: selectedCar.seats,
                                      status: selectedCar.status,
                                      specifications:
                                        selectedCar.specifications.map((s) => ({
                                          name: s.name,
                                        })),
                                      category: { id: selectedCar.category.id },
                                      image: selectedCar.image,
                                    }),
                                  ],
                                  { type: "application/json" }
                                )
                              );

                              if (selectedCar.imageFile) {
                                formData.append("image", selectedCar.imageFile);
                              }

                              const res = await fetch(
                                `${import.meta.env.VITE_API_URL}/api/cars/${
                                  selectedCar.id
                                }`,
                                {
                                  method: "PUT",
                                  headers: { Authorization: `Bearer ${token}` },
                                  body: formData,
                                }
                              );

                              if (!res.ok)
                                throw new Error("Erro ao atualizar veículo");

                              const updatedCar = await res.json();
                              setCars(
                                cars.map((car) =>
                                  car.id === updatedCar.id ? updatedCar : car
                                )
                              );
                              setSelectedCar(null);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Salvar Edição
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsPage;
