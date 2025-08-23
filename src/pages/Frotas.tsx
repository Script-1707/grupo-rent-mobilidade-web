import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fuel, Users, Settings } from "lucide-react";

// Função para buscar carros
const fetchCars = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cars`);
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  return response.json();
};

// Função para buscar categorias
const fetchCategories = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/categories`
  );
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  const data = await response.json();
  return [
    { value: "todos", label: "Todas as Categorias" },
    ...data.map((cat) => ({
      value: cat.name,
      label: getCategoriaLabel(cat.name),
    })),
  ];
};

// Função auxiliar para labels
const getCategoriaLabel = (categoria: string) => {
  switch (categoria?.toLowerCase()) {
    case "economico":
      return "Económico";
    case "intermedio":
      return "Intermédio";
    case "luxo":
      return "Luxo";
    case "suv":
      return "SUV";
    case "pickup":
      return "Pick-Up";
    case "van":
      return "Van & Grupo";
    default:
      return categoria;
  }
};

const Frotas = ({ token }) => {
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroCombustivel, setFiltroCombustivel] = useState("todos");

  // Query de carros
  const {
    data: cars = [],
    isLoading: loadingCars,
    isError: errorCars,
  } = useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
    staleTime: 1000 * 60 * 5, // 5 minutos sem refetch
    cacheTime: 1000 * 60 * 30, // 30 minutos no cache
  });

  // Query de categorias
  const {
    data: categorias = [],
    isLoading: loadingCategorias,
    isError: errorCategorias,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  const combustiveis = [
    { value: "todos", label: "Todos os Combustíveis" },
    { value: "gasolina", label: "Gasolina" },
    { value: "diesel", label: "Diesel" },
    { value: "hibrido", label: "Híbrido" },
  ];

  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " Kz";

  const carsFiltrados = cars.filter((car) => {
    const categoriaMatch =
      filtroCategoria === "todos" || car.category?.name === filtroCategoria;
    const combustivelMatch =
      filtroCombustivel === "todos" || car.fuel === filtroCombustivel;
    return categoriaMatch && combustivelMatch;
  });

  if (loadingCars || loadingCategorias) {
    return <p className="text-center py-16">Carregando...</p>;
  }

  if (errorCars || errorCategorias) {
    return <p className="text-center py-16">Erro ao carregar dados.</p>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Filtros */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-wrap gap-4 justify-center">
          <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Categorias" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map((categoria) => (
                <SelectItem key={categoria.value} value={categoria.value}>
                  {categoria.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filtroCombustivel}
            onValueChange={setFiltroCombustivel}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Combustível" />
            </SelectTrigger>
            <SelectContent>
              {combustiveis.map((combustivel) => (
                <SelectItem key={combustivel.value} value={combustivel.value}>
                  {combustivel.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Lista de carros */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carsFiltrados.map((car) => (
            <Card
              key={car.id}
              className="overflow-hidden hover:scale-105 shadow-elegant w-full"
            >
              <div className="relative">
                <img
                  src={car.image || "https://via.placeholder.com/800x400"}
                  alt={car.name || "—"}
                  className="w-full h-60 object-cover"
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

              <CardHeader>
                <CardTitle className="text-xl">{car.name || "—"}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

              <CardContent className="space-y-4">
                {car.specifications?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Características:</h4>
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

                <div className="space-y-2">
                  <h4 className="font-semibold">Preços:</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Diário:</span>
                      <span className="font-medium">
                        {car.priceDaily ? formatPrice(car.priceDaily) : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Semanal:</span>
                      <span className="font-medium">
                        {car.priceWeekly ? formatPrice(car.priceWeekly) : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mensal:</span>
                      <span className="font-medium">
                        {car.priceMonthly ? formatPrice(car.priceMonthly) : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90">
                  Reservar Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Frotas;
