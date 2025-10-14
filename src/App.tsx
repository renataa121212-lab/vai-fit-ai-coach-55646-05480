import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import JejumIntermitente from "./pages/JejumIntermitente";
import Receitas from "./pages/Receitas";
import ReceitaDetalhes from "./pages/ReceitaDetalhes";
import ReceitasPorIngredientes from "./pages/ReceitasPorIngredientes";
import Metas from "./pages/Metas";
import ReconhecimentoAlimentos from "./pages/ReconhecimentoAlimentos";
import DiarioEvolucao from "./pages/DiarioEvolucao";
import BodyScanIntro from "./pages/BodyScanIntro";
import BodyScanHowItWorks from "./pages/BodyScanHowItWorks";
import BodyScanPrepare from "./pages/BodyScanPrepare";
import BodyScanTerms from "./pages/BodyScanTerms";
import BodyScan from "./pages/BodyScan";
import BodyScanResults from "./pages/BodyScanResults";
import Configuracoes from "./pages/Configuracoes";
import Treinos from "./pages/Treinos";
import TreinoExecucao from "./pages/TreinoExecucao";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <PWAInstallPrompt />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/jejum" element={<ProtectedRoute><JejumIntermitente /></ProtectedRoute>} />
              <Route path="/receitas" element={<ProtectedRoute><Receitas /></ProtectedRoute>} />
              <Route path="/receitas/:id" element={<ProtectedRoute><ReceitaDetalhes /></ProtectedRoute>} />
              <Route path="/receitas-ingredientes" element={<ProtectedRoute><ReceitasPorIngredientes /></ProtectedRoute>} />
              <Route path="/metas" element={<ProtectedRoute><Metas /></ProtectedRoute>} />
              <Route path="/alimentos" element={<ProtectedRoute><ReconhecimentoAlimentos /></ProtectedRoute>} />
              <Route path="/evolucao" element={<ProtectedRoute><DiarioEvolucao /></ProtectedRoute>} />
              <Route path="/body-scan/intro" element={<ProtectedRoute><BodyScanIntro /></ProtectedRoute>} />
              <Route path="/body-scan/how-it-works" element={<ProtectedRoute><BodyScanHowItWorks /></ProtectedRoute>} />
              <Route path="/body-scan/prepare" element={<ProtectedRoute><BodyScanPrepare /></ProtectedRoute>} />
              <Route path="/body-scan/terms" element={<ProtectedRoute><BodyScanTerms /></ProtectedRoute>} />
              <Route path="/body-scan/scan" element={<ProtectedRoute><BodyScan /></ProtectedRoute>} />
              <Route path="/body-scan/results" element={<ProtectedRoute><BodyScanResults /></ProtectedRoute>} />
              <Route path="/treinos" element={<ProtectedRoute><Treinos /></ProtectedRoute>} />
              <Route path="/treinos/:id" element={<ProtectedRoute><TreinoExecucao /></ProtectedRoute>} />
              <Route path="/configuracoes" element={<ProtectedRoute><Configuracoes /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
