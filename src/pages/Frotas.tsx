import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, Fuel, Users, Settings } from "lucide-react";

const Frotas = ({ token }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroCombustivel, setFiltroCombustivel] = useState("todos");
  const [categorias, setCategorias] = useState([]);
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " Kz";
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories`
      );
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      // Supondo que data seja um array de { id, name }
      setCategorias([
        { value: "todos", label: "Todas as Categorias" },
        ...data.map((cat) => ({
          value: cat.name,
          label: getCategoriaLabel(cat.name), // reutilizando sua função de label
        })),
      ]);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };
  useEffect(() => {
    fetchCars();
    fetchCategories();
  }, []);

  const combustiveis = [
    { value: "todos", label: "Todos os Combustíveis" },
    { value: "gasolina", label: "Gasolina" },
    { value: "diesel", label: "Diesel" },
    { value: "hibrido", label: "Híbrido" },
  ];

  // Função para buscar carros do backend
  const fetchCars = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cars`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Erro ao buscar veículos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const carsFiltrados = cars.filter((car) => {
    const categoriaMatch =
      filtroCategoria === "todos" || car.category.name === filtroCategoria;
    const combustivelMatch =
      filtroCombustivel === "todos" || car.fuel === filtroCombustivel;
    return categoriaMatch && combustivelMatch;
  });

  const getCategoriaLabel = (categoria: string) => {
    switch (categoria) {
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

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "economico":
        return "bg-green-100 text-green-800";
      case "intermedio":
        return "bg-blue-100 text-blue-800";
      case "luxo":
        return "bg-purple-100 text-purple-800";
      case "suv":
        return "bg-orange-100 text-orange-800";
      case "pickup":
        return "bg-gray-100 text-gray-800";
      case "van":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <p className="text-center py-16">Carregando...</p>;

  return (
    <div className="min-h-screen bg-background">
      {/* Filtros */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 flex flex-wrap gap-4 justify-center">
          <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
            <SelectTrigger className="w-48">
              <SelectValue />
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
              <SelectValue />
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
              {/* Imagem e status */}
              <div className="relative">
                <img
                  src={car.image || "https://via.placeholder.com/800x400"}
                  alt={car.name || "—"}
                  className="w-full h-60 object-cover"
                />
                <Badge
                  className={`absolute top-4 left-4 ${
                    car.status === "Disponível" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {car.status || "—"}
                </Badge>
              </div>

              {/* Cabeçalho */}
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

              {/* Conteúdo */}
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
      {/* Perguntas Frequentes */}
      {/* Perguntas Frequentes */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Perguntas Frequentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-background rounded-2xl shadow-elegant">
              <h3 className="font-semibold mb-2">Que documentos preciso?</h3>
              <p className="text-muted-foreground">
                Bilhete de Identidade válido e Carta de Condução. Para aluguer
                com motorista, apenas o BI é necessário.
              </p>
            </div>
            <div className="p-6 bg-background rounded-2xl shadow-elegant">
              <h3 className="font-semibold mb-2">
                Há limite de quilometragem?
              </h3>
              <p className="text-muted-foreground">
                Quilometragem ilimitada em Luanda. Para viagens para outras
                províncias, consulte condições especiais.
              </p>
            </div>
            <div className="p-6 bg-background rounded-2xl shadow-elegant">
              <h3 className="font-semibold mb-2">Como é o seguro?</h3>
              <p className="text-muted-foreground">
                Todas as viaturas têm seguro obrigatório incluído. Seguro contra
                todos os riscos disponível como extra.
              </p>
            </div>
            <div className="p-6 bg-background rounded-2xl shadow-elegant">
              <h3 className="font-semibold mb-2">
                Posso devolver noutro local?
              </h3>
              <p className="text-muted-foreground">
                Sim, oferecemos devolução em local diferente. Taxa adicional
                pode ser aplicada dependendo da distância.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Frotas;
