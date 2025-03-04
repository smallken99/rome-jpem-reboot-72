
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Famille from "./pages/Famille";
import Proprietes from "./pages/Proprietes";
import Economie from "./pages/Economie";
import Clientele from "./pages/Clientele";
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
          <Route path="/famille" element={<Famille />} />
          <Route path="/proprietes" element={<Proprietes />} />
          <Route path="/economie" element={<Economie />} />
          <Route path="/clientele" element={<Clientele />} />
          <Route path="/evenements" element={<NotFound />} />
          <Route path="/messages" element={<NotFound />} />
          <Route path="/rapports" element={<NotFound />} />
          
          {/* Page admin */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
