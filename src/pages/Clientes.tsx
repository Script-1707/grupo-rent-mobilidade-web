import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Users, Building, Award, Heart } from "lucide-react";

const Clientes = () => {
  const parceiros = [
    {
      nome: "Sonangol",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
      categoria: "Energia"
    },
    {
      nome: "Banco BAI",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
      categoria: "Financeiro"
    },
    {
      nome: "Unitel",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
      categoria: "Telecomunicações"
    },
    {
      nome: "Hotel Presidente",
      logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=100&fit=crop",
      categoria: "Hotelaria"
    },
    {
      nome: "Embaixada do Brasil",
      logo: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=200&h=100&fit=crop",
      categoria: "Diplomático"
    },
    {
      nome: "Total Energies",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop",
      categoria: "Energia"
    }
  ];

  const depoimentos = [
    {
      nome: "João Manuel Silva",
      cargo: "Director Executivo",
      empresa: "Construtora Atlântida",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      comentario: "A EV Grupo é nossa parceira há mais de 3 anos. Serviço impecável, carros sempre bem conservados e equipa muito profissional. Recomendo sem dúvidas.",
      avaliacao: 5
    },
    {
      nome: "Dra. Ana Carvalho",
      cargo: "Coordenadora de Eventos",
      empresa: "MKT Solutions",
      foto: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face",
      comentario: "Utilizamos os serviços da EV Grupo para todos os nossos eventos corporativos. A pontualidade e qualidade do atendimento são excepcionais.",
      avaliacao: 5
    },
    {
      nome: "Carlos Mendes",
      cargo: "Gerente de Operações",
      empresa: "Petro Logistics",
      foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      comentario: "Excelente custo-benefício e flexibilidade nos contratos. A frota é diversificada e atende perfeitamente às nossas necessidades logísticas.",
      avaliacao: 5
    },
    {
      nome: "Eng. Paulo Ferreira",
      cargo: "Project Manager",
      empresa: "Angola Construction",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      comentario: "Profissionalismo de alto nível. Sempre conseguem atender nossos pedidos urgentes com máxima eficiência. Parceria que vale a pena.",
      avaliacao: 5
    },
    {
      nome: "Dra. Mariana Costa",
      cargo: "Directora de RH",
      empresa: "Tech Solutions Angola",
      foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      comentario: "O atendimento personalizado e a qualidade dos veículos fazem toda a diferença. Nossa empresa confia 100% nos serviços da EV Grupo.",
      avaliacao: 5
    },
    {
      nome: "Dr. Miguel Santos",
      cargo: "CEO",
      empresa: "Consultoria Estratégica",
      foto: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
      comentario: "Serviço premium com preços justos. A EV Grupo entende as necessidades do mercado executivo angolano. Altamente recomendado.",
      avaliacao: 5
    }
  ];

  const casesDeSuccesso = [
    {
      titulo: "Festival de Cinema de Luanda",
      descricao: "Fornecimento de 25 viaturas para transporte de celebridades e convidados VIP durante 5 dias",
      resultados: [
        "100% de pontualidade",
        "Zero incidentes",
        "Satisfação total dos organizadores",
        "Renovação do contrato para 2024"
      ],
      ano: "2023"
    },
    {
      titulo: "Conferência Internacional de Negócios",
      descricao: "Apoio logístico com frota executiva para 200+ participantes internacionais",
      resultados: [
        "Suporte 24h durante 3 dias",
        "Motoristas bilíngues",
        "Coordenação em tempo real",
        "Avaliação 5 estrelas dos participantes"
      ],
      ano: "2023"
    },
    {
      titulo: "Expansão Corporativa",
      descricao: "Contrato anual com multinacional para suporte de mobilidade em 3 províncias",
      resultados: [
        "Redução de 40% nos custos de transporte",
        "Frota dedicada de 15 veículos",
        "Relatórios mensais de performance",
        "Renovação antecipada do contrato"
      ],
      ano: "2023-2024"
    }
  ];

  const estatisticas = [
    {
      numero: "500+",
      descricao: "Clientes Satisfeitos",
      icone: Users
    },
    {
      numero: "50+",
      descricao: "Empresas Parceiras",
      icone: Building
    },
    {
      numero: "1000+",
      descricao: "Eventos Realizados",
      icone: Award
    },
    {
      numero: "98%",
      descricao: "Taxa de Satisfação",
      icone: Heart
    }
  ];

  const renderStars = (avaliacao: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < avaliacao ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
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
                  <div className="text-3xl font-bold text-primary mb-2">{stat.numero}</div>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Nossos Parceiros</h2>
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
          <h2 className="text-3xl font-bold mb-12 text-center">O que Dizem Nossos Clientes</h2>
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
                      <CardTitle className="text-lg">{depoimento.nome}</CardTitle>
                      <CardDescription>
                        {depoimento.cargo}<br/>
                        <span className="text-primary font-medium">{depoimento.empresa}</span>
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

      {/* Cases de Sucesso */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Cases de Sucesso</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {casesDeSuccesso.map((caso, index) => (
              <Card key={index} className="hover-scale">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{caso.ano}</Badge>
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{caso.titulo}</CardTitle>
                  <CardDescription className="text-base">
                    {caso.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-3">Resultados Alcançados:</h4>
                    <ul className="space-y-2">
                      {caso.resultados.map((resultado, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-1.5 flex-shrink-0" />
                          {resultado}
                        </li>
                      ))}
                    </ul>
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
            Junte-se aos nossos clientes satisfeitos e descubra por que somos a escolha certa
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Solicitar Proposta
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Agendar Reunião
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clientes;