import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Clock, Shield, Car, Phone } from "lucide-react";

const Reservas = () => {
  const [reserva, setReserva] = useState({
    tipoViatura: "",
    localLevantamento: "",
    localDevolucao: "",
    dataLevantamento: "",
    dataDevolucao: "",
    horaLevantamento: "",
    horaDevolucao: "",
    comMotorista: "nao",
    nome: "",
    telefone: "",
    email: "",
    observacoes: ""
  });

  const tiposViatura = [
    "Económico",
    "Intermédio", 
    "Luxo",
    "SUV",
    "Pick-Up",
    "Van & Grupo"
  ];

  const locais = [
    "Aeroporto de Luanda",
    "Centro de Luanda",
    "Talatona",
    "Belas",
    "Viana",
    "Cacuaco",
    "Marginal"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Olá! Gostaria de fazer uma reserva:
    
Tipo de Viatura: ${reserva.tipoViatura}
Local de Levantamento: ${reserva.localLevantamento}
Data/Hora de Levantamento: ${reserva.dataLevantamento} às ${reserva.horaLevantamento}
Local de Devolução: ${reserva.localDevolucao}
Data/Hora de Devolução: ${reserva.dataDevolucao} às ${reserva.horaDevolucao}
Com Motorista: ${reserva.comMotorista === "sim" ? "Sim" : "Não"}
Nome: ${reserva.nome}
Telefone: ${reserva.telefone}
Email: ${reserva.email}
Observações: ${reserva.observacoes}`;

    const whatsappUrl = `https://wa.me/244923456789?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Faça Sua Reserva
          </h1>
          <p className="text-xl text-white/90 mb-6">
            Reserve sua viatura em poucos passos simples
          </p>
        </div>
      </section>

      {/* Formulário de Reserva */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Dados da Reserva</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para fazer sua reserva
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Tipo de Viatura */}
                    <div className="space-y-2">
                      <Label htmlFor="tipoViatura">Tipo de Viatura</Label>
                      <Select value={reserva.tipoViatura} onValueChange={(value) => setReserva({...reserva, tipoViatura: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposViatura.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Com Motorista */}
                    <div className="space-y-2">
                      <Label htmlFor="comMotorista">Com Motorista</Label>
                      <Select value={reserva.comMotorista} onValueChange={(value) => setReserva({...reserva, comMotorista: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nao">Não</SelectItem>
                          <SelectItem value="sim">Sim</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Local de Levantamento */}
                    <div className="space-y-2">
                      <Label htmlFor="localLevantamento">Local de Levantamento</Label>
                      <Select value={reserva.localLevantamento} onValueChange={(value) => setReserva({...reserva, localLevantamento: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o local" />
                        </SelectTrigger>
                        <SelectContent>
                          {locais.map((local) => (
                            <SelectItem key={local} value={local}>{local}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Local de Devolução */}
                    <div className="space-y-2">
                      <Label htmlFor="localDevolucao">Local de Devolução</Label>
                      <Select value={reserva.localDevolucao} onValueChange={(value) => setReserva({...reserva, localDevolucao: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o local" />
                        </SelectTrigger>
                        <SelectContent>
                          {locais.map((local) => (
                            <SelectItem key={local} value={local}>{local}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Data e Hora de Levantamento */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="dataLevantamento">Data de Levantamento</Label>
                        <Input
                          type="date"
                          value={reserva.dataLevantamento}
                          onChange={(e) => setReserva({...reserva, dataLevantamento: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="horaLevantamento">Hora</Label>
                        <Input
                          type="time"
                          value={reserva.horaLevantamento}
                          onChange={(e) => setReserva({...reserva, horaLevantamento: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    {/* Data e Hora de Devolução */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="dataDevolucao">Data de Devolução</Label>
                        <Input
                          type="date"
                          value={reserva.dataDevolucao}
                          onChange={(e) => setReserva({...reserva, dataDevolucao: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="horaDevolucao">Hora</Label>
                        <Input
                          type="time"
                          value={reserva.horaDevolucao}
                          onChange={(e) => setReserva({...reserva, horaDevolucao: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Dados do Cliente */}
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        type="text"
                        value={reserva.nome}
                        onChange={(e) => setReserva({...reserva, nome: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        type="tel"
                        value={reserva.telefone}
                        onChange={(e) => setReserva({...reserva, telefone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        value={reserva.email}
                        onChange={(e) => setReserva({...reserva, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observacoes">Observações</Label>
                    <Textarea
                      value={reserva.observacoes}
                      onChange={(e) => setReserva({...reserva, observacoes: e.target.value})}
                      placeholder="Alguma informação adicional?"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-white"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Confirmar Reserva via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Política de Reservas */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Política de Reservas</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Calendar className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Cancelamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cancelamento gratuito até 24h antes da data de levantamento.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Shield className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Documentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    BI válido e carta de condução obrigatórios para levantamento.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Car className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Entrega e recolha gratuitas em Luanda. Outras localidades sob consulta.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservas;