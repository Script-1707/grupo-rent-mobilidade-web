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
import Reservas from "./pages/Reservas";
import Frotas from "./pages/Frotas";
import Servicos from "./pages/Servicos";
// import Promocoes from "./pages/Promocoes";
import Clientes from "./pages/Clientes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UserPage";
import Reservations from "./pages/admin/ReservationPage";
import CarsPage from "./pages/admin/CarsPage";
import AdminSettings from "./pages/admin/AdminSettings";
import ContactInquiryPage from "./pages/admin/ContactInquiryPage";
import ServicesPage from "./pages/admin/ServicesPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import AdminLayout from "./pages/admin/AdminLayout";
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
              <Route path="/frotas" element={<Frotas />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/reservas" element={<Reservas />} />
              {/* <Route path="/promocoes" element={<Promocoes />} /> */}
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/contactos" element={<Contactos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="reservations" element={<Reservations />} />
                <Route path="cars" element={<CarsPage />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route
                  path="contact-inquiries"
                  element={<ContactInquiryPage />}
                />
                <Route path="services" element={<ServicesPage />} />
                <Route path="categories" element={<CategoriesPage />} />
              </Route>
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
