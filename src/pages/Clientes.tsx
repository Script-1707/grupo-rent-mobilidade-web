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
      id: 1,
      nome: "João Manuel",
      cargo: "Empresário",
      texto:
        "A EV GRUPO sempre nos atendeu com pontualidade e viaturas em ótimo estado. Confiança total.",
      avaliacao: 5,
      foto: null,
    },
    {
      id: 2,
      nome: "Dra. Ana C.",
      comentario: "Consultora",
      texto:
        " O serviço executivo com motorista é excelente, recomendo.",
      avaliacao: 5,
      foto: null,
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
        className={`w-4 h-4 ${i < avaliacao ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
      />
    ));
  };

  const newLocal = <div className="flex flex-wrap gap-4 justify-center">
    <Button
      size="lg"
      variant="secondary"
      className="bg-white text-primary hover:bg-white/90"
      onClick={() => window.location.href = "/contactos"}
    >
      Solicitar Proposta
    </Button>
    <Button
      size="lg"
      variant="outline"
      className="bg-primary border-white text-white hover:bg-white hover:text-primary"
      onClick={() => window.location.href = "/contactos"}
    >
      Agendar Reunião
    </Button>
  </div>;
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-down">
            Clientes & Parceiros
          </h1>
          <p className="text-xl text-white/90 mb-6" data-aos="fade-up" data-aos-delay={60}>
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
        <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={20 * index}>
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
          <h2 className="text-3xl font-bold mb-6 text-center" data-aos="fade-up">Nossos Parceiros</h2>

          {/* Horizontal looping carousel */}
          <div className="overflow-hidden">
            <div className="flex items-center gap-8 animate-marquee" style={{ willChange: 'transform' }}>
              {Array(2).fill(parceiros).flat().map((parceiro, idx) => (
                <div key={idx} className="w-48 flex-shrink-0" data-aos="zoom-in" data-aos-delay={(idx % parceiros.length) * 30}>
                  <div className="card-elegante h-28 flex items-center justify-center bg-white">
                    <img
                      src={parceiro.logo}
                      alt={parceiro.nome}
                      className="max-w-full max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <p className="font-medium text-sm">{parceiro.nome}</p>
                    <Badge variant="secondary" className="text-xs mt-1">{parceiro.categoria}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: flex;
              gap: 2rem;
              animation: marquee 20s linear infinite;
            }
          `}</style>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="titulo-secao">O que Dizem Nossos Clientes</h2>
            <p className="subtitulo max-w-3xl mx-auto">
              A satisfação dos nossos clientes é a nossa maior recompensa. Veja
              o que eles têm a dizer sobre nossos serviços.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {depoimentos.map((depoimento, idx) => (
              <div key={depoimento.id} className="card-elegante" data-aos="fade-up" data-aos-delay={30 * idx}>
                <div className="flex items-center mb-4">
                  {[...Array(depoimento.avaliacao)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{depoimento.texto}"
                </blockquote>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-semibold text-lg">
                      {depoimento.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-secondary">
                      {depoimento.nome}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {depoimento.cargo}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary-dark to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" data-aos="fade-down">Quer Fazer Parte desta Lista?</h2>
          <p className="text-xl text-white/90 mb-8" data-aos="fade-up" data-aos-delay={60}>
            Junte-se aos nossos clientes satisfeitos e descubra por que somos a
            escolha certa
          </p>
          {newLocal}
        </div>
      </section>
    </div>
  );
};

export default Clientes;
