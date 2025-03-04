
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
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

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
          
          {/* Pages protégées - normalement nous ajouterions un AuthGuard */}
          <Route path="/" element={<Index />} />
          
          {/* Routes avec sous-sections */}
          <Route path="/famille/*" element={<Famille />} />
          <Route path="/patrimoine/*" element={<Patrimoine />} />
          <Route path="/clientele/*" element={<Clientele />} />
          <Route path="/registre/*" element={<Registre />} />
          <Route path="/religion/*" element={<Religion />} />
          <Route path="/messages/*" element={<Messages />} />
          <Route path="/rapports/*" element={<Rapports />} />
          
          {/* Page admin */}
          <Route path="/admin/*" element={<Admin />} />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
