
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { UserRole } from '@/integrations/supabase/types.d';

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { isAuthenticated, isAdmin, isTeacher, isStudent, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to auth page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If a specific role is required, check if the user has it
  if (requiredRole) {
    const hasRequiredRole = 
      (requiredRole === 'admin' && isAdmin) ||
      (requiredRole === 'teacher' && isTeacher) ||
      (requiredRole === 'student' && isStudent);

    if (!hasRequiredRole) {
      // Redirect to home if authenticated but lacking the required role
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
