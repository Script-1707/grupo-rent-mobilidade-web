import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserPlus, ArrowRight, LogIn } from "lucide-react";
import toast from "react-hot-toast";
const RegisterPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    setLoading(true);

    try {
      console.log(nome, email, senha, confirmarSenha);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: nome,
            email: email,
            password: senha,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar conta");
      }

      const data = await response.json();

      toast.success("Conta criada com sucesso!", { duration: 2000 });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      alert(error.message);
      toast.error(error.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Lado esquerdo - Branding */}
      <div className="lg:w-1/2 gradiente-hero flex flex-col justify-center items-center text-white p-10">
        <div className="max-w-md text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Crie a Sua Conta EV Group
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Registe-se para reservar veículos, acompanhar suas reservas e
            receber promoções exclusivas.
          </p>
          <div className="flex justify-center">
            <UserPlus className="w-16 h-16 text-white/90" />
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-muted">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
            Registar Conta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Senha
              </label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Confirmar Senha
              </label>
              <input
                type="password"
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Botão Registrar */}
            <Button
              type="submit"
              className="w-full botao-primario py-6 text-lg font-semibold flex items-center justify-center"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar Conta"}
              {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
          </form>

          {/* Link para Login */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline flex items-center justify-center gap-1"
            >
              Entrar
              <LogIn className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
