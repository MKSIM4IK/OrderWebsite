import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientForm from './components/ClientForm';
import OrderList from './components/OrderList';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import axiosInstance from './api/axiosConfig';
import './App.css';
import { useTranslation } from './i18n';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if token exists and is valid
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally verify token with backend
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  return (
    <Router>
      <div className="app">
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ClientForm />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/orders" element={<OrderList />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginPage setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
