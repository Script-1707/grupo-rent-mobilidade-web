import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Vantagens from "@/components/comum/Vantagens";
import ProcessoReserva from "@/components/comum/ProcessoReserva";

const getDestaqueColor = (destaque: string) => {
  switch (destaque) {
    case "Mais Popular":
      return "bg-primary text-white";
    case "Premium":
      return "bg-purple-600 text-white";
    case "Empresarial":
      return "bg-blue-600 text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Servicos = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/services`);
      if (!res.ok) throw new Error("Erro ao buscar serviços");

      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error("Erro ao buscar serviços:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando serviços...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos Serviços
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Soluções completas de mobilidade para todas as suas necessidades
          </p>
        </div>
      </section>

      {/* Serviços Principais */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => (
              <Card
                key={service.id}
                className="relative overflow-hidden hover-scale shadow-elegant"
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

                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-primary/10 rounded-lg"></div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Inclui:</h4>
                    <ul className="space-y-1">
                      {service.caracteristicas.map(
                        (item: string, i: number) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-center"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-lg font-semibold text-primary">
                      {service.preco} Kz
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90">
                    Solicitar Orçamento
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Vantagens />
      <ProcessoReserva />
    </div>
  );
};

export default Servicos;
