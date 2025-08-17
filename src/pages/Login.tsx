import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: senha }),
        }
      );

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const token = await response.text();
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);

      toast.success("Login realizado com sucesso!");
      if (decoded.role === "ROLE_ADMIN" || decoded.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
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
            Bem-vindo de Volta
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Entre para continuar gerenciando suas reservas, veículos e muito
            mais.
          </p>
          <div className="flex justify-center">
            <Lock className="w-16 h-16 text-white/90" />
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-muted">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
            Entrar na Conta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email
              </label>
              <div className="flex items-center border border-input rounded-xl px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-primary">
                <Mail className="w-5 h-5 text-muted-foreground mr-2" />
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Senha
              </label>
              <div className="flex items-center border border-input rounded-xl px-3 py-2 bg-background focus-within:ring-2 focus-within:ring-primary">
                <Lock className="w-5 h-5 text-muted-foreground mr-2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Botão Entrar */}
            <Button
              type="submit"
              className="w-full botao-primario py-6 text-lg flex items-center justify-center"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
              {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
            </Button>
          </form>

          {/* Link para Registro */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            Não tem conta?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline flex items-center justify-center gap-1"
            >
              Criar Conta
              <UserPlus className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
