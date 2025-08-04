import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlassCard from '../../components/ui/Card/GlassCard';
import styles from './AgentLocker.module.scss';

const AgentLocker = () => {
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

  // Check for existing connection
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // User data fetched successfully
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgentChange = (priorityId, agent) => {
    setPriorities(prev => prev.map(p => 
      p.id === priorityId ? { ...p, agent } : p
    ));
  };

  const toggleSystem = () => {
    setIsActive(!isActive);
  };

  const saveConfiguration = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/config`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ priorities })
      });

      if (response.ok) {
        alert('Configuration saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save configuration:', error);
      alert('Failed to save configuration');
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FontAwesomeIcon icon="spinner" spin size="2x" />
        <p>Loading Agent Locker...</p>
      </div>
    );
  }

  return (
    <div className={styles.agentLocker}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1>Agent Locker</h1>
          <p>Configure your agent priority system</p>
        </div>

        {/* Main Content */}
        <div className={styles.mainGrid}>
          {/* Configuration Section */}
          <div className={styles.configSection}>
            <GlassCard variant="hero" size="lg" className={styles.configCard}>
              <h2>Priority Configuration</h2>
              <p className={styles.description}>
                Set your agent preferences in order. The system will automatically lock your highest available priority.
              </p>

              <div className={styles.priorityList}>
                {priorities.map((priority) => (
                  <div key={priority.id} className={styles.priorityRow}>
                    <div className={styles.priorityNumber}>{priority.id}</div>
                    <select
                      value={priority.agent}
                      onChange={(e) => handleAgentChange(priority.id, e.target.value)}
                      className={styles.agentSelect}
                      disabled={isActive}
                    >
                      <option value="Select Agent">Select Agent</option>
                      {availableAgents.map((agent) => (
                        <option key={agent} value={agent}>{agent}</option>
                      ))}
                    </select>
                    <div className={styles.statusIndicator}>
                      {priority.locked ? (
                        <FontAwesomeIcon icon="lock" className={styles.lockedIcon} />
                      ) : (
                        <FontAwesomeIcon icon="unlock" className={styles.unlockedIcon} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.actions}>
                <button 
                  onClick={saveConfiguration} 
                  className={styles.saveButton}
                  disabled={isActive}
                >
                  <FontAwesomeIcon icon="save" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </GlassCard>
          </div>

          {/* Control Section */}
          <div className={styles.controlSection}>
            <GlassCard variant="feature" size="md" className={styles.controlCard}>
              <h3>System Control</h3>
              
              <div className={styles.systemToggle}>
                <button
                  onClick={toggleSystem}
                  className={`${styles.toggleButton} ${isActive ? styles.active : ''}`}
                >
                  <FontAwesomeIcon icon={isActive ? 'stop' : 'play'} />
                  <span>{isActive ? 'Stop System' : 'Start System'}</span>
                </button>
              </div>

              <div className={styles.statusInfo}>
                <div className={`${styles.statusDot} ${isActive ? styles.active : ''}`}></div>
                <span>System {isActive ? 'Active' : 'Inactive'}</span>
              </div>

              {isActive && (
                <div className={styles.activeNotice}>
                  <FontAwesomeIcon icon="info-circle" />
                  <p>Agent Locker is running. Configuration changes are disabled while active.</p>
                </div>
              )}
            </GlassCard>

            {/* Instructions */}
            <GlassCard variant="default" size="md" className={styles.instructionsCard}>
              <h3>How to Use</h3>
              <ol className={styles.instructionsList}>
                <li>Select your preferred agents in priority order</li>
                <li>Save your configuration</li>
                <li>Click "Start System" when ready</li>
                <li>The system will automatically lock your highest available agent</li>
              </ol>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLocker;