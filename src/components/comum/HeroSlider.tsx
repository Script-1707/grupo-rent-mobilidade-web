import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-frota-carros.jpg";
import heroImage1 from "@/assets/hero/1.jpeg";
import heroImage2 from "@/assets/hero/2.jpeg";

const slidesHero = [
  {
    id: 1,
    titulo: "Mobilidade com Excelência",
    subtitulo: "Descubra nossa frota premium com os melhores carros de Angola",
    descricao:
      "Desde viaturas económicas até carros de luxo, temos a solução perfeita para sua viagem.",
    imagem: heroImage1,
    botaoPrincipal: "Reservar Agora",
    botaoSecundario: "Ver Frota",
  },
  {
    id: 2,
    titulo: "A Nº1 em Rent Car em Angola",
    subtitulo: "Mais de 10 anos oferecendo as melhores soluções de mobilidade",
    descricao: "Confiança de milhares de clientes e parceiros em todo o país.",
    imagem: heroImage2,
    botaoPrincipal: "Reservar Agora",
    botaoSecundario: "Ver Frota",
  },
  {
    id: 3,
    titulo: "Suporte 24 Horas",
    subtitulo: "Assistência completa onde quer que esteja",
    descricao:
      "Nossa equipe está sempre pronta para atendê-lo em qualquer situação.",
    imagem: heroImage1,
    botaoPrincipal: "Reservar Agora",
    botaoSecundario: "Ver Frota",
  },
];

const HeroSlider = () => {
  const [slideAtual, setSlideAtual] = useState(0);
  const [animando, setAnimando] = useState(false);

  // Auto-play do slider
  useEffect(() => {
    const intervalo = setInterval(() => {
      proximoSlide();
    }, 6000);

    return () => clearInterval(intervalo);
  }, [slideAtual]);

  const proximoSlide = () => {
    if (!animando) {
      setAnimando(true);
      setTimeout(() => {
        setSlideAtual((prev) => (prev + 1) % slidesHero.length);
        setAnimando(false);
      }, 300);
    }
  };

  const slideAnterior = () => {
    if (!animando) {
      setAnimando(true);
      setTimeout(() => {
        setSlideAtual(
          (prev) => (prev - 1 + slidesHero.length) % slidesHero.length
        );
        setAnimando(false);
      }, 300);
    }
  };

  const irParaSlide = (indice: number) => {
    if (!animando && indice !== slideAtual) {
      setAnimando(true);
      setTimeout(() => {
        setSlideAtual(indice);
        setAnimando(false);
      }, 300);
    }
  };

  const slide = slidesHero[slideAtual];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Fundo do slide com overlay */}
      <div className="absolute inset-0">
        <img
          src={slide.imagem}
          alt={slide.titulo}
          className={`w-full h-full object-cover transition-all duration-1000 ${animando ? "scale-110" : "scale-100"
            }`}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
      </div>

      {/* Conteúdo do slide */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div
              className={`transition-all duration-700 ${animando
                  ? "opacity-0 translate-y-10"
                  : "opacity-100 translate-y-0"
                }`}
            >
              {/* Título principal */}
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {slide.titulo}
              </h1>

              {/* Subtítulo */}
              <h2 className="text-2xl md:text-3xl text-white/90 mb-6 font-light">
                {slide.subtitulo}
              </h2>

              {/* Descrição */}
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
                {slide.descricao}
              </p>

              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/reservas">
                  <Button className="botao-primario  text-lg px-10 py-6 group">
                    {slide.botaoPrincipal}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link to="/frotas">
                  <Button
                    variant="outline"
                    className="border-2 text-white hover:bg-white hover:text-secondary text-lg px-10 py-6 bg-transparent group"
                  >
                    {slide.botaoSecundario}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles de navegação */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slidesHero.map((_, indice) => (
            <button
              key={indice}
              onClick={() => irParaSlide(indice)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${indice === slideAtual
                  ? "bg-primary scale-125"
                  : "bg-white/50 hover:bg-white/75"
                }`}
              aria-label={`Ir para slide ${indice + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Botões de navegação lateral */}
      <button
        onClick={slideAnterior}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 
                   w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full 
                   flex items-center justify-center transition-all duration-300
                   backdrop-blur-sm border border-white/20 hover:scale-110"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={proximoSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 
                   w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full 
                   flex items-center justify-center transition-all duration-300
                   backdrop-blur-sm border border-white/20 hover:scale-110"
        aria-label="Próximo slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicador de progresso */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((slideAtual + 1) / slidesHero.length) * 100}%` }}
        ></div>
      </div>
    </section>
  );
};

export default HeroSlider;
