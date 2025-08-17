const passos = [
  {
    numero: 1,
    titulo: "Escolha o Serviço",
    descricao:
      "Selecione o tipo de serviço que melhor atende suas necessidades",
  },
  {
    numero: 2,
    titulo: "Faça a Reserva",
    descricao:
      "Entre em contacto conosco via WhatsApp, telefone ou formulário online",
  },
  {
    numero: 3,
    titulo: "Aproveite",
    descricao: "Desfrute do nosso serviço de qualidade com total tranquilidade",
  },
];

const ProcessoReserva = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Como Funciona</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {passos.map((passo) => (
            <div key={passo.numero} className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {passo.numero}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{passo.titulo}</h3>
              <p className="text-muted-foreground">{passo.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessoReserva;
