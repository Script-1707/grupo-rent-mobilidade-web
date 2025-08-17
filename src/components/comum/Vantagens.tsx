import { Shield, Clock, Star, Phone } from "lucide-react";

const vantagens = [
  {
    icone: Shield,
    titulo: "Segurança",
    descricao: "Todas as viaturas com seguro e manutenção em dia",
  },
  {
    icone: Clock,
    titulo: "Disponibilidade 24h",
    descricao: "Suporte e atendimento disponível 24 horas por dia",
  },
  {
    icone: Star,
    titulo: "Qualidade",
    descricao: "Frota moderna e bem conservada para seu conforto",
  },
  {
    icone: Phone,
    titulo: "Suporte Dedicado",
    descricao: "Equipa especializada para atender suas necessidades",
  },
];

const Vantagens = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Por que Escolher a EV Grupo?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vantagens.map((vantagem, i) => {
            const IconeComponente = vantagem.icone;
            return (
              <div key={i} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <IconeComponente className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {vantagem.titulo}
                </h3>
                <p className="text-muted-foreground">{vantagem.descricao}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Vantagens;
