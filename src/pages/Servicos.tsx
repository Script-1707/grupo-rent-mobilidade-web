import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, UserCheck, MapPin, Clock, Building, Phone, Shield, Star } from "lucide-react";

const Servicos = () => {
  const servicos = [
    {
      id: 1,
      nome: "Aluguer com Motorista",
      icone: UserCheck,
      descricao: "Motoristas profissionais experientes e conhecedores da cidade.",
      caracteristicas: [
        "Motoristas certificados",
        "Conhecimento da cidade", 
        "Pontualidade garantida",
        "Atendimento cortês"
      ],
      preco: "Desde 2.500 Kz/hora",
      destaque: "Mais Popular"
    },
    {
      id: 2,
      nome: "Aluguer sem Motorista",
      icone: Car,
      descricao: "Liberdade total para conduzir onde e quando quiser.",
      caracteristicas: [
        "Quilometragem ilimitada",
        "Combustível incluído*",
        "Seguro básico",
        "Suporte 24h"
      ],
      preco: "Desde 12.000 Kz/dia",
      destaque: ""
    },
    {
      id: 3,
      nome: "Transfer Executivo",
      icone: Star,
      descricao: "Serviço premium para executivos e eventos especiais.",
      caracteristicas: [
        "Viaturas de luxo",
        "Motorista em fato",
        "Água e jornais",
        "WiFi a bordo"
      ],
      preco: "Desde 8.000 Kz/viagem",
      destaque: "Premium"
    },
    {
      id: 4,
      nome: "Eventos e Casamentos",
      icone: Star,
      descricao: "Transporte especial para os momentos mais importantes.",
      caracteristicas: [
        "Viaturas decoradas",
        "Motorista especializado",
        "Flexibilidade de horários",
        "Pacotes personalizados"
      ],
      preco: "Desde 25.000 Kz/evento",
      destaque: ""
    },
    {
      id: 5,
      nome: "Planos Corporativos",
      icone: Building,
      descricao: "Soluções de mobilidade para empresas e organizações.",
      caracteristicas: [
        "Contratos mensais",
        "Descontos especiais",
        "Frota dedicada",
        "Relatórios detalhados"
      ],
      preco: "Consulte condições",
      destaque: "Empresarial"
    },
    {
      id: 6,
      nome: "Entrega e Recolha",
      icone: MapPin,
      descricao: "Levamos e buscamos a viatura onde for mais conveniente.",
      caracteristicas: [
        "Entrega gratuita em Luanda",
        "Horário flexível",
        "Inspeção na entrega",
        "Documentação completa"
      ],
      preco: "Gratuito em Luanda",
      destaque: ""
    }
  ];

  const vantagens = [
    {
      icone: Shield,
      titulo: "Segurança",
      descricao: "Todas as viaturas com seguro e manutenção em dia"
    },
    {
      icone: Clock,
      titulo: "Disponibilidade 24h",
      descricao: "Suporte e atendimento disponível 24 horas por dia"
    },
    {
      icone: Star,
      titulo: "Qualidade",
      descricao: "Frota moderna e bem conservada para seu conforto"
    },
    {
      icone: Phone,
      titulo: "Suporte Dedicado",
      descricao: "Equipa especializada para atender suas necessidades"
    }
  ];

  const getDestaqueColor = (destaque: string) => {
    switch(destaque) {
      case "Mais Popular": return "bg-primary text-white";
      case "Premium": return "bg-purple-600 text-white";
      case "Empresarial": return "bg-blue-600 text-white";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
            {servicos.map((servico) => {
              const IconeComponente = servico.icone;
              return (
                <Card key={servico.id} className="relative overflow-hidden hover-scale shadow-elegant">
                  {servico.destaque && (
                    <Badge className={`absolute top-4 right-4 ${getDestaqueColor(servico.destaque)}`}>
                      {servico.destaque}
                    </Badge>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <IconeComponente className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{servico.nome}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {servico.descricao}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Características */}
                    <div>
                      <h4 className="font-semibold mb-2">Inclui:</h4>
                      <ul className="space-y-1">
                        {servico.caracteristicas.map((caracteristica, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                            {caracteristica}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Preço */}
                    <div className="pt-4 border-t">
                      <div className="text-lg font-semibold text-primary">
                        {servico.preco}
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90">
                      Solicitar Orçamento
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Por que Escolher a EV Grupo?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vantagens.map((vantagem, index) => {
              const IconeComponente = vantagem.icone;
              return (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <IconeComponente className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{vantagem.titulo}</h3>
                  <p className="text-muted-foreground">{vantagem.descricao}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Processo de Reserva */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Como Funciona</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Escolha o Serviço</h3>
                <p className="text-muted-foreground">
                  Selecione o tipo de serviço que melhor atende suas necessidades
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Faça a Reserva</h3>
                <p className="text-muted-foreground">
                  Entre em contacto conosco via WhatsApp, telefone ou formulário online
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Aproveite</h3>
                <p className="text-muted-foreground">
                  Desfrute do nosso serviço de qualidade com total tranquilidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary-dark to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Entre em contacto conosco e descubra como podemos ajudar
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Phone className="w-5 h-5 mr-2" />
              Ligar Agora
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Servicos;