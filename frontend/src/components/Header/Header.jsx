import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/img/Logo512.png';
import './Header.scss';

const Header = ({ user, onDiscordLogin, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="navbar navbar--dark">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="STARLIGHT" className="nav-logo-img" />
          <span className="nav-logo-text">starlight</span>
        </Link>
        
        <ul className="nav-menu">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              <FontAwesomeIcon icon="home" />
              <span>Home</span>
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                  <FontAwesomeIcon icon="chart-line" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/agent-locker" className={location.pathname === '/agent-locker' ? 'active' : ''}>
                  <FontAwesomeIcon icon="gamepad" />
                  <span>Agent Locker</span>
                </Link>
              </li>
            </>
          )}
        </ul>
        
        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="User Avatar" className="user-avatar-small" />
                ) : (
                  <FontAwesomeIcon icon="user" />
                )}
                <span>{user.displayName || user.username}</span>
              </div>
              <button onClick={onLogout} className="logout-btn" title="Logout">
                <FontAwesomeIcon icon="sign-out-alt" />
              </button>
            </div>
          ) : (
            <button onClick={onDiscordLogin} className="discord-login-btn">
              <FontAwesomeIcon icon={['fab', 'discord']} />
              <span>Login with Discord</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;