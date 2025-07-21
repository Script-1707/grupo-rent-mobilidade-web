import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Fuel, Users, Settings, Shield, Star } from "lucide-react";

const Frotas = () => {
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroCombustivel, setFiltroCombustivel] = useState("todos");

  const viaturas = [
  
    {
      id: 3,
      nome: "Toyota Hilux",
      categoria: "pickup",
      imagem: "/src/assets/cars/ToyotaHilux.png",
      combustivel: "diesel",
      lugares: 5,
      cambio: "manual",
      precoDiario: "25.000",
      precoSemanal: "160.000",
      precoMensal: "650.000",
      caracteristicas: ["4x4", "Ar Condicionado", "Caçamba", "Tração Integral"]
    },
    {
      id: 4,
      nome: "Mercedes Sprinter",
      categoria: "van",
      imagem: "/src/assets/cars/MercedesSprinter.jpg",
      combustivel: "diesel",
      lugares: 16,
      cambio: "manual",
      precoDiario: "35.000",
      precoSemanal: "220.000",
      precoMensal: "900.000",
      caracteristicas: ["16 Lugares", "Ar Condicionado", "Som", "Bagageiro"]
    },
    // SUVs
    {
      id: 5,
      nome: "Hyundai Creta",
      categoria: "suv",
      imagem: "/src/assets/cars/HyundaiCreta.jpg",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "automatico",
      precoDiario: "20.000",
      precoSemanal: "130.000",
      precoMensal: "520.000",
      caracteristicas: ["SUV", "Ar Condicionado", "Airbags", "Bluetooth"]
    },
    {
      id: 6,
      nome: "Hyundai Santa Fe",
      categoria: "suv",
      imagem: "/src/assets/cars/HyundaiSantaFe.jpg",
      combustivel: "gasolina",
      lugares: 7,
      cambio: "automatico",
      precoDiario: "28.000",
      precoSemanal: "170.000",
      precoMensal: "700.000",
      caracteristicas: ["SUV", "Ar Condicionado", "Teto Solar", "Sensor de Ré"]
    },
    {
      id: 7,
      nome: "Kia Sportage",
      categoria: "suv",
      imagem: "/src/assets/cars/KiaSportage.jpg",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "automatico",
      precoDiario: "21.000",
      precoSemanal: "135.000",
      precoMensal: "540.000",
      caracteristicas: ["SUV", "Ar Condicionado", "Airbags", "Bluetooth"]
    },
    {
      id: 8,
      nome: "Range Rover 2025",
      categoria: "luxo",
      imagem: "/src/assets/cars/RangeRover2025.png",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "automatico",
      precoDiario: "60.000",
      precoSemanal: "350.000",
      precoMensal: "1.400.000",
      caracteristicas: ["Couro", "GPS", "Teto Solar", "Som Premium"]
    },
    // Vans
    {
      id: 9,
      nome: "Toyota Hiace",
      categoria: "van",
      imagem: "/src/assets/cars/ToyotaHiace.png",
      combustivel: "diesel",
      lugares: 15,
      cambio: "manual",
      precoDiario: "32.000",
      precoSemanal: "200.000",
      precoMensal: "820.000",
      caracteristicas: ["15 Lugares", "Ar Condicionado", "Bagageiro"]
    },
    {
      id: 10,
      nome: "Mercedes Viano",
      categoria: "van",
      imagem: "/src/assets/cars/MercedesViano.jpg",
      combustivel: "diesel",
      lugares: 8,
      cambio: "automatico",
      precoDiario: "38.000",
      precoSemanal: "240.000",
      precoMensal: "950.000",
      caracteristicas: ["8 Lugares", "Ar Condicionado", "Som"]
    },
    // Pickups
    {
      id: 11,
      nome: "Toyota Hilux",
      categoria: "pickup",
      imagem: "/src/assets/cars/ToyotaHilux.png",
      combustivel: "diesel",
      lugares: 5,
      cambio: "manual",
      precoDiario: "25.000",
      precoSemanal: "160.000",
      precoMensal: "650.000",
      caracteristicas: ["4x4", "Ar Condicionado", "Caçamba", "Tração Integral"]
    },
    // Econômicos
    {
      id: 12,
      nome: "Suzuki Celerio",
      categoria: "economico",
      imagem: "/src/assets/cars/SuzukiCelerio.jpg",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "manual",
      precoDiario: "12.000",
      precoSemanal: "72.000",
      precoMensal: "250.000",
      caracteristicas: ["Ar Condicionado", "Airbags", "Bluetooth"]
    },
    {
      id: 13,
      nome: "Suzuki SWIFT",
      categoria: "economico",
      imagem: "/src/assets/cars/SuzukiSWIFT.jpg",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "manual",
      precoDiario: "13.000",
      precoSemanal: "78.000",
      precoMensal: "270.000",
      caracteristicas: ["Ar Condicionado", "Airbags", "Bluetooth"]
    },
    // Intermédios
    {
      id: 14,
      nome: "Kia Rio Pride",
      categoria: "intermedio",
      imagem: "/src/assets/cars/KiaRioPride.jpg",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "manual",
      precoDiario: "16.000",
      precoSemanal: "96.000",
      precoMensal: "320.000",
      caracteristicas: ["Ar Condicionado", "Airbags", "Bluetooth"]
    },
    // Luxo
    {
      id: 15,
      nome: "Jaguar XRF",
      categoria: "luxo",
      imagem: "/src/assets/cars/JaguarXRF.jpg",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "automatico",
      precoDiario: "55.000",
      precoSemanal: "330.000",
      precoMensal: "1.300.000",
      caracteristicas: ["Couro", "GPS", "Teto Solar", "Som Premium"]
    },
    {
      id: 16,
      nome: "Lexus ES-350",
      categoria: "luxo",
      imagem: "/src/assets/cars/LexusES-350.jpg",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "automatico",
      precoDiario: "50.000",
      precoSemanal: "300.000",
      precoMensal: "1.200.000",
      caracteristicas: ["Couro", "GPS", "Teto Solar", "Som Premium"]
    },
    {
      id: 17,
      nome: "Mercedes G63 AMG",
      categoria: "luxo",
      imagem: "/src/assets/cars/MercedesG63AMG.png",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "automatico",
      precoDiario: "70.000",
      precoSemanal: "420.000",
      precoMensal: "1.700.000",
      caracteristicas: ["Couro", "GPS", "Teto Solar", "Som Premium"]
    },
  ];

  const categorias = [
    { value: "todos", label: "Todas as Categorias" },
    { value: "economico", label: "Económico" },
    { value: "intermedio", label: "Intermédio" },
    { value: "luxo", label: "Luxo" },
    { value: "suv", label: "SUV" },
    { value: "pickup", label: "Pick-Up" },
    { value: "van", label: "Van & Grupo" }
  ];

  const combustiveis = [
    { value: "todos", label: "Todos os Combustíveis" },
    { value: "gasolina", label: "Gasolina" },
    { value: "diesel", label: "Diesel" },
    { value: "hibrido", label: "Híbrido" }
  ];

  const viaturasFiltradas = viaturas.filter(viatura => {
    const categoriaMatch = filtroCategoria === "todos" || viatura.categoria === filtroCategoria;
    const combustivelMatch = filtroCombustivel === "todos" || viatura.combustivel === filtroCombustivel;
    return categoriaMatch && combustivelMatch;
  });

  const getCategoriaLabel = (categoria: string) => {
    switch (categoria) {
      case "economico": return "Económico";
      case "intermedio": return "Intermédio";
      case "luxo": return "Luxo";
      case "suv": return "SUV";
      case "pickup": return "Pick-Up";
      case "van": return "Van & Grupo";
      default: return categoria;
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case "economico": return "bg-green-100 text-green-800";
      case "intermedio": return "bg-blue-100 text-blue-800";
      case "luxo": return "bg-purple-100 text-purple-800";
      case "suv": return "bg-orange-100 text-orange-800";
      case "pickup": return "bg-gray-100 text-gray-800";
      case "van": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossa Frota
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Viaturas modernas, seguras e bem conservadas para todas as suas necessidades
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
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

            <Select value={filtroCombustivel} onValueChange={setFiltroCombustivel}>
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
        </div>
      </section>

      {/* Lista de Viaturas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {viaturasFiltradas.map((viatura) => (
              <Card key={viatura.id} className="overflow-hidden hover-scale shadow-elegant">
                <div className="relative">
                  <img
                    src={viatura.imagem}
                    alt={viatura.nome}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className={`absolute top-4 left-4 ${getCategoriaColor(viatura.categoria)}`}>
                    {getCategoriaLabel(viatura.categoria)}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{viatura.nome}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {viatura.lugares} lugares
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="w-4 h-4" />
                      {viatura.combustivel}
                    </div>
                    <div className="flex items-center gap-1">
                      <Settings className="w-4 h-4" />
                      {viatura.cambio}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Características */}
                  <div>
                    <h4 className="font-semibold mb-2">Características:</h4>
                    <div className="flex flex-wrap gap-1">
                      {viatura.caracteristicas.map((caracteristica, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {caracteristica}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Preços */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Preços:</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Diário:</span>
                        <span className="font-medium">{viatura.precoDiario} Kz</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Semanal:</span>
                        <span className="font-medium">{viatura.precoSemanal} Kz</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mensal:</span>
                        <span className="font-medium">{viatura.precoMensal} Kz</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90">
                    <Car className="w-4 h-4 mr-2" />
                    Reservar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Que documentos preciso?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Bilhete de Identidade válido e Carta de Condução. Para aluguer com motorista, apenas o BI é necessário.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Há limite de quilometragem?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Quilometragem ilimitada em Luanda. Para viagens para outras províncias, consulte condições especiais.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Como é o seguro?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Todas as viaturas têm seguro obrigatório incluído. Seguro contra todos os riscos disponível como extra.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Posso devolver noutro local?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sim, oferecemos devolução em local diferente. Taxa adicional pode ser aplicada dependendo da distância.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Frotas;