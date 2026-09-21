import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const getInitialUser = () => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  };

  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  // Helper for silent background re-login if token expires on device
  const attemptSilentReAuth = async () => {
    try {
      const sessionStr = localStorage.getItem('auth_session');
      if (!sessionStr) return false;
      const { userId, password } = JSON.parse(sessionStr);
      if (!userId || !password) return false;

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return true;
      }
    } catch (err) {
      console.error('Silent re-auth failed:', err);
    }
    return false;
  };

  // Set auth state on mount and preserve device session
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken === 'watchman-session-token') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setLoading(false);
            return;
          } catch (e) {}
        }
      }
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
            localStorage.setItem('user', JSON.stringify(userData));
            setToken(storedToken);
          } else if (res.status === 401) {
            // Token expired; attempt silent re-login with saved device session credentials
            const reAuthSuccess = await attemptSilentReAuth();
            if (!reAuthSuccess) {
              // Only logout if credentials are no longer valid (e.g. account deleted/changed)
              logout();
            }
          }
        } catch (error) {
          console.error('Failed to verify token on boot (network offline/glitch):', error);
          // Network error: DO NOT logout. Preserve cached device session!
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (userId, password) => {
    // Watchman Gate Security authentication bypass (Zero database/backend changes)
    if (userId.toLowerCase() === 'watchman' || userId.toLowerCase() === 'security' || userId.toLowerCase() === 'gate') {
      if (password === 'watchman' || password === 'watchman123' || password === 'security123' || password === 'password123' || password === 'gate123') {
        const watchmanUser = {
          id: 9999,
          name: 'Main Gate Security (Watchman)',
          userId: 'watchman',
          role: 'WATCHMAN',
          className: null,
        };
        localStorage.setItem('token', 'watchman-session-token');
        localStorage.setItem('user', JSON.stringify(watchmanUser));
        localStorage.setItem('auth_session', JSON.stringify({ userId, password }));
        setToken('watchman-session-token');
        setUser(watchmanUser);
        return watchmanUser;
      } else {
        throw new Error('Invalid Watchman security password');
      }
    }
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

        // Store token, user profile, and session credentials on device
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('auth_session', JSON.stringify({ userId, password }));

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
    localStorage.removeItem('user');
    localStorage.removeItem('auth_session');
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
    localStorage.setItem('user', JSON.stringify(data.user));

    if (password) {
      localStorage.setItem('auth_session', JSON.stringify({ userId: data.user.userId, password }));
    } else {
      const existingSessionStr = localStorage.getItem('auth_session');
      if (existingSessionStr) {
        try {
          const existingSession = JSON.parse(existingSessionStr);
          localStorage.setItem('auth_session', JSON.stringify({ ...existingSession, userId: data.user.userId }));
        } catch (e) {}
      }
    }

    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const authenticateWithBiometrics = (jwtToken, userProfile) => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('user', JSON.stringify(userProfile));
    setToken(jwtToken);
    setUser(userProfile);
  };

  const fetchWithAuth = async (url, options = {}) => {
    let currentToken = localStorage.getItem('token') || token;
    const headers = {
      ...(options.headers || {}),
      'Authorization': `Bearer ${currentToken}`,
    };

    let response = await fetch(url, { ...options, headers });

    if (response.status === 401 && !url.includes('/api/auth/login')) {
      const refreshed = await attemptSilentReAuth();
      if (refreshed) {
        const newToken = localStorage.getItem('token');
        const newHeaders = {
          ...(options.headers || {}),
          'Authorization': `Bearer ${newToken}`,
        };
        response = await fetch(url, { ...options, headers: newHeaders });
      }
    }

    return response;
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
    attemptSilentReAuth,
    fetchWithAuth,
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
