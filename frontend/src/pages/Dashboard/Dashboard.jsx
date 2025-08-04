import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlassCard from '../../components/ui/Card/GlassCard';
import styles from './Dashboard.module.scss';

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
      <div className={styles.loadingContainer}>
        <FontAwesomeIcon icon="spinner" spin size="2x" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        {/* Welcome Header */}
        <GlassCard variant="hero" size="lg" className={styles.welcomeCard}>
          <div className={styles.welcomeContent}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt="User Avatar" />
                ) : (
                  <FontAwesomeIcon icon="user" />
                )}
              </div>
              <div className={styles.welcomeText}>
                <h1>Welcome back, {user?.displayName || user?.username || 'Gamer'}!</h1>
                <p>Ready to dominate the competition?</p>
              </div>
            </div>
            
            <div className={styles.quickActions}>
              <Link to="/agent-locker" className={styles.actionButton}>
                <FontAwesomeIcon icon="gamepad" />
                <span>Agent Locker</span>
              </Link>
              <button className={styles.actionButton}>
                <FontAwesomeIcon icon="cog" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <GlassCard variant="stat" size="md" className={styles.statCard}>
            <FontAwesomeIcon icon="chart-line" className={styles.statIcon} />
            <div className={styles.statValue}>{user?.totalUsage || 0}</div>
            <div className={styles.statLabel}>Total Usage</div>
          </GlassCard>

          <GlassCard variant="stat" size="md" className={styles.statCard}>
            <FontAwesomeIcon icon="bullseye" className={styles.statIcon} />
            <div className={styles.statValue}>{stats?.successRate || 0}%</div>
            <div className={styles.statLabel}>Success Rate</div>
          </GlassCard>

          <GlassCard variant="stat" size="md" className={styles.statCard}>
            <FontAwesomeIcon icon="clock" className={styles.statIcon} />
            <div className={styles.statValue}>{user?.hoursPlayed || 0}</div>
            <div className={styles.statLabel}>Hours Played</div>
          </GlassCard>

          <GlassCard variant="stat" size="md" className={styles.statCard}>
            <FontAwesomeIcon icon="star" className={styles.statIcon} />
            <div className={styles.statValue}>{user?.subscriptionStatus || 'Free'}</div>
            <div className={styles.statLabel}>Plan Status</div>
          </GlassCard>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Tools Section */}
          <div className={styles.toolsSection}>
            <h2 className={styles.sectionTitle}>Your Tools</h2>
            <div className={styles.toolsGrid}>
              <GlassCard variant="feature" size="md" className={styles.toolCard}>
                <Link to="/agent-locker">
                  <div className={styles.toolIcon}>
                    <FontAwesomeIcon icon="gamepad" />
                  </div>
                  <h3>Agent Locker</h3>
                  <p>Instant agent selection system</p>
                  <span className={styles.toolStatus}>
                    <FontAwesomeIcon icon="check-circle" /> Ready
                  </span>
                </Link>
              </GlassCard>

              <GlassCard variant="feature" size="md" className={styles.toolCard}>
                <div className={styles.toolCardDisabled}>
                  <div className={styles.toolIcon}>
                    <FontAwesomeIcon icon="crosshairs" />
                  </div>
                  <h3>Aim Trainer</h3>
                  <p>Improve your accuracy</p>
                  <span className={styles.toolStatus}>
                    <FontAwesomeIcon icon="clock" /> Coming Soon
                  </span>
                </div>
              </GlassCard>

              <GlassCard variant="feature" size="md" className={styles.toolCard}>
                <div className={styles.toolCardDisabled}>
                  <div className={styles.toolIcon}>
                    <FontAwesomeIcon icon="chart-bar" />
                  </div>
                  <h3>Performance Analytics</h3>
                  <p>Track your progress</p>
                  <span className={styles.toolStatus}>
                    <FontAwesomeIcon icon="clock" /> Coming Soon
                  </span>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Activity Section */}
          <div className={styles.activitySection}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <GlassCard variant="default" size="md" className={styles.activityCard}>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <FontAwesomeIcon icon="gamepad" className={styles.activityIcon} />
                  <div className={styles.activityContent}>
                    <p>Agent Locker activated</p>
                    <span className={styles.activityTime}>2 hours ago</span>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <FontAwesomeIcon icon="check-circle" className={styles.activityIcon} />
                  <div className={styles.activityContent}>
                    <p>Successfully locked primary agent</p>
                    <span className={styles.activityTime}>3 hours ago</span>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <FontAwesomeIcon icon="sign-in-alt" className={styles.activityIcon} />
                  <div className={styles.activityContent}>
                    <p>Logged in via Discord</p>
                    <span className={styles.activityTime}>5 hours ago</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;