import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  Send,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const informacoesContacto = [
  {
    icone: MapPin,
    titulo: 'Localização',
    conteudo: [
      'Rua da Missão, 123',
      'Maianga, Luanda',
      'Angola'
    ],
    acao: 'Ver no Mapa',
    link: '#'
  },
  {
    icone: Phone,
    titulo: 'Telefones',
    conteudo: [
      '+244 924 000 000 (Principal)',
      '+244 900 000 000 (Emergência 24h)',
      '+244 923 111 222 (Reservas)'
    ],
    acao: 'Ligar Agora',
    link: 'tel:+244924000000'
  },
  {
    icone: Mail,
    titulo: 'E-mails',
    conteudo: [
      'info@evgruporentcar.ao',
      'reservas@evgruporentcar.ao',
      'comercial@evgruporentcar.ao'
    ],
    acao: 'Enviar E-mail',
    link: 'mailto:info@evgruporentcar.ao'
  },
  {
    icone: Clock,
    titulo: 'Horário de Atendimento',
    conteudo: [
      'Segunda - Sexta: 8h - 18h',
      'Sábado: 8h - 14h',
      'Domingo: Fechado',
      'Emergência: 24h (todos os dias)'
    ],
    acao: null,
    link: null
  }
];

const Contactos = () => {
  const [formulario, setFormulario] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });
  const [enviando, setEnviando] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    // Simular envio do formulário
    setTimeout(() => {
      setEnviando(false);
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contacto consigo brevemente.",
      });
      setFormulario({
        nome: '',
        email: '',
        telefone: '',
        assunto: '',
        mensagem: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 gradiente-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contacte-nos
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Estamos aqui para ajudá-lo. Entre em contacto connosco através de qualquer 
              um dos nossos canais de atendimento.
            </p>
          </div>
        </div>
      </section>

      {/* Informações de Contacto */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {informacoesContacto.map((info, indice) => (
              <div key={indice} className="card-elegante text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <info.icone className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-secondary mb-4">
                  {info.titulo}
                </h3>
                
                <div className="space-y-2 mb-6">
                  {info.conteudo.map((item, i) => (
                    <p key={i} className="text-muted-foreground text-sm">
                      {item}
                    </p>
                  ))}
                </div>
                
                {info.acao && (
                  <a 
                    href={info.link || '#'} 
                    className="inline-flex items-center text-primary hover:text-primary-hover font-semibold transition-colors"
                  >
                    {info.acao}
                    <Send className="ml-2 w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário e Mapa */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Formulário de Contacto */}
            <div>
              <h2 className="titulo-secao">Envie-nos uma Mensagem</h2>
              <p className="subtitulo mb-8">
                Preencha o formulário abaixo e entraremos em contacto consigo o mais breve possível.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-secondary mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      value={formulario.nome}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-secondary mb-2">
                      Telefone *
                    </label>
                    <Input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      required
                      value={formulario.telefone}
                      onChange={handleInputChange}
                      className="w-full"
                      placeholder="+244 900 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                    E-mail *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formulario.email}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium text-secondary mb-2">
                    Assunto *
                  </label>
                  <Input
                    id="assunto"
                    name="assunto"
                    type="text"
                    required
                    value={formulario.assunto}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Assunto da sua mensagem"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-secondary mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    value={formulario.mensagem}
                    onChange={handleInputChange}
                    className="w-full h-32"
                    placeholder="Escreva aqui a sua mensagem..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="botao-primario w-full" 
                  disabled={enviando}
                >
                  {enviando ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground">
                  * Campos obrigatórios. Responderemos em até 24 horas.
                </p>
              </form>
            </div>

            {/* Mapa e Contactos Rápidos */}
            <div className="space-y-8">
              
              {/* Mapa */}
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4">
                  Nossa Localização
                </h3>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-secondary mb-2">
                      Showroom Principal
                    </h4>
                    <p className="text-muted-foreground">
                      Rua da Missão, 123<br />
                      Maianga, Luanda, Angola
                    </p>
                    <Button className="botao-outline mt-4">
                      Abrir no Google Maps
                    </Button>
                  </div>
                </div>
              </div>

              {/* Contactos Rápidos */}
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-6">
                  Contactos Rápidos
                </h3>
                
                <div className="space-y-4">
                  {/* WhatsApp */}
                  <a 
                    href="https://wa.me/244924000000"
                    className="card-elegante flex items-center space-x-4 hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary">WhatsApp</h4>
                      <p className="text-muted-foreground text-sm">
                        Fale connosco instantaneamente
                      </p>
                    </div>
                    <div className="text-green-600 font-semibold">
                      +244 924 000 000
                    </div>
                  </a>

                  {/* Emergência */}
                  <a 
                    href="tel:+244900000000"
                    className="card-elegante flex items-center space-x-4 hover:bg-red-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
                      <Phone className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary">Emergência 24h</h4>
                      <p className="text-muted-foreground text-sm">
                        Suporte técnico e assistência
                      </p>
                    </div>
                    <div className="text-red-600 font-semibold">
                      +244 900 000 000
                    </div>
                  </a>

                  {/* E-mail */}
                  <a 
                    href="mailto:info@evgruporentcar.ao"
                    className="card-elegante flex items-center space-x-4 hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary">E-mail Geral</h4>
                      <p className="text-muted-foreground text-sm">
                        Informações e esclarecimentos
                      </p>
                    </div>
                    <div className="text-blue-600 font-semibold text-sm">
                      info@evgruporentcar.ao
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Rápido */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="titulo-secao">Perguntas Frequentes</h2>
            <p className="subtitulo max-w-3xl mx-auto">
              Respostas rápidas às dúvidas mais comuns dos nossos clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-elegante">
              <h3 className="font-bold text-secondary mb-3">
                Qual é o horário de atendimento?
              </h3>
              <p className="text-muted-foreground">
                Segunda a Sexta: 8h-18h, Sábado: 8h-14h. Para emergências, 
                temos suporte 24h todos os dias.
              </p>
            </div>

            <div className="card-elegante">
              <h3 className="font-bold text-secondary mb-3">
                Fazem entrega e recolha?
              </h3>
              <p className="text-muted-foreground">
                Sim! Oferecemos entrega e recolha gratuita em Luanda. 
                Para outras províncias, consulte condições.
              </p>
            </div>

            <div className="card-elegante">
              <h3 className="font-bold text-secondary mb-3">
                Que documentos preciso?
              </h3>
              <p className="text-muted-foreground">
                Bilhete de Identidade, Carta de Condução válida e cartão 
                de crédito para caução.
              </p>
            </div>

            <div className="card-elegante">
              <h3 className="font-bold text-secondary mb-3">
                Como fazer uma reserva?
              </h3>
              <p className="text-muted-foreground">
                Pode reservar online, por telefone ou WhatsApp. 
                É rápido e simples!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactos;