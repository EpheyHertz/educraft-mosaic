
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TeacherDashboard from "./pages/TeacherDashboard";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import Admission from "./pages/Admission";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import StudentPortal from "./pages/StudentPortal";
import Login from "./pages/Login";
import { AuthProvider } from "./components/AuthContext";
import Layout from "./components/Layout";
import CourseDetail from "./pages/CourseDetail";
import StudentDetail from "./pages/StudentDetail";
import TeacherDetail from "./pages/TeacherDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/teacher/:id" element={<TeacherDetail />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/student" element={<StudentPortal />} />
              <Route path="/student/:id" element={<StudentDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
