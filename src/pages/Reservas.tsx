import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Phone } from "lucide-react";

interface Car {
  id: number;
  name: string;
  description: string;
  priceDaily: number; // 👈 vem da API
  priceWeekly: number;
  priceMonthly: number;
  seats: number;
  fuelType: string;
  transmission: string;
  image: string;
  status: string;
}

const Reservas = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [step, setStep] = useState(1);
  const [reserva, setReserva] = useState({
    viatura: "",
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
    observacoes: "",
  });
  const [resumoPreco, setResumoPreco] = useState<string[]>([]);
  const locais = [
    "Aeroporto de Luanda",
    "Centro de Luanda",
    "Talatona",
    "Belas",
    "Viana",
    "Cacuaco",
    "Marginal",
  ];
  const [precoTotal, setPrecoTotal] = useState<number | null>(null);
  const [loadingPreco, setLoadingPreco] = useState(false);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cars`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Viaturas carregadas:", data);
        setCars(data);
      })
      .catch((err) => console.error("Erro ao carregar viaturas:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      car: { id: Number(reserva.viatura) },
      clientName: reserva.nome,
      clientEmail: reserva.email,
      clientPhone: reserva.telefone,
      pickupDate: new Date(
        `${reserva.dataLevantamento}T${reserva.horaLevantamento}:00`
      ).toISOString(),

      pickupLocation: reserva.localLevantamento,
      returnDate: new Date(
        `${reserva.dataDevolucao}T${reserva.horaDevolucao}`
      ).toISOString(),
      returnLocation: reserva.localDevolucao,
      withDriver: reserva.comMotorista === "sim",
      totalPrice: precoTotal ?? 0,
      status: "PENDING",
      note: reserva.observacoes,
    };

    // Mostra toast de carregamento
    const loadingToast = toast.loading("A criar reserva...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reservations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        toast.success("🎉 Reserva criada com sucesso!", { id: loadingToast });
        setReserva({
          viatura: "",
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
          observacoes: "",
        });
        setStep(1);
      } else {
        toast.error("❌ Erro ao criar reserva. Tente novamente.", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Erro de conexão com o servidor", { id: loadingToast });
    }
  };

  const calcularPreco = () => {
    const car = cars.find((c) => c.id === Number(reserva.viatura));
    if (!car) {
      toast.error("Selecione uma viatura primeiro");
      return;
    }

    const pickupDate = new Date(
      `${reserva.dataLevantamento}T${reserva.horaLevantamento || "00:00"}:00`
    );
    const returnDate = new Date(
      `${reserva.dataDevolucao}T${reserva.horaDevolucao || "23:59"}:00`
    );

    if (isNaN(pickupDate.getTime()) || isNaN(returnDate.getTime())) {
      toast.error("Datas inválidas");
      return;
    }

    const diffMs = returnDate.getTime() - pickupDate.getTime();
    if (diffMs <= 0) {
      toast.error("A data de devolução deve ser maior que a de levantamento");
      return;
    }

    setLoadingPreco(true);

    setTimeout(() => {
      let total = 0;
      let resumo: string[] = [];

      const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      // 🔹 Cálculo por meses/semanas/dias
      if (diffDias >= 30) {
        const meses = Math.floor(diffDias / 30);
        const diasRestantes = diffDias % 30;
        const semanas = Math.floor(diasRestantes / 7);
        const dias = diasRestantes % 7;

        if (meses > 0)
          resumo.push(
            `${meses} mês(es) x ${car.priceMonthly.toLocaleString("pt-AO")} AOA`
          );
        if (semanas > 0)
          resumo.push(
            `${semanas} semana(s) x ${car.priceWeekly.toLocaleString(
              "pt-AO"
            )} AOA`
          );
        if (dias > 0)
          resumo.push(
            `${dias} dia(s) x ${car.priceDaily.toLocaleString("pt-AO")} AOA`
          );

        total =
          meses * car.priceMonthly +
          semanas * car.priceWeekly +
          dias * car.priceDaily;
      } else if (diffDias >= 7) {
        const semanas = Math.floor(diffDias / 7);
        const dias = diffDias % 7;

        if (semanas > 0)
          resumo.push(
            `${semanas} semana(s) x ${car.priceWeekly.toLocaleString(
              "pt-AO"
            )} AOA`
          );
        if (dias > 0)
          resumo.push(
            `${dias} dia(s) x ${car.priceDaily.toLocaleString("pt-AO")} AOA`
          );

        total = semanas * car.priceWeekly + dias * car.priceDaily;
      } else {
        resumo.push(
          `${diffDias} dia(s) x ${car.priceDaily.toLocaleString("pt-AO")} AOA`
        );
        total = diffDias * car.priceDaily;
      }

      // 🔹 Se tiver motorista
      if (reserva.comMotorista === "sim") {
        const diffHoras = Math.ceil(diffMs / (1000 * 60 * 60));
        const custoMotorista = diffHoras * 2500;
        resumo.push(`${diffHoras} hora(s) de motorista x 2.500 AOA`);
        total += custoMotorista;
      }

      setPrecoTotal(total);
      setResumoPreco(resumo); // ⚡ novo estado para mostrar o breakdown
      setLoadingPreco(false);
    }, 2000);
  };

  // dispara cálculo quando chega no passo 4
  useEffect(() => {
    if (step === 4) {
      calcularPreco();
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Faça Sua Reserva
        </h1>
        <p className="text-xl text-white/90">
          Reserve sua viatura em poucos passos simples
        </p>
      </section>

      {/* Stepper */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">Passo {step} de 4</CardTitle>
              <CardDescription>
                {step === 1 && "Escolha sua viatura e opção de motorista"}
                {step === 2 && "Defina locais, datas e horários"}
                {step === 3 && "Informe seus dados pessoais"}
                {step === 4 && "Calcule o preço e confirme a reserva"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {step === 1 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Viatura</Label>
                      <Select
                        value={reserva.viatura}
                        onValueChange={(value) =>
                          setReserva({ ...reserva, viatura: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a viatura" />
                        </SelectTrigger>
                        <SelectContent>
                          {cars.map((car) => (
                            <SelectItem key={car.id} value={car.id.toString()}>
                              {car.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Com Motorista</Label>
                      <Select
                        value={reserva.comMotorista}
                        onValueChange={(value) =>
                          setReserva({ ...reserva, comMotorista: value })
                        }
                      >
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
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    {/* Bloco Levantamento */}
                    <div className="p-4 border rounded-2xl shadow-sm space-y-4">
                      <h3 className="font-semibold text-lg">🚗 Levantamento</h3>
                      <div className="space-y-2">
                        <Label>Local de Levantamento</Label>
                        <Select
                          value={reserva.localLevantamento}
                          onValueChange={(value) =>
                            setReserva({ ...reserva, localLevantamento: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o local" />
                          </SelectTrigger>
                          <SelectContent>
                            {locais.map((local) => (
                              <SelectItem key={local} value={local}>
                                {local}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          type="date"
                          value={reserva.dataLevantamento}
                          onChange={(e) =>
                            setReserva({
                              ...reserva,
                              dataLevantamento: e.target.value,
                            })
                          }
                          required
                        />
                        <Input
                          type="time"
                          value={reserva.horaLevantamento}
                          onChange={(e) =>
                            setReserva({
                              ...reserva,
                              horaLevantamento: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* Bloco Devolução */}
                    <div className="p-4 border rounded-2xl shadow-sm space-y-4">
                      <h3 className="font-semibold text-lg">📍 Devolução</h3>
                      <div className="space-y-2">
                        <Label>Local de Devolução</Label>
                        <Select
                          value={reserva.localDevolucao}
                          onValueChange={(value) =>
                            setReserva({ ...reserva, localDevolucao: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o local" />
                          </SelectTrigger>
                          <SelectContent>
                            {locais.map((local) => (
                              <SelectItem key={local} value={local}>
                                {local}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          type="date"
                          value={reserva.dataDevolucao}
                          onChange={(e) =>
                            setReserva({
                              ...reserva,
                              dataDevolucao: e.target.value,
                            })
                          }
                          required
                        />
                        <Input
                          type="time"
                          value={reserva.horaDevolucao}
                          onChange={(e) =>
                            setReserva({
                              ...reserva,
                              horaDevolucao: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <Input
                        type="text"
                        placeholder="Nome Completo"
                        value={reserva.nome}
                        onChange={(e) =>
                          setReserva({ ...reserva, nome: e.target.value })
                        }
                        required
                      />
                      <Input
                        type="tel"
                        placeholder="Telefone"
                        value={reserva.telefone}
                        onChange={(e) =>
                          setReserva({ ...reserva, telefone: e.target.value })
                        }
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={reserva.email}
                        onChange={(e) =>
                          setReserva({ ...reserva, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Textarea
                      value={reserva.observacoes}
                      onChange={(e) =>
                        setReserva({ ...reserva, observacoes: e.target.value })
                      }
                      placeholder="Alguma informação adicional?"
                      rows={3}
                    />
                  </div>
                )}
                {step === 4 && (
                  <div className="space-y-6 text-center">
                    <p className="text-lg">
                      Estamos a calcular o valor total da reserva...
                    </p>

                    {loadingPreco && (
                      <div className="flex justify-center mt-4">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      </div>
                    )}

                    {/* Quando o preço for calculado */}
                    {precoTotal !== null && (
                      <div className="mt-6 text-center space-y-3">
                        <div className="space-y-1">
                          {resumoPreco.map((linha, i) => (
                            <p key={i} className="text-gray-600">
                              {linha}
                            </p>
                          ))}
                        </div>
                        <p className="text-xl font-bold">
                          Total:{" "}
                          {precoTotal.toLocaleString("pt-AO", {
                            style: "currency",
                            currency: "AOA",
                          })}
                        </p>
                        <Button
                          type="button"
                          onClick={handleSubmit} // 👈 chama diretamente
                          className="mt-4 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                        >
                          <Phone className="w-5 h-5" />
                          Confirmar Reserva
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Botões de Navegação */}
                <div className="flex justify-between">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                    >
                      Voltar
                    </Button>
                  )}
                  {step < 4 && (
                    <Button type="button" onClick={() => setStep(step + 1)}>
                      Próximo
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Reservas;
