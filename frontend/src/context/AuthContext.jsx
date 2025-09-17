import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Mock login for:', email);
      
      if (email === 'admin@example.com' && password === 'admin123') {
        const demoUser = {
          id: '1',
          name: 'Admin User',
          email: email,
          role: 'admin',
        };
        
        setUser(demoUser);
        localStorage.setItem('user', JSON.stringify(demoUser));
        localStorage.setItem('token', 'demo-admin-token');
        return { success: true };
      } else if (email === 'user@example.com' && password === 'user123') {
        const demoUser = {
          id: '2',
          name: 'Normal User',
          email: email,
          role: 'normal',
        };
        
        setUser(demoUser);
        localStorage.setItem('user', JSON.stringify(demoUser));
        localStorage.setItem('token', 'demo-user-token');
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials. Try admin@example.com/admin123 or user@example.com/user123' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      // Mock signup logic - replace with actual API call
      console.log('Mock signup for:', email);
      const demoUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: role,
      };
      
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      localStorage.setItem('token', 'demo-token-' + Date.now());
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};