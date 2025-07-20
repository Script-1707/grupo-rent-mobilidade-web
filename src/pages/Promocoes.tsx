import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Gift, Tag, Calendar, Users, Percent, Star, Car, Clock } from "lucide-react";

const Promocoes = () => {
  const [codigoCupao, setCodigoCupao] = useState("");

  const promocoesAtivas = [
    {
      id: 1,
      nome: "Black Car Friday",
      descricao: "Descontos incríveis em toda a frota durante o mês de novembro",
      desconto: "30%",
      validade: "30/11/2024",
      codigo: "BLACKCAR30",
      categoria: "Todas as categorias",
      imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      condicoes: [
        "Válido para reservas de 3+ dias",
        "Não cumulativo com outras promoções",
        "Sujeito a disponibilidade"
      ]
    },
    {
      id: 2,
      nome: "Promo Jovem",
      descricao: "Desconto especial para condutores entre 21-30 anos",
      desconto: "20%",
      validade: "31/12/2024",
      codigo: "JOVEM20",
      categoria: "Económico e Intermédio",
      imagem: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400",
      condicoes: [
        "Idade entre 21-30 anos",
        "Carta de condução há pelo menos 2 anos",
        "Válido de segunda a quinta-feira"
      ]
    },
    {
      id: 3,
      nome: "Aluga e Ganha",
      descricao: "Por cada 10 dias de aluguer, ganhe 1 dia grátis",
      desconto: "1 dia grátis",
      validade: "Permanente",
      codigo: "FIDELIDADE",
      categoria: "Programa de fidelidade",
      imagem: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
      condicoes: [
        "Acumulativo durante o ano",
        "Dia grátis válido por 6 meses",
        "Aplicável a qualquer categoria"
      ]
    }
  ];

  const cupoes = [
    {
      codigo: "PRIMEIRA15",
      desconto: "15%",
      descricao: "Desconto para primeira reserva",
      validade: "31/12/2024"
    },
    {
      codigo: "WEEKEND25",
      desconto: "25%",
      descricao: "Desconto para fins de semana",
      validade: "Todos os fins de semana"
    },
    {
      codigo: "MENSAL40",
      desconto: "40%",
      descricao: "Desconto para alugueres mensais",
      validade: "31/12/2024"
    },
    {
      codigo: "EMPRESA50",
      desconto: "50%",
      descricao: "Desconto para empresas (min. 5 viaturas)",
      validade: "Consultar condições"
    }
  ];

  const vantagens = [
    {
      icone: Gift,
      titulo: "Ofertas Exclusivas",
      descricao: "Promoções especiais disponíveis apenas para nossos clientes"
    },
    {
      icone: Tag,
      titulo: "Cupões de Desconto",
      descricao: "Códigos promocionais para economia extra nas suas reservas"
    },
    {
      icone: Star,
      titulo: "Programa Fidelidade",
      descricao: "Acumule pontos e ganhe dias grátis de aluguer"
    },
    {
      icone: Calendar,
      titulo: "Promoções Sazonais",
      descricao: "Descontos especiais em datas comemorativas e épocas festivas"
    }
  ];

  const handleValidarCupao = (e: React.FormEvent) => {
    e.preventDefault();
    const cupaoEncontrado = cupoes.find(cupao => cupao.codigo === codigoCupao.toUpperCase());
    
    if (cupaoEncontrado) {
      alert(`Cupão válido! Desconto de ${cupaoEncontrado.desconto} - ${cupaoEncontrado.descricao}`);
    } else {
      alert("Cupão inválido ou expirado. Verifique o código e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Promoções & Descontos
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Aproveite nossas ofertas especiais e economize nas suas reservas
          </p>
        </div>
      </section>

      {/* Validador de Cupão */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Tag className="w-5 h-5" />
                  Validar Cupão
                </CardTitle>
                <CardDescription>
                  Insira seu código promocional para verificar o desconto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleValidarCupao} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Digite seu código"
                    value={codigoCupao}
                    onChange={(e) => setCodigoCupao(e.target.value)}
                    className="uppercase"
                  />
                  <Button type="submit">Validar</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Promoções Ativas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Promoções Ativas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promocoesAtivas.map((promocao) => (
              <Card key={promocao.id} className="overflow-hidden hover-scale shadow-elegant">
                <div className="relative">
                  <img 
                    src={promocao.imagem} 
                    alt={promocao.nome}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    {promocao.desconto} OFF
                  </Badge>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{promocao.nome}</CardTitle>
                  <CardDescription className="text-base">
                    {promocao.descricao}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Válido até:</span>
                      <div className="text-muted-foreground">{promocao.validade}</div>
                    </div>
                    <div>
                      <span className="font-semibold">Categoria:</span>
                      <div className="text-muted-foreground">{promocao.categoria}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-semibold">Condições:</span>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {promocao.condicoes.map((condicao, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0" />
                          {condicao}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Alert>
                    <Tag className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Código: {promocao.codigo}</strong>
                    </AlertDescription>
                  </Alert>

                  <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90">
                    <Car className="w-4 h-4 mr-2" />
                    Usar Promoção
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cupões Disponíveis */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Cupões de Desconto</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cupoes.map((cupao, index) => (
              <Card key={index} className="text-center hover-scale">
                <CardHeader>
                  <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                    <Percent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{cupao.desconto}</CardTitle>
                  <CardDescription>{cupao.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-2 bg-muted rounded font-mono text-sm">
                      {cupao.codigo}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Válido até: {cupao.validade}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigator.clipboard.writeText(cupao.codigo)}
                    >
                      Copiar Código
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Vantagens Exclusivas</h2>
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

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary-dark to-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Não Perca Nenhuma Promoção
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscreva nossa newsletter e seja o primeiro a saber das nossas ofertas
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <Input 
              type="email" 
              placeholder="Seu email" 
              className="bg-white"
            />
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Subscrever
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promocoes;