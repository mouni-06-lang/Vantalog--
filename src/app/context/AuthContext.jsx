import { createContext, useContext, useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { TransitionLoader } from '@/app/components/PageTransitionWrapper';
import authService from '@/services/api/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user_data');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [role, setRole] = useState(() => JSON.parse(localStorage.getItem('user_data') || 'null')?.role || null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user_data', JSON.stringify(user));
    } else {
      localStorage.removeItem('user_data');
    }
  }, [user]);

  useEffect(() => {
    if (role) {
      localStorage.setItem('vantalog_role', role);
    } else {
      localStorage.removeItem('vantalog_role');
    }
  }, [role]);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        setRole(currentUser.role);
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('vantalog_role');
        setUser(null);
        setRole(null);
      } finally {
        setIsInitializing(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (email, password, selectedRole) => {
    const response = await authService.login({ email, password, role: selectedRole });
    setUser(response.user);
    setRole(response.user.role);
    return response.user;
  };

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setRole(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('vantalog_role');
      setIsLoggingOut(false);
      window.location.href = '/Vantalog/User/Log-In';
    }
  };

  const register = async (name, email, password, selectedRole) => {
    const response = await authService.register({ name, email, password, role: selectedRole });
    setUser(response.user);
    setRole(response.user.role);
    return response.user;
  };

  const updateProfile = (updatedData) => {
    setUser(updatedData);
    setRole(updatedData.role);
    return updatedData;
  };

  // Helper function to generate URL-safe strings
  const getUrlSafeName = () => {
    return user?.name ? encodeURIComponent(user.name.replace(/\s+/g, '-')) : 'user';
  };

  const getUrlSafeEmail = () => {
    return user?.email ? encodeURIComponent(user.email) : 'email';
  };

  const value = {
    user,
    role,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: role === 'admin',
    isUser: role === 'user',
    isLoggingOut,
    isInitializing,
    getUrlSafeName,
    getUrlSafeEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Logout Loader */}
      <AnimatePresence>
        {isLoggingOut && (
          <TransitionLoader 
            duration={1500} 
            message={`Logging out ${user?.name || 'user'}...`} 
          />
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
};
