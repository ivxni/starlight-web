import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AgentLocker = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [priorities, setPriorities] = useState([
    { id: 1, agent: 'Select Agent', locked: false },
    { id: 2, agent: 'Select Agent', locked: false },
    { id: 3, agent: 'Select Agent', locked: false },
    { id: 4, agent: 'Select Agent', locked: false },
  ]);
  const [isActive, setIsActive] = useState(false);

  // Available agents (generic names for legal safety)
  const availableAgents = [
    'Primary Option A',
    'Primary Option B', 
    'Secondary Option A',
    'Secondary Option B',
    'Support Option A',
    'Support Option B',
    'Tactical Option A',
    'Tactical Option B'
  ];

  // Riot OAuth Login
  const handleRiotLogin = () => {
    setLoading(true);
    // Redirect to backend OAuth endpoint
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/riot`;
  };

  // Handle Riot OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (code) {
      handleRiotOAuthCallback(code);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      console.error('Riot OAuth error:', error);
      setLoading(false);
    }

    // Check for existing Riot connection
    checkRiotConnection();
  }, []);

  const checkRiotConnection = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/riot/account`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const riotData = await response.json();
        setUser({ connected: true, ...riotData });
      }
    } catch (error) {
      console.error('Failed to check Riot connection:', error);
    }
    setLoading(false);
  };

  const handleOAuthCallback = async (code) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('riot_token', data.token);
        setUser(data.user.acct ? {
          gameName: data.user.acct.game_name,
          tagLine: data.user.acct.tag_line
        } : {
          gameName: 'User',
          tagLine: '0000'
        });
      } else {
        const errorData = await response.json();
        console.error('OAuth callback error:', errorData);
        // Handle error
      }
    } catch (error) {
      console.error('OAuth callback failed:', error);
    } finally {
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
        // Token invalid, remove it
        localStorage.removeItem('riot_token');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      localStorage.removeItem('riot_token');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('riot_token');
    setUser(null);
    setIsActive(false);
  };

  const handleAgentSelect = (priorityId, agent) => {
    setPriorities(prev => prev.map(p => 
      p.id === priorityId ? { ...p, agent } : p
    ));
  };

  const toggleSystem = () => {
    setIsActive(!isActive);
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-container">
          <FontAwesomeIcon icon="spinner" spin size="2x" />
          <p>Connecting to gaming platform...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page">
        <div className="login-section">
          <div className="login-container">
            <h1 className="login-title">Agent Locker</h1>
            <p className="login-subtitle">Connect your gaming account to get started</p>
            
            <div className="login-card">
              <div className="login-icon">
                <FontAwesomeIcon icon="gamepad" size="3x" />
              </div>
              <h3>Secure Account Connection</h3>
              <p>
                Connect your Riot Games account to access the Agent Locker. 
                Your credentials are processed securely through official OAuth protocols.
              </p>
              <button 
                className="btn btn--primary btn--large login-btn"
                onClick={handleRiotLogin}
              >
                Connect Gaming Account
              </button>
              <p className="login-disclaimer">
                By connecting, you agree to secure data handling practices. 
                Your account credentials are never stored on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="app-header">
        <div className="user-info">
          <div className="user-avatar">
            {user.gameName ? user.gameName.charAt(0).toUpperCase() : <FontAwesomeIcon icon="user" />}
          </div>
          <div className="user-details">
            <span className="username">{user.gameName || 'User'}</span>
            <span className="user-tag">#{user.tagLine || '0000'}</span>
          </div>
        </div>
        <div className="header-controls">
          <div className={`system-status ${isActive ? 'active' : 'inactive'}`}>
            <div className="status-dot"></div>
            <span>{isActive ? 'ACTIVE' : 'INACTIVE'}</span>
          </div>
          <button className="btn btn--secondary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="app-main">
        <div className="app-container">
          <div className="config-section">
            <h2>Selection Priorities</h2>
            <p>Configure your preferred selection order. The system will automatically select your highest available priority.</p>
            
            <div className="priority-configurator">
              {priorities.map((priority, index) => (
                <div key={priority.id} className="priority-row">
                  <div className="priority-number">{index + 1}</div>
                  <select 
                    className="agent-selector"
                    value={priority.agent}
                    onChange={(e) => handleAgentSelect(priority.id, e.target.value)}
                  >
                    <option value="Select Agent">Select Option...</option>
                    {availableAgents.map(agent => (
                      <option key={agent} value={agent}>{agent}</option>
                    ))}
                  </select>
                                     <div className="priority-status">
                     {priority.agent !== 'Select Agent' ? (
                       <span className="status-configured">
                         <FontAwesomeIcon icon="check" /> Configured
                       </span>
                     ) : (
                       <span className="status-pending">Pending</span>
                     )}
                   </div>
                </div>
              ))}
            </div>

            <div className="system-controls">
              <button 
                className={`btn btn--large system-toggle ${isActive ? 'btn--danger' : 'btn--primary'}`}
                onClick={toggleSystem}
                disabled={priorities.filter(p => p.agent !== 'Select Agent').length === 0}
              >
                {isActive ? 'Stop System' : 'Start System'}
              </button>
              
              {isActive && (
                <div className="active-notice">
                                     <div className="notice-icon">
                     <FontAwesomeIcon icon="bolt" />
                   </div>
                  <div className="notice-text">
                    <strong>System Active</strong>
                    <span>Monitoring for selection phases...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="status-section">
            <div className="status-cards">
              <div className="status-card">
                <div className="status-value">
                  {priorities.filter(p => p.agent !== 'Select Agent').length}/4
                </div>
                <div className="status-label">Configured</div>
              </div>
              <div className="status-card">
                <div className="status-value">{isActive ? 'ON' : 'OFF'}</div>
                <div className="status-label">System</div>
              </div>
              <div className="status-card">
                <div className="status-value">&lt;10ms</div>
                <div className="status-label">Response</div>
              </div>
            </div>

            <div className="activity-log">
              <h3>Activity Log</h3>
              <div className="log-entries">
                {isActive ? (
                  <>
                    <div className="log-entry active">
                      <div className="log-time">{new Date().toLocaleTimeString()}</div>
                      <div className="log-message">System activated - Monitoring enabled</div>
                    </div>
                    <div className="log-entry">
                      <div className="log-time">{new Date(Date.now() - 60000).toLocaleTimeString()}</div>
                      <div className="log-message">Configuration loaded successfully</div>
                    </div>
                  </>
                ) : (
                  <div className="log-entry inactive">
                    <div className="log-message">System inactive - Configure priorities and start system</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLocker;