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
import Religion from "./pages/Religion";
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

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AuthPage from './pages/AuthPage';

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

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/login" element={<Navigate to="/famille" replace />} />
          <Route path="/register" element={<Navigate to="/famille" replace />} />
          <Route path="/welcome" element={<Navigate to="/famille" replace />} />
          <Route path="/create-gens" element={<Navigate to="/famille" replace />} />

          <Route path="/" element={<Index />} />
          <Route path="/famille/*" element={<Famille />} />
          <Route path="/patrimoine/*" element={<Patrimoine />} />
          <Route path="/clientele/*" element={<Clientele />} />
          <Route path="/registre/*" element={<Registre />} />
          <Route path="/religion/*" element={<Religion />} />
          <Route path="/messages/*" element={<Messages />} />
          <Route path="/rapports/*" element={<Rapports />} />
          <Route path="/republique/*" element={<Republique />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/maitre-jeu/*" element={<MaitreJeu />} />
          
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route path="*" element={<AuthPage />} />
        </>
      )}
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
