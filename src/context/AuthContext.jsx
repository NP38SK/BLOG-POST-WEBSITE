import React, { createContext, useContext, useState, useEffect } from 'react';
import FileService from '../services/fileService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Admin credentials
  const ADMIN_EMAIL = 'admin@blog.com';
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('blogUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, isAdmin = false) => {
    try {
      if (isAdmin) {
        // Admin login
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          const adminUser = {
            id: 'admin',
            email: ADMIN_EMAIL,
            name: 'Administrator',
            role: 'admin'
          };
          setUser(adminUser);
          localStorage.setItem('blogUser', JSON.stringify(adminUser));
          return { success: true, user: adminUser };
        } else {
          return { success: false, error: 'Invalid admin credentials' };
        }
      } else {
        // User login - authenticate with FileService
        try {
          const result = await FileService.authenticateUser(email, password);
          
          if (result.success) {
            const userWithRole = { ...result.user, role: 'user' };
            setUser(userWithRole);
            localStorage.setItem('blogUser', JSON.stringify(userWithRole));
            return { success: true, user: userWithRole };
          } else {
            return { success: false, error: result.error };
          }
        } catch (error) {
          console.error('Error authenticating user:', error);
          return { success: false, error: 'Authentication failed' };
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const result = await FileService.saveUser(userData);
      
      if (result.success) {
        return { success: true, message: 'Registration successful! You can now log in with your credentials.' };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blogUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};