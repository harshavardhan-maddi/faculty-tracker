import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageClassrooms from './pages/ManageClassrooms';
import ManageUsers from './pages/ManageUsers';
import ManageFaculty from './pages/ManageFaculty';
import Reports from './pages/Reports';
import CRDashboard from './pages/CRDashboard';

// Custom router resolver to send authenticated users to their correct home dashboard
const HomeRedirect = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return user.role === 'CR' ? <Navigate to="/cr-dashboard" replace /> : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected CR Routes */}
      <Route
        path="/cr-dashboard"
        element={
          <PrivateRoute allowedRoles={['CR']}>
            <Layout>
              <CRDashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Protected Admin/Sub Admin Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={['HOD', 'SUB_ADMIN']}>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/classrooms"
        element={
          <PrivateRoute allowedRoles={['HOD', 'SUB_ADMIN']}>
            <Layout>
              <ManageClassrooms />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/faculty"
        element={
          <PrivateRoute allowedRoles={['HOD', 'SUB_ADMIN']}>
            <Layout>
              <ManageFaculty />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <PrivateRoute allowedRoles={['HOD', 'SUB_ADMIN']}>
            <Layout>
              <Reports />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Protected HOD-Only Routes */}
      <Route
        path="/users"
        element={
          <PrivateRoute allowedRoles={['HOD']}>
            <Layout>
              <ManageUsers />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Wildcard redirects */}
      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <AppRoutes />
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
