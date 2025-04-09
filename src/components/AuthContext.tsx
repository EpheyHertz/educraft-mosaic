
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface User {
  id: number;
  email: string;
  role: string;
  name: string;
  [key: string]: any;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUserProfile: (profileData: Partial<User>) => boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isTeacher: boolean;
  isStudent: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data for demonstration
const MOCK_USERS: (User & { password: string })[] = [
  { id: 1, email: 'admin@school.edu', password: 'admin123', role: 'admin', name: 'Admin User' },
  { id: 2, email: 'teacher@school.edu', password: 'teacher123', role: 'teacher', name: 'John Smith' },
  { id: 3, email: 'student@school.edu', password: 'student123', role: 'student', name: 'Jane Doe' },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('schoolUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    // Find matching user
    const user = MOCK_USERS.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Remove password before storing user data
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('schoolUser', JSON.stringify(userWithoutPassword));
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Invalid email or password");
      return false;
    }
  };

  const logout = (): void => {
    setCurrentUser(null);
    localStorage.removeItem('schoolUser');
    toast.success("Logged out successfully");
  };

  const updateUserProfile = (profileData: Partial<User>): boolean => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profileData };
      setCurrentUser(updatedUser);
      localStorage.setItem('schoolUser', JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
      return true;
    }
    return false;
  };

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    updateUserProfile,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
    isTeacher: currentUser?.role === 'teacher',
    isStudent: currentUser?.role === 'student',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
