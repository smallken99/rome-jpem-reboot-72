
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Famille from "./pages/Famille";
import Patrimoine from "./pages/Patrimoine";
import Clientele from "./pages/Clientele";
import Registre from "./pages/Registre";
// import Religion from "./pages/Religion"; // Original Religion import removed
import LifeManagementPage from "./pages/LifeManagementPage"; // New import for LifeManagementPage
import Messages from "./pages/Messages";
import Rapports from "./pages/Rapports";
import Republique from "./pages/Republique";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateGens from "./pages/CreateGens";
import Admin from "./pages/Admin";
import MaitreJeu from "./pages/MaitreJeu";
import LifeManagement from "./pages/LifeManagement"; // Added LifeManagement

// Création du client React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pages publiques */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-gens" element={<CreateGens />} />
          
          {/* Pages protégées - normalement nous ajouterions un AuthGuard */}
          <Route path="/" element={<Index />} />
          
          {/* Routes avec sous-sections */}
          <Route path="/famille/*" element={<Famille />} />
          <Route path="/patrimoine/*" element={<Patrimoine />} />
          <Route path="/clientele/*" element={<Clientele />} />
          <Route path="/registre/*" element={<Registre />} />
          {/* <Route path="/religion/*" element={<Religion />} /> */} {/* Original Religion route removed/commented out */}
          <Route path="/lifemanagement/*" element={<LifeManagementPage />} /> {/* Changed from /religion/* to /lifemanagement/* and element to LifeManagementPage */}
          <Route path="/messages/*" element={<Messages />} />
          <Route path="/rapports/*" element={<Rapports />} />
          <Route path="/republique/*" element={<Republique />} />
          
          {/* The previous <Route path="/lifemanagement/*" element={<LifeManagement />} /> is now effectively replaced by the repurposed Religion route */}

          {/* Page admin */}
          <Route path="/admin/*" element={<Admin />} />
          
          {/* Page maître du jeu */}
          <Route path="/maitre-jeu/*" element={<MaitreJeu />} />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
