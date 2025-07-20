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
      id: 1,
      nome: "Toyota Corolla",
      categoria: "economico",
      imagem: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "automatico",
      precoDiario: "15.000",
      precoSemanal: "90.000",
      precoMensal: "300.000",
      caracteristicas: ["Ar Condicionado", "Direção Assistida", "Airbags", "Bluetooth"]
    },
    {
      id: 2,
      nome: "BMW X5",
      categoria: "luxo",
      imagem: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
      combustivel: "gasolina",
      lugares: 7,
      cambio: "automatico",
      precoDiario: "45.000",
      precoSemanal: "280.000",
      precoMensal: "1.100.000",
      caracteristicas: ["Couro", "GPS", "Câmera de Ré", "Teto Solar", "Som Premium"]
    },
    {
      id: 3,
      nome: "Toyota Hilux",
      categoria: "pickup",
      imagem: "https://images.unsplash.com/photo-1594837226024-6592ad87a5af?w=400",
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
      imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      combustivel: "diesel",
      lugares: 16,
      cambio: "manual",
      precoDiario: "35.000",
      precoSemanal: "220.000",
      precoMensal: "900.000",
      caracteristicas: ["16 Lugares", "Ar Condicionado", "Som", "Bagageiro"]
    },
    {
      id: 5,
      nome: "Hyundai Tucson",
      categoria: "suv",
      imagem: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "automatico",
      precoDiario: "22.000",
      precoSemanal: "140.000",
      precoMensal: "580.000",
      caracteristicas: ["SUV", "Ar Condicionado", "Airbags", "Sensor de Ré"]
    },
    {
      id: 6,
      nome: "Honda Civic",
      categoria: "intermedio",
      imagem: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400",
      combustivel: "gasolina",
      lugares: 5,
      cambio: "automatico",
      precoDiario: "18.000",
      precoSemanal: "115.000",
      precoMensal: "480.000",
      caracteristicas: ["Ar Condicionado", "GPS", "Câmera de Ré", "Bluetooth"]
    }
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
    switch(categoria) {
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
    switch(categoria) {
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