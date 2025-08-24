// src/pages/Servicos.tsx
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
import { useEffect, useState } from "react";

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


// Mocked static services (no API dependency)
type Service = {
  id: number;
  name: string;
  description: string;
  destaque?: string | null;
  caracteristicas: string[];
};
// Services will be loaded from public/static-db/services.json

const Servicos = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('/static-db/services.json')
      .then((res) => {
        if (!res.ok) throw new Error('Não foi possível carregar os serviços estáticos');
        return res.json();
      })
      .then((data: Service[]) => {
        if (mounted) setServices(data);
      })
      .catch((err) => {
        if (mounted) setLoadError(err.message || 'Erro ao carregar serviços');
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-down">
            Nossos Serviços
          </h1>
          <p className="text-xl text-white/90 mb-6" data-aos="fade-up" data-aos-delay={60}>
            Soluções completas de mobilidade para todas as suas necessidades
          </p>
        </div>
      </section>

      {/* Serviços Principais */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full text-center">Carregando serviços...</div>
            ) : loadError ? (
              <div className="col-span-full text-center text-red-500">{loadError}</div>
            ) : (
              services.map((service: Service, idx: number) => (
              <Card
                key={service.id}
                className="relative overflow-hidden hover-scale shadow-elegant"
                data-aos="fade-up"
                data-aos-delay={30 * idx}
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

                <CardHeader data-aos="fade-right" data-aos-delay={30 * idx}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-primary/10 rounded-lg"></div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4" data-aos="fade-left" data-aos-delay={40 + 30 * idx}>
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
                </CardContent>
              </Card>
            ))) }
          </div>
        </div>
      </section>

      <div data-aos="fade-up" data-aos-delay={80}>
        <Vantagens />
      </div>

      <div data-aos="fade-up" data-aos-delay={120}>
        <ProcessoReserva />
      </div>
    </div>
  );
};

export default Servicos;
