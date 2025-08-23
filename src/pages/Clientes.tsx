import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Users, Building, Award, Heart } from "lucide-react";

const Clientes = () => {
  const parceiros = [
    {
      nome: "Sonangol",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Sonangol_Logo.svg/1200px-Sonangol_Logo.svg.png",
      categoria: "Energia",
    },
    {
      nome: "Banco BAI",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/BAI_-_.jpg",
      categoria: "Financeiro",
    },
    {
      nome: "Unitel",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStk0sDld9leUURYWbYgwoZhRZGr0dj8iTjcg&s",
      categoria: "Telecomunicações",
    },
    {
      nome: "Hotel Presidente",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGTGMp1mZCdY41rEVHZGHBKLlzf-Zt6PPXLQ&s",
      categoria: "Hotelaria",
    },
    {
      nome: "Embaixada do Brasil",
      logo: "https://media.licdn.com/dms/image/v2/C4E0BAQHegVVFip8MOg/company-logo_200_200/company-logo_200_200/0/1630611203754?e=2147483647&v=beta&t=27WwnSzsRS2QPJCBJqEu8FSG6dZdate5AiAqFoWrMqI",
      categoria: "Diplomático",
    },
    {
      nome: "Total Energies",
      logo: "https://media.licdn.com/dms/image/sync/v2/D4D27AQHWDnHxSpwsig/articleshare-shrink_800/articleshare-shrink_800/0/1752125202989?e=2147483647&v=beta&t=FtikeNqkkkB9SbdWbwDM54wvjZMxE3cswpdE9ZGkgG4",
      categoria: "Energia",
    },
  ];

  const depoimentos = [
    {
      nome: "João Manuel Silva",
      cargo: "Director Executivo",
      empresa: "Construtora Atlântida",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      comentario:
        "A EV Grupo é nossa parceira há mais de 3 anos. Serviço impecável, carros sempre bem conservados e equipa muito profissional. Recomendo sem dúvidas.",
      avaliacao: 5,
    },
    {
      nome: "Dra. Ana Carvalho",
      cargo: "Coordenadora de Eventos",
      empresa: "MKT Solutions",
      foto: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face",
      comentario:
        "Utilizamos os serviços da EV Grupo para todos os nossos eventos corporativos. A pontualidade e qualidade do atendimento são excepcionais.",
      avaliacao: 5,
    },
    {
      nome: "Carlos Mendes",
      cargo: "Gerente de Operações",
      empresa: "Petro Logistics",
      foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      comentario:
        "Excelente custo-benefício e flexibilidade nos contratos. A frota é diversificada e atende perfeitamente às nossas necessidades logísticas.",
      avaliacao: 5,
    },
    {
      nome: "Eng. Paulo Ferreira",
      cargo: "Project Manager",
      empresa: "Angola Construction",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      comentario:
        "Profissionalismo de alto nível. Sempre conseguem atender nossos pedidos urgentes com máxima eficiência. Parceria que vale a pena.",
      avaliacao: 5,
    },
    {
      nome: "Dra. Mariana Costa",
      cargo: "Directora de RH",
      empresa: "Tech Solutions Angola",
      foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      comentario:
        "O atendimento personalizado e a qualidade dos veículos fazem toda a diferença. Nossa empresa confia 100% nos serviços da EV Grupo.",
      avaliacao: 5,
    },
    {
      nome: "Dr. Miguel Santos",
      cargo: "CEO",
      empresa: "Consultoria Estratégica",
      foto: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
      comentario:
        "Serviço premium com preços justos. A EV Grupo entende as necessidades do mercado executivo angolano. Altamente recomendado.",
      avaliacao: 5,
    },
  ];

  const estatisticas = [
    {
      numero: "500+",
      descricao: "Clientes Satisfeitos",
      icone: Users,
    },
    {
      numero: "50+",
      descricao: "Empresas Parceiras",
      icone: Building,
    },
    {
      numero: "1000+",
      descricao: "Eventos Realizados",
      icone: Award,
    },
    {
      numero: "98%",
      descricao: "Taxa de Satisfação",
      icone: Heart,
    },
  ];

  const renderStars = (avaliacao: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < avaliacao ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Clientes & Parceiros
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Conheça quem confia na EV Grupo para suas necessidades de mobilidade
          </p>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {estatisticas.map((stat, index) => {
              const IconeComponente = stat.icone;
              return (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <IconeComponente className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.numero}
                  </div>
                  <p className="text-muted-foreground">{stat.descricao}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Parceiros */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Nossos Parceiros
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {parceiros.map((parceiro, index) => (
              <div key={index} className="group">
                <Card className="h-32 flex items-center justify-center hover-scale bg-white">
                  <img
                    src={parceiro.logo}
                    alt={parceiro.nome}
                    className="max-w-full max-h-20 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </Card>
                <div className="text-center mt-2">
                  <p className="font-medium text-sm">{parceiro.nome}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {parceiro.categoria}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            O que Dizem Nossos Clientes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <Card key={index} className="hover-scale shadow-elegant">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={depoimento.foto}
                      alt={depoimento.nome}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">
                        {depoimento.nome}
                      </CardTitle>
                      <CardDescription>
                        {depoimento.cargo}
                        <br />
                        <span className="text-primary font-medium">
                          {depoimento.empresa}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(depoimento.avaliacao)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                    <p className="text-muted-foreground italic pl-6">
                      "{depoimento.comentario}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary-dark to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Quer Fazer Parte desta Lista?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Junte-se aos nossos clientes satisfeitos e descubra por que somos a
            escolha certa
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              Solicitar Proposta
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Agendar Reunião
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clientes;
