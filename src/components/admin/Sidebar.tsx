import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  Car,
  ClipboardList,
  Settings,
  Wrench,
  FolderTree,
  Mail,
} from "lucide-react";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-secondary text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-white/20">
        Painel Admin
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => navigate("/admin/users")}
          className="w-full text-left flex items-center gap-2 hover:bg-white/10 p-2 rounded"
        >
          <Users className="w-5 h-5" /> Gerenciar Usuários
        </button>

        <button
          onClick={() => navigate("/admin/reservations")}
          className="w-full text-left flex items-center gap-2 hover:bg-white/10 p-2 rounded"
        >
          <ClipboardList className="w-5 h-5" /> Reservas
        </button>

        <button
          onClick={() => navigate("/admin/cars")}
          className="w-full text-left flex items-center gap-2 hover:bg-white/10 p-2 rounded"
        >
          <Car className="w-5 h-5" /> Veículos
        </button>

        <button
          onClick={() => navigate("/admin/services")}
          className="w-full text-left flex items-center gap-2 hover:bg-white/10 p-2 rounded"
        >
          <Wrench className="w-5 h-5" /> Serviços
        </button>

        <button
          onClick={() => navigate("/admin/categories")}
          className="w-full text-left flex items-center gap-2 hover:bg-white/10 p-2 rounded"
        >
          <FolderTree className="w-5 h-5" /> Categorias
        </button>

        <button
          onClick={() => navigate("/admin/contact-inquiries")}
          className="w-full text-left flex items-center gap-2 hover:bg-white/10 p-2 rounded"
        >
          <Mail className="w-5 h-5" /> Mensagens de Contato
        </button>

        <button
          onClick={() => navigate("/admin/settings")}
          className="w-full text-left flex items-center gap-2 hover:bg-white/10 p-2 rounded"
        >
          <Settings className="w-5 h-5" /> Configurações
        </button>
      </nav>

      <div className="p-4 border-t border-white/20">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
        >
          <LogOut className="w-5 h-5" /> Sair
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
