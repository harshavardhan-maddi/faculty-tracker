import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  // Set auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });
          
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
            setToken(storedToken);
          } else {
            // Token expired or invalid
            logout();
          }
        } catch (error) {
          console.error('Failed to verify token on boot:', error);
          logout();
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (userId, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Login failed');
        }
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        return data.user;
      } else {
        throw new Error('Server returned an invalid response. Verify your backend is running and the database is configured.');
      }
    } catch (error) {
      throw new Error(error.message || 'Failed to connect to authentication server. Is the database running?');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  };

  const registerUser = async (name, userId, password, role, className) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, userId, password, role, className }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data.user;
  };

  const deleteUser = async (id) => {
    const res = await fetch(`/api/auth/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Delete user failed');
    }
    return data;
  };

  const getUsersList = async () => {
    const res = await fetch('/api/auth/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch users list');
    }
    return data;
  };

  const updateProfile = async (name, userId, password) => {
    const res = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, userId, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const authenticateWithBiometrics = (jwtToken, userProfile) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
    setUser(userProfile);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    registerUser,
    deleteUser,
    getUsersList,
    updateProfile,
    authenticateWithBiometrics,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
