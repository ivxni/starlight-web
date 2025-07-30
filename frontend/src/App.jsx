import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/App.scss';

// Import page components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AgentLocker from './pages/AgentLocker';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
    
    // Handle Discord OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code && window.location.pathname === '/auth/discord/callback') {
      handleDiscordCallback(code);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuthStatus = () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Verify token and get user data
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setLoading(false);
    }
  };

  const handleDiscordCallback = async (code) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/discord/callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        window.history.replaceState({}, document.title, '/dashboard');
      } else {
        console.error('Discord callback failed');
        window.history.replaceState({}, document.title, '/');
      }
    } catch (error) {
      console.error('Discord callback error:', error);
      window.history.replaceState({}, document.title, '/');
    }
  };

  const handleDiscordLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/discord`;
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <FontAwesomeIcon icon="spinner" spin size="2x" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">Starlight</Link>
            <ul className="nav-menu">
              <li><Link to="/">Home</Link></li>
              {user ? (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li className="user-menu">
                    <div className="user-info">
                      {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt="User Avatar" className="user-avatar-small" />
                      ) : (
                        <FontAwesomeIcon icon="user" />
                      )}
                      <span>{user.displayName || user.username}</span>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                      <FontAwesomeIcon icon="sign-out-alt" />
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={handleDiscordLogin} className="discord-login-btn">
                    <FontAwesomeIcon icon={['fab', 'discord']} />
                    Login with Discord
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/discord/callback" element={<div>Processing login...</div>} />
            {user ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/agent-locker" element={<AgentLocker />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
