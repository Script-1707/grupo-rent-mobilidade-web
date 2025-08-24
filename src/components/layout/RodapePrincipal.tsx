import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Car,
  Shield,
  Users,
  Star,
  LinkedinIcon
} from 'lucide-react';

const RodapePrincipal = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Seção principal do rodapé */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Informações da empresa */}
          <div className="space-y-6">
            <div>
              <img
                src="/lovable-uploads/e0189d0b-1841-48f6-a716-d4575b450a80.png"
                alt="EV Grupo Rent Car"
                className="h-16 w-auto mb-4 filter brightness-0 invert"
              />
              <p className="text-secondary-foreground/80 leading-relaxed">
                A EV Grupo Rent Car é líder em aluguer de viaturas em Angola,
                oferecendo soluções de mobilidade seguras e confortáveis há mais de 10 anos.
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/evgrupo?mibextid=wwXIfr&rdid=QSOwKJWUxbDdsQTp&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1AsoYpCN5S%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.instagram.com/evgrouprentcar"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/evgrouprentcar/?viewAsMember=true"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors"
                aria-label="Linkedin"
              >
                <LinkedinIcon className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { nome: 'Sobre Nós', caminho: '/sobre' },
                { nome: 'Nossa Frota', caminho: '/frota' },
                { nome: 'Serviços', caminho: '/servicos' },
                { nome: 'Reservas', caminho: '/reservas' },
                { nome: 'Contactos', caminho: '/contactos' }
              ].map((link) => (
                <li key={link.caminho}>
                  <Link
                    to={link.caminho}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    {link.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Nossos Serviços</h3>
            <ul className="space-y-3">
              {[
                { nome: 'Aluguer com Motorista', icone: Users },
                { nome: 'Aluguer sem Motorista', icone: Car },
                { nome: 'Transfer Executivo', icone: Star },
                { nome: 'Suporte 24h', icone: Shield }
              ].map((servico) => (
                <li key={servico.nome} className="flex items-center space-x-3">
                  <servico.icone className="w-5 h-5 text-primary" />
                  <span className="text-secondary-foreground/80">{servico.nome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Informações de contacto */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Contactos</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-secondary-foreground/80">
                    Luanda, Corimba - Frente a ENAPP
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-secondary-foreground/60 text-sm">+244 924 709 966</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <p className="text-secondary-foreground/80">geral@evgrupo.com</p>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="text-secondary-foreground/80">Segunda - Sexta: 8h - 18h</p>
                  <p className="text-secondary-foreground/80">Sábado: 8h - 14h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Linha de separação */}
      <div className="border-t border-secondary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-foreground/60 text-sm">
              © 2025 EV Grupo Rent Car. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6 text-secondary-foreground/60 text-sm">
              <a
                href="/static/Portfolio.pdf"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('/static/Portfolio.pdf', '_blank', 'noopener,noreferrer');
                }}
                className="hover:text-primary transition-colors"
              >
                Nosso portfólio
              </a>
              <a
                href="/static/Tabela.pdf"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('/static/Tabela.pdf', '_blank', 'noopener,noreferrer');
                }}
                className="hover:text-primary transition-colors"
              >
                Tabela de preços
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default RodapePrincipal;