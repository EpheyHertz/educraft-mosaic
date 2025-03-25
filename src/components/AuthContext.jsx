
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Create auth context
const AuthContext = createContext(null);

// Mock user data for demonstration
const MOCK_USERS = [
  { id: 1, email: 'admin@school.edu', password: 'admin123', role: 'admin', name: 'Admin User' },
  { id: 2, email: 'teacher@school.edu', password: 'teacher123', role: 'teacher', name: 'John Smith' },
  { id: 3, email: 'student@school.edu', password: 'student123', role: 'student', name: 'Jane Doe' },
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('schoolUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
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

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('schoolUser');
    toast.success("Logged out successfully");
  };

  const updateUserProfile = (profileData) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profileData };
      setCurrentUser(updatedUser);
      localStorage.setItem('schoolUser', JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
      return true;
    }
    return false;
  };

  const value = {
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

export const useAuth = () => {
  return useContext(AuthContext);
};
