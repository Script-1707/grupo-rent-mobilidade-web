import { useState, useEffect, useCallback } from "react";
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
  id: number | string;
  name: string;
  description?: string;
  // follow vehicles.json naming (only daily price kept)
  price_daily?: number;
  seats?: number;
  fuel_type?: string;
  transmission?: string;
  image?: string;
  status?: string;
}

function getDailyPrice(car: Car) {
  return Number(car.price_daily ?? 0);
}

const Reservas = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filter, setFilter] = useState('');
  const [step, setStep] = useState(1);
  type Reserva = {
    viatura: string;
    localLevantamento: string;
    localDevolucao: string;
    dataLevantamento: string;
    dataDevolucao: string;
    horaLevantamento: string;
    horaDevolucao: string;
    nome: string;
    telefone: string;
    email: string;
    observacoes: string;
    comMotorista?: string;
  };

  const [reserva, setReserva] = useState<Reserva>({
    viatura: "",
    localLevantamento: "",
    localDevolucao: "",
    dataLevantamento: "",
    dataDevolucao: "",
    horaLevantamento: "",
    horaDevolucao: "",
    nome: "",
    telefone: "",
    email: "",
    observacoes: "",
  });
  const [resumoPreco, setResumoPreco] = useState<string[]>([]);
  const [taxas, setTaxas] = useState<Array<{ servico: string; preco: number }> | null>(null);
  const [selectedServices, setSelectedServices] = useState<Record<number, boolean>>({});
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
  const filteredCars = cars.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()));
  const selectedCar = cars.find((c) => String(c.id) === String(reserva.viatura));

  function formatPrice(v: number) {
    return v ? v.toLocaleString('pt-AO') + ' AOA' : '—';
  }
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/static-db/vehicles.json');
        if (!res.ok) throw new Error('Falha ao carregar arquivo de viaturas');
        const data = await res.json();


        const mapped: Car[] = [];
        if (Array.isArray(data)) {
          data.forEach((catRaw: unknown) => {
            const cat = catRaw as Record<string, unknown>;
            const carsRaw = cat.cars;
            if (Array.isArray(carsRaw)) {
              carsRaw.forEach((cRaw: unknown, idx: number) => {
                const c = cRaw as Record<string, unknown>;
                const rawId = c.id ?? `${String(cat.category ?? '')}-${idx}`;
                mapped.push({
                  id: typeof rawId === 'number' ? rawId : String(rawId),
                  name: String(c.name ?? c.nome ?? ''),
                  description: String(cat.description ?? c.description ?? ''),
                  price_daily: Number(c.price_daily ?? c.priceDaily ?? 0),
                  seats: Number(c.seats ?? 4),
                  fuel_type: String(c.fuel_type ?? c.fuelType ?? ''),
                  transmission: String(c.transmission ?? ''),
                  image: String(c.image ?? ''),
                  status: 'available',
                });
              });
            }
          });
        }

        console.log('Viaturas carregadas (local):', mapped);
        setCars(mapped);
      } catch (err) {
        console.error('Erro ao carregar viaturas locais:', err);
        toast.error('Erro ao carregar viaturas');
      }
    })();
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

  const calculatePrice = useCallback(({
    reserva,
    cars,
    taxas,
    selectedServices,
  }: {
    reserva: Reserva;
    cars: Car[];
    taxas: Array<{ servico: string; preco: number }> | null;
    selectedServices: Record<number | string, boolean>;
  }): { total: number; resumo: string[] } | null => {
    const car = cars.find((c) => String(c.id) === String(reserva.viatura));
    if (!car) {
      toast.error("Selecione uma viatura primeiro");
      return null;
    }

    const pickupDate = new Date(
      `${reserva.dataLevantamento}T${reserva.horaLevantamento || "00:00"}:00`
    );
    const returnDate = new Date(
      `${reserva.dataDevolucao}T${reserva.horaDevolucao || "23:59"}:00`
    );

    if (isNaN(pickupDate.getTime()) || isNaN(returnDate.getTime())) {
      toast.error("Datas inválidas");
      return null;
    }

    const diffMs = returnDate.getTime() - pickupDate.getTime();
    if (diffMs <= 0) {
      toast.error("A data de devolução deve ser maior que a de levantamento");
      return null;
    }

    const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const dailyPrice = getDailyPrice(car);

    let total = 0;
    const resumo: string[] = [];

    // months/weeks/days breakdown
    if (diffDias >= 30) {
      const meses = Math.floor(diffDias / 30);
      const diasRestantes = diffDias % 30;
      const semanas = Math.floor(diasRestantes / 7);
      const dias = diasRestantes % 7;

      if (meses > 0) resumo.push(`${meses} mês(es) x ${(dailyPrice * 30).toLocaleString("pt-AO")} AOA`);
      if (semanas > 0) resumo.push(`${semanas} semana(s) x ${(dailyPrice * 7).toLocaleString("pt-AO")} AOA`);
      if (dias > 0) resumo.push(`${dias} dia(s) x ${dailyPrice.toLocaleString("pt-AO")} AOA`);

      total = meses * dailyPrice * 30 + semanas * dailyPrice * 7 + dias * dailyPrice;
    } else if (diffDias >= 7) {
      const semanas = Math.floor(diffDias / 7);
      const dias = diffDias % 7;

      if (semanas > 0) resumo.push(`${semanas} semana(s) x ${(dailyPrice * 7).toLocaleString("pt-AO")} AOA`);
      if (dias > 0) resumo.push(`${dias} dia(s) x ${dailyPrice.toLocaleString("pt-AO")} AOA`);

      total = semanas * dailyPrice * 7 + dias * dailyPrice;
    } else {
      resumo.push(`${diffDias} dia(s) x ${dailyPrice.toLocaleString("pt-AO")} AOA`);
      total = diffDias * dailyPrice;
    }

    // Add selected services
    if (taxas) {
      taxas.forEach((t, i) => {
        if (selectedServices?.[i] || selectedServices?.[String(i)]) {
          total += Number(t.preco || 0);
          resumo.push(`${t.servico}: ${Number(t.preco).toLocaleString('pt-AO')} AOA`);
        }
      });
    }

    return { total, resumo };
  }, []);

  const calcularPreco = useCallback(() => {
    // delegate to pure calculation helper
    const result = calculatePrice({ reserva, cars, taxas, selectedServices });
    if (!result) return; // helper already shows errors via toast

    setLoadingPreco(true);
    setTimeout(() => {
      setPrecoTotal(result.total);
      setResumoPreco(result.resumo);
      setLoadingPreco(false);
    }, 400);
  }, [calculatePrice, cars, reserva, selectedServices, taxas]);


  // (kept for backwards compatibility if needed) helper to humanize keys
  function humanizeServiceKey(key: string) {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // Load taxas-adicionais once
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/static-db/taxas-adicionais.json');
        if (!res.ok) throw new Error('Falha ao carregar taxas adicionais');
        const data = await res.json();

        // Aceita 2 formatos: objeto {key: value} ou array [{servico, preco}]
        if (Array.isArray(data)) {
          setTaxas(data as Array<{ servico: string; preco: number }>);
          const init: Record<number, boolean> = {};
          (data as unknown[]).forEach((_, i: number) => (init[i] = false));
          setSelectedServices(init);
        } else if (data && typeof data === 'object') {
          // convert object to array
          const arr = Object.entries(data).map(([k, v]) => ({ servico: humanizeServiceKey(k), preco: Number(v) }));
          setTaxas(arr);
          const init: Record<number, boolean> = {};
          (arr as unknown[]).forEach((_, i: number) => (init[i] = false));
          setSelectedServices(init);
        }
      } catch (err) {
        console.error('Erro ao carregar taxas adicionais:', err);
      }
    })();
  }, []);

  // keep selectedServices in sync if user toggles comMotorista earlier
  useEffect(() => {
    if (!taxas) return;
    // find index of motorista service (case-insensitive match)
    const idx = taxas.findIndex((t) => t.servico.toLowerCase().includes('motorista'));
    if (idx === -1) return;
    setSelectedServices((prev) => ({ ...(prev || {}), [idx]: reserva.comMotorista === 'sim' }));
  }, [reserva.comMotorista, taxas]);

  // utility: compute days between pick up and return for UI
  const diffDiasForUI = (() => {
    try {
      const pickup = new Date(`${reserva.dataLevantamento}T${reserva.horaLevantamento || '00:00'}:00`);
      const ret = new Date(`${reserva.dataDevolucao}T${reserva.horaDevolucao || '23:59'}:00`);
      if (isNaN(pickup.getTime()) || isNaN(ret.getTime())) return null;
      const diffMs = ret.getTime() - pickup.getTime();
      if (diffMs <= 0) return null;
      return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    } catch {
      return null;
    }
  })();

  const toggleService = (index: number) => {
    setSelectedServices((prev) => ({ ...(prev || {}), [index]: !prev?.[index] }));
  };


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
        <div className="container mx-auto px-4 max-w-8xl">
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
              <div className="grid gap-6 md:grid-cols-2">
                {/* Left: form / selection steps */}
                <form className="space-y-6">
                  <div className={`transition-all duration-500 ease-in-out transform overflow-hidden ${step === 1 ? 'opacity-100 translate-x-0 max-h-[2000px] scale-100' : 'opacity-0 -translate-x-6 max-h-0 scale-95 pointer-events-none'}`} aria-hidden={step !== 1}>
                    <div className="grid md:grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label>Viatura</Label>

                        <Select
                          value={reserva.viatura}
                          onValueChange={(value) => setReserva({ ...reserva, viatura: value })}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a viatura" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredCars.map((car) => (
                              <SelectItem key={car.id} value={String(car.id)}>
                                {car.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Car details preview */}
                      <div className="space-y-2">
                        <Label>Detalhes da Viatura</Label>
                        <div className="p-4 border rounded-2xl shadow-sm">
                          {selectedCar ? (
                            <div className="flex gap-4 items-start">
                              {selectedCar.image ? (
                                <img src={selectedCar.image} alt={selectedCar.name} className="w-32 h-20 object-cover rounded" />
                              ) : (
                                <div className="w-32 h-20 bg-muted rounded" />
                              )}
                              <div>
                                <h4 className="font-semibold">{selectedCar.name}</h4>
                                <p className="text-sm text-muted-foreground">{selectedCar.description}</p>
                                <div className="mt-2 text-sm">
                                  <div>Assentos: {selectedCar.seats ?? '—'}</div>
                                  <div>Transmissão: {selectedCar.transmission || '—'}</div>
                                  <div>Combustível: {selectedCar.fuel_type || '—'}</div>
                                  <div className="mt-1 font-medium">Preço diário: {formatPrice(getDailyPrice(selectedCar))}</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">Selecione uma viatura para ver os detalhes</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`transition-all duration-500 ease-in-out transform overflow-hidden ${step === 2 ? 'opacity-100 translate-x-0 max-h-[2000px] scale-100' : 'opacity-0 -translate-x-6 max-h-0 scale-95 pointer-events-none'}`} aria-hidden={step !== 2}>
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
                  </div>

                  <div className={`transition-all duration-500 ease-in-out transform overflow-hidden ${step === 3 ? 'opacity-100 translate-x-0 max-h-[2000px] scale-100' : 'opacity-0 -translate-x-6 max-h-0 scale-95 pointer-events-none'}`} aria-hidden={step !== 3}>
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
                  </div>

                  <div className={`transition-all duration-500 ease-in-out transform overflow-hidden ${step === 4 ? 'opacity-100 translate-x-0 max-h-[2000px] scale-100' : 'opacity-0 -translate-x-6 max-h-0 scale-95 pointer-events-none'}`} aria-hidden={step !== 4}>
                    <div className="space-y-6 text-left">
                      <p className="text-lg">Selecione as taxas adicionais</p>

                      <div className="text-sm text-muted-foreground">Duração estimada: {diffDiasForUI ?? '—'} dia(s)</div>

                      {!taxas ? (
                        <div className="flex justify-center mt-4">
                          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                        </div>
                      ) : (
                        <div className="grid gap-2">
                          {taxas.map((t, idx) => (
                            <label key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={!!selectedServices[idx]}
                                  onChange={() => toggleService(idx)}
                                  className="w-4 h-4"
                                />
                                <div>
                                  <div className="font-medium">{t.servico}</div>
                                </div>
                              </div>
                              <div className="font-semibold">{t.preco.toLocaleString('pt-AO')} AOA</div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botões de Navegação */}
                  <div className="flex justify-between">
                    {step > 1 && (
                      <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
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

                {/* Right: live summary */}
                <aside className="space-y-4">
                  <div className="p-4 border rounded-2xl shadow-sm">
                    <h3 className="font-semibold text-lg">Resumo da Reserva</h3>

                    <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                      <div>
                        <div className="font-medium">Viatura</div>
                        {selectedCar ? (
                          <div className="flex items-center gap-3 mt-2">
                            {selectedCar.image ? (
                              <img src={selectedCar.image} alt={selectedCar.name} className="w-20 h-12 object-cover rounded" />
                            ) : (
                              <div className="w-20 h-12 bg-muted rounded" />
                            )}
                            <div>
                              <div className="font-semibold">{selectedCar.name}</div>
                              <div className="text-xs">{selectedCar.description}</div>
                              <div className="mt-1">Diária: {formatPrice(getDailyPrice(selectedCar))}</div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2">—</div>
                        )}
                      </div>

                      <div>
                        <div className="font-medium">Levantamento</div>
                        <div className="mt-1">Local: {reserva.localLevantamento || '—'}</div>
                        <div>Data: {reserva.dataLevantamento || '—'} {reserva.horaLevantamento ? `às ${reserva.horaLevantamento}` : ''}</div>
                      </div>

                      <div>
                        <div className="font-medium">Devolução</div>
                        <div className="mt-1">Local: {reserva.localDevolucao || '—'}</div>
                        <div>Data: {reserva.dataDevolucao || '—'} {reserva.horaDevolucao ? `às ${reserva.horaDevolucao}` : ''}</div>
                      </div>

                      <div>
                        <div className="font-medium">Cliente</div>
                        <div className="mt-1">{reserva.nome || '—'}</div>
                        <div className="text-xs">{reserva.telefone || '—'} • {reserva.email || '—'}</div>
                      </div>

                      <div>
                        <div className="font-medium">Observações</div>
                        <div className="mt-1 text-sm">{reserva.observacoes || '—'}</div>
                      </div>

                      <div>
                        <div className="font-medium">Preço (estimado)</div>
                        {precoTotal === null ? (
                          <div className="mt-1">—</div>
                        ) : (
                          <div className="mt-1">
                            {resumoPreco.map((l, i) => (
                              <div key={i} className="text-sm text-gray-600">{l}</div>
                            ))}
                            <div className="mt-2 font-bold">{precoTotal.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3 items-center">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => calcularPreco()}
                        disabled={loadingPreco}
                        className="px-6 py-3 text-base md:text-lg flex items-center gap-2"
                      >
                        {loadingPreco ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Calculando...</span>
                          </>
                        ) : (
                          <span>Calcular Preço</span>
                        )}
                      </Button>

                      <Button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-3 text-base md:text-lg bg-red-600 hover:bg-red-700 text-white"
                      >
                        Confirmar Reserva
                      </Button>
                    </div>
                  </div>
                </aside>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Reservas;
