import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/LoginPage.css';
import { useTranslation } from '../i18n';
import { usePageTitle } from '../usePageTitle';

function LoginPage({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  usePageTitle('Login');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.username.trim() || !credentials.password.trim()) {
      toast.error(t('login.enter_both'));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      toast.success(`${t('login.welcome')}, ${response.data.username}!`);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || t('common.login_failed');
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-box">
          <h1>{t('login.title')}</h1>
          <p className="login-subtitle">{t('login.subtitle')}</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">{t('login.username')}</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder={t('login.username')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('login.password')}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder={t('login.password')}
                required
              />
            </div>

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? t('login.logging_in') : t('login.login')}
            </button>
          </form>

          <div className="login-info">
            <p><strong>{t('login.demo_credentials')}:</strong></p>
            <p>{t('login.demo_username')}</p>
            <p>{t('login.demo_password')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
