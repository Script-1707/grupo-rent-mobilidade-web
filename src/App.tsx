import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CabecalhoNavegacao from "./components/layout/CabecalhoNavegacao";
import RodapePrincipal from "./components/layout/RodapePrincipal";
import PaginaInicial from "./pages/PaginaInicial";
import SobreNos from "./pages/SobreNos";
import Contactos from "./pages/Contactos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <CabecalhoNavegacao />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<PaginaInicial />} />
              <Route path="/sobre" element={<SobreNos />} />
              <Route path="/contactos" element={<Contactos />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <RodapePrincipal />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
