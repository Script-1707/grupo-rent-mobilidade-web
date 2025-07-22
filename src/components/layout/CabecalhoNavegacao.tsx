import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const itensMenu = [
  { nome: 'Início', caminho: '/' },
  { nome: 'Sobre Nós', caminho: '/sobre' },
  { nome: 'Frota de Viaturas', caminho: '/frotas' },
  { nome: 'Serviços', caminho: '/servicos' },
  { nome: 'Reservas', caminho: '/reservas' },
  { nome: 'Promoções', caminho: '/promocoes' },
  { nome: 'Clientes', caminho: '/clientes' },
  { nome: 'Contactos', caminho: '/contactos' }
];

const CabecalhoNavegacao = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const localizacao = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const alternarMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <>
      {/* Barra superior com informações de contacto */}
      <div className="bg-secondary text-secondary-foreground py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+244 924 000 000</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Luanda, Angola</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Seg-Sex: 8h-18h | Sáb: 8h-14h</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Emergência 24h: +244 900 000 000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação principal */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-card'
            : 'bg-background'
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/e0189d0b-1841-48f6-a716-d4575b450a80.png"
                alt="EV Grupo Rent Car"
                className="h-12 w-auto"
              />
            </Link>

            {/* Menu desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              {itensMenu.map((item) => (
                <Link
                  key={item.caminho}
                  to={item.caminho}
                  className={`text-foreground hover:text-primary transition-colors duration-300 font-medium relative group ${localizacao.pathname === item.caminho ? 'text-primary' : ''
                    }`}
                >
                  {item.nome}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Botão de reserva */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/reservas">
                <Button className="botao-primario">
                  Reservar Agora
                </Button>
              </Link>
            </div>

            {/* Botão menu mobile */}
            <button
              onClick={alternarMenu}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Abrir menu"
            >
              {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {menuAberto && (
          <div className="lg:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {itensMenu.map((item) => (
                  <Link
                    key={item.caminho}
                    to={item.caminho}
                    onClick={fecharMenu}
                    className={`text-foreground hover:text-primary transition-colors duration-300 font-medium py-2 ${localizacao.pathname === item.caminho ? 'text-primary' : ''
                      }`}
                  >
                    {item.nome}
                  </Link>
                ))}
                <Link to="/reservas" onClick={fecharMenu}>
                  <Button className="botao-primario w-full mt-4">
                    Reservar Agora
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default CabecalhoNavegacao;