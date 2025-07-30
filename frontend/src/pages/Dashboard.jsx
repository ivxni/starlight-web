import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchStats();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return;

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/config`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const configData = await response.json();
        setStats(configData.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-container">
          <FontAwesomeIcon icon="spinner" spin size="2x" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="welcome-section">
            <div className="user-avatar-large">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="User Avatar" />
              ) : (
                <FontAwesomeIcon icon="user" />
              )}
            </div>
            <div className="welcome-text">
              <h1>Welcome back, {user?.displayName || user?.username}!</h1>
              <p>Ready to enhance your gaming experience?</p>
            </div>
          </div>
          
          <div className="user-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon="chart-line" />
              </div>
              <div className="stat-info">
                <span className="stat-value">{user?.totalUsage || 0}</span>
                <span className="stat-label">Total Usage</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon="bullseye" />
              </div>
              <div className="stat-info">
                <span className="stat-value">{stats?.successRate || 0}%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <FontAwesomeIcon icon="star" />
              </div>
              <div className="stat-info">
                <span className="stat-value">{user?.subscriptionStatus || 'Free'}</span>
                <span className="stat-label">Plan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="tools-section">
            <h2>Available Tools</h2>
            <div className="tools-grid">
              <Link to="/agent-locker" className="tool-card">
                <div className="tool-icon">
                  <FontAwesomeIcon icon="gamepad" />
                </div>
                <div className="tool-info">
                  <h3>Agent Locker</h3>
                  <p>Advanced gaming automation with priority-based selection</p>
                  <div className="tool-status">
                    <span className="status-ready">
                      <FontAwesomeIcon icon="check" /> Ready to use
                    </span>
                  </div>
                </div>
                <div className="tool-arrow">
                  <FontAwesomeIcon icon="arrow-right" />
                </div>
              </Link>

              <div className="tool-card disabled">
                <div className="tool-icon">
                  <FontAwesomeIcon icon="rocket" />
                </div>
                <div className="tool-info">
                  <h3>Hardware Suite</h3>
                  <p>Hardware enhancement tools and optimizations</p>
                  <div className="tool-status">
                    <span className="status-coming-soon">Coming Soon</span>
                  </div>
                </div>
              </div>

              <div className="tool-card disabled">
                <div className="tool-icon">
                  <FontAwesomeIcon icon="shield" />
                </div>
                <div className="tool-info">
                  <h3>Security Suite</h3>
                  <p>Advanced privacy and security features</p>
                  <div className="tool-status">
                    <span className="status-coming-soon">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <button className="action-btn">
                <FontAwesomeIcon icon="cog" />
                <span>Settings</span>
              </button>
              <button className="action-btn">
                <FontAwesomeIcon icon="history" />
                <span>Activity Log</span>
              </button>
              <button className="action-btn">
                <FontAwesomeIcon icon="crown" />
                <span>Upgrade Plan</span>
              </button>
              <button className="action-btn">
                <FontAwesomeIcon icon="question-circle" />
                <span>Support</span>
              </button>
            </div>
          </div>

          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">
                  <FontAwesomeIcon icon="sign-in-alt" />
                </div>
                <div className="activity-info">
                  <span className="activity-text">Logged in via Discord</span>
                  <span className="activity-time">Just now</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <FontAwesomeIcon icon="gamepad" />
                </div>
                <div className="activity-info">
                  <span className="activity-text">Agent Locker configuration updated</span>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;