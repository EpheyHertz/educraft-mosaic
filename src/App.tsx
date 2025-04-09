
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import TeacherDashboard from "./pages/TeacherDashboard";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import Admission from "./pages/Admission";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import StudentPortal from "./pages/StudentPortal";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import { AuthProvider } from "./components/AuthContext";
import Layout from "./components/Layout";
import CourseDetail from "./pages/CourseDetail";
import StudentDetail from "./pages/StudentDetail";
import TeacherDetail from "./pages/TeacherDetail";
import EventDetail from "./pages/EventDetail";
import AdminForms from "./pages/AdminForms";
import StudentProfile from "./pages/StudentProfile";
import TeacherProfile from "./pages/TeacherProfile";
import Settings from "./pages/Settings";
import Index from "./pages/Index";
import { PrivateRoute } from "./components/PrivateRoute";

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
              <Route path="/auth" element={<Auth />} />
              <Route path="/teacher" element={
                <PrivateRoute requiredRole="teacher">
                  <TeacherDashboard />
                </PrivateRoute>
              } />
              <Route path="/teacher/:id" element={<TeacherDetail />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={
                <PrivateRoute requiredRole="admin">
                  <AdminDashboard />
                </PrivateRoute>
              } />
              <Route path="/admin/forms" element={
                <PrivateRoute requiredRole="admin">
                  <AdminForms />
                </PrivateRoute>
              } />
              <Route path="/student" element={
                <PrivateRoute requiredRole="student">
                  <StudentPortal />
                </PrivateRoute>
              } />
              <Route path="/student/:id" element={<StudentDetail />} />
              <Route path="/profile/student" element={
                <PrivateRoute requiredRole="student">
                  <StudentProfile />
                </PrivateRoute>
              } />
              <Route path="/profile/teacher" element={
                <PrivateRoute requiredRole="teacher">
                  <TeacherProfile />
                </PrivateRoute>
              } />
              <Route path="/settings" element={<Settings />} />
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
