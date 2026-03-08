import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import Login from "./pages/Login";
import { DashboardLayout } from "./components/DashboardLayout";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Journeys from "./pages/Journeys";
import Members from "./pages/Members";
import Library from "./pages/Library";
import DashboardSettings from "./pages/DashboardSettings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTemplates from "./pages/AdminTemplates";
import AdminOrganizations from "./pages/AdminOrganizations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="insights" element={<Insights />} />
              <Route path="journeys" element={<Journeys />} />
              <Route path="members" element={<Members />} />
              <Route path="library" element={<Library />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="templates" element={<AdminTemplates />} />
              <Route path="organizations" element={<AdminOrganizations />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
