import { useEffect, useState } from "react";
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
import { Fuel, Users, Settings, Tag, Search } from "lucide-react";
import 'aos/dist/aos.css';

// Static DB (public/static-db) will provide categories and vehicles JSON
// We'll fetch them and transform vehicles (grouped by category) into a flat list

type StaticCategory = { id?: number; name: string; slug?: string };
type CarData = {
  name: string;
  image: string;
  seats: number;
  transmission: string;
  fuel_type: string;
  specifications: string[];
  price_daily?: number | null;
};
type VehicleGroup = { category: string; description?: string; cars: CarData[] };
type FlatCar = {
  id: string;
  name: string;
  image: string;
  seats: number;
  transmission: string;
  fuel: string;
  fuelType: string;
  specifications: { id: number; name: string }[];
  priceDaily: number | null;
  category: { name: string };
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filtroTransmissao, setFiltroTransmissao] = useState("todos");
  const [filtroLugares, setFiltroLugares] = useState("todos");
  // Local state for cars and categories
  const [cars, setCars] = useState<FlatCar[]>([]);
  const [categorias, setCategorias] = useState<{ value: string; label: string }[]>([{ value: "todos", label: "Todas as Categorias" }]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([
      fetch('/static-db/categories.json').then((r) => r.json()),
      fetch('/static-db/vehicles.json').then((r) => r.json()),
    ])
      .then(([catsData, vehiclesData]: [StaticCategory[], VehicleGroup[]]) => {
        if (!mounted) return;
        // categories for select
        const catsOptions = [
          { value: 'todos', label: 'Todas as Categorias' },
          ...catsData.map((cat: StaticCategory) => ({ value: cat.name, label: getCategoriaLabel(cat.name) })),
        ];
        setCategorias(catsOptions);

        // vehiclesData is an array of categories each with cars[]
        const flatCars: FlatCar[] = [];
        vehiclesData.forEach((group: VehicleGroup, groupIdx: number) => {
          const categoryName = group.category;
          group.cars.forEach((c: CarData, idx: number) => {
            flatCars.push({
              id: `${groupIdx}-${idx}`,
              name: c.name,
              image: c.image.startsWith('/') ? c.image : `/cars/${c.image}`,
              seats: c.seats,
              transmission: c.transmission,
              fuel: (c.fuel_type || '').toLowerCase(),
              fuelType: c.fuel_type || '',
              specifications: (c.specifications || []).map((s: string, i: number) => ({ id: i, name: s })),
              priceDaily: c.price_daily ?? null,
              category: { name: categoryName },
            });
          });
        });
        setCars(flatCars);
      })
      .catch((err) => {
        if (mounted) setLoadError(err.message || 'Erro ao carregar dados estáticos');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const combustiveis = [
    { value: "todos", label: "Todos os Combustíveis" },
    { value: "gasolina", label: "Gasolina" },
    { value: "diesel", label: "Diesel" },
    { value: "hibrido", label: "Híbrido" },
  ];

  const formatPrice = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " Kz";

  const carsFiltrados = cars.filter((car) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" || (car.name || "").toLowerCase().includes(q);

    const categoriaMatch = filtroCategoria === "todos" || car.category?.name === filtroCategoria;
    const combustivelMatch = filtroCombustivel === "todos" || car.fuel === filtroCombustivel;

    const transmissaoMatch =
      filtroTransmissao === "todos" || (car.transmission || "").toLowerCase().includes(filtroTransmissao);

    const lugaresMatch =
      filtroLugares === "todos" || (typeof car.seats === 'number' && car.seats >= Number(filtroLugares));

    return matchesSearch && categoriaMatch && combustivelMatch && transmissaoMatch && lugaresMatch;
  });

  if (loading) return <p className="text-center py-16">Carregando...</p>;
  if (loadError) return <p className="text-center py-16">Erro ao carregar dados: {loadError}</p>;

  return (
    <div className="min-h-screen bg-background">
      {/* Pesquisa (topo) */}
      <section className="py-6" data-aos="fade-down">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-full sm:w-96">

            <input
              aria-label="Pesquisar por nome"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por nome"
              className="w-full px-3 py-2 rounded-md border bg-background text-sm"
            />
          </div>
        </div>
      </section>

      {/* Filtros (abaixo da pesquisa) */}
      <section className="py-4 bg-muted/30" data-aos="fade-up">
        <div className="container mx-auto px-4 flex flex-wrap gap-4 justify-center items-center">
          <div className="flex flex-col items-center">
            <span className="text-sm text-red-600 font-medium mb-1 text-center flex items-center">
              <Tag className="w-4 h-4 mr-2 text-red-600" />
              Categoria
            </span>
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
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm text-red-600 font-medium mb-1 text-center flex items-center">
              <Settings className="w-4 h-4 mr-2 text-red-600" />
              Transmissão
            </span>
            <Select value={filtroTransmissao} onValueChange={setFiltroTransmissao}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Transmissão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Transmissões</SelectItem>
                <SelectItem value="automatico">Automático</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm text-red-600 font-medium mb-1 text-center flex items-center">
              <Users className="w-4 h-4 mr-2 text-red-600" />
              Lugares
            </span>
            <Select value={filtroLugares} onValueChange={setFiltroLugares}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Lugares" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Lugares</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
                <SelectItem value="7">7+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm text-red-600 font-medium mb-1 text-center flex items-center">
              <Fuel className="w-4 h-4 mr-2 text-red-600" />
              Combustível
            </span>
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
        </div>
      </section>

      {/* Lista de carros */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carsFiltrados.length === 0 ? (
            <p className="text-center col-span-full">Nenhum veículo encontrado com os filtros selecionados.</p>
          ) : (
            carsFiltrados.map((car) => (
              <Card
                key={car.id}
                className="overflow-hidden hover:scale-105 shadow-elegant w-full"
                data-aos="zoom-in"
              >
                <div className="relative">
                  <img
                    src={car.image || "https://via.placeholder.com/800x400"}
                    alt={car.name || "—"}
                    className="w-full h-60 object-cover"
                  />
                  <Badge
                    className={`absolute top-4 left-4 ${{
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
                        <span>Desde AOA</span>
                        <span className="font-medium">
                          {car.priceDaily ? formatPrice(car.priceDaily) : "—"}
                        </span> / dia
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-gradient-primary/90">
                    Reservar
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Frotas;
