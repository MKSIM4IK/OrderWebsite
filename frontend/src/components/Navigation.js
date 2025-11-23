import React from    'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';
import { useTranslation } from '../i18n';

function Navigation({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const { lang, setLanguage, t, available } = useTranslation();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🔧 ServiceFix.pl
        </Link>
        
        <ul className="nav-menu">
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link">{t('nav.request_service')}</Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link">{t('nav.orders_board')}</Link>
              </li>
            </>
          )}

          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">{t('nav.dashboard')}</Link>
              </li>
              <li className="nav-item user-info">
                <span className="username">👤 {username}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-btn">{t('nav.logout')}</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link login-link">{t('nav.provider_login')}</Link>
            </li>
          )}

          <li className="nav-item lang-select">
            <div className="lang-dropdown">
              <button className="lang-btn" aria-label="Language select">
                {available.find(l => l.code === lang)?.flag} {available.find(l => l.code === lang)?.label}
              </button>
              <div className="lang-menu">
                {available.map(l => (
                  <button
                    key={l.code}
                    className={`lang-option ${lang === l.code ? 'active' : ''}`}
                    onClick={() => setLanguage(l.code)}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
