import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
  return (
    <div className="page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">STARLIGHT</h1>
          <p className="hero-subtitle">Gaming Automation Technology</p>
          <p className="hero-description">
            Advanced automation solutions for competitive gaming scenarios.
            Consistent performance, every time.
          </p>
          <Link to="/dashboard" className="btn btn--primary btn--large hero-cta">
            Explore Solutions
          </Link>
        </div>
        
        {/* Interactive Demo Section */}
        <div className="demo-container">
          <div className="demo-card">
            <h3>Interactive System Demo</h3>
            <p>Experience our automation interface</p>
            <div className="agent-demo">
              <div className="agent-grid">
                <div className="agent-slot active" data-agent="primary">
                  <span className="agent-name">PRIMARY</span>
                  <div className="lock-indicator">
                    <FontAwesomeIcon icon="lock" />
                  </div>
                </div>
                <div className="agent-slot" data-agent="secondary">
                  <span className="agent-name">SECONDARY</span>
                </div>
                <div className="agent-slot" data-agent="tertiary">
                  <span className="agent-name">TERTIARY</span>
                </div>
                <div className="agent-slot" data-agent="backup">
                  <span className="agent-name">BACKUP</span>
                </div>
              </div>
              <p className="demo-status">
                <span className="status-active">ACTIVE</span> - Selection Locked: PRIMARY
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Undetected</div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="features-section">
        <h2 className="section-title">Feature Highlights</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon="bolt" />
            </div>
            <h3>Lightning Fast</h3>
            <p>Execute selections in milliseconds with optimized automation technology</p>
          </div>
                      <div className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon="bullseye" />
              </div>
              <h3>100% Accurate</h3>
              <p>Reliable automated selection with intelligent priority systems</p>
            </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon="shield" />
            </div>
            <h3>Stealth Operation</h3>
            <p>Advanced stealth technology ensures undetectable operation</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FontAwesomeIcon icon="cog" />
            </div>
            <h3>Fully Customizable</h3>
            <p>Configure priority lists and backup options to your preference</p>
          </div>
        </div>
      </div>

      {/* Agent Locker Section */}
      <div className="product-section">
        <div className="product-container">
          <div className="product-info">
            <h2>Agent Locker System</h2>
            <h3>Intelligent Selection Automation</h3>
            <p>
              Advanced automation technology for instant character selection with 
              customizable priority lists and intelligent backup systems.
            </p>
            
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-check">
                  <FontAwesomeIcon icon="check" />
                </span>
                <span>Priority-based selection logic</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">
                  <FontAwesomeIcon icon="check" />
                </span>
                <span>Intelligent fallback system</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">
                  <FontAwesomeIcon icon="check" />
                </span>
                <span>Lightning-fast automation</span>
              </div>
              <div className="feature-item">
                <span className="feature-check">
                  <FontAwesomeIcon icon="check" />
                </span>
                <span>Stealth operation technology</span>
              </div>
            </div>
          </div>

          <div className="product-demo">
            <div className="demo-window">
              <div className="demo-header">
                <span className="demo-title">STARLIGHT Configuration</span>
                <span className="demo-status-dot active"></span>
              </div>
              <div className="demo-content">
                <div className="priority-list">
                  <div className="priority-item priority-1">
                    <span className="priority-num">1</span>
                    <span className="agent-name">PRIMARY</span>
                    <span className="status">LOCKED</span>
                  </div>
                  <div className="priority-item priority-2">
                    <span className="priority-num">2</span>
                    <span className="agent-name">SECONDARY</span>
                    <span className="status">BACKUP</span>
                  </div>
                  <div className="priority-item priority-3">
                    <span className="priority-num">3</span>
                    <span className="agent-name">TERTIARY</span>
                    <span className="status">BACKUP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Reviews */}
      <div className="reviews-section">
        <h2 className="section-title">What Users Say</h2>
        <p className="section-subtitle">Real experiences from our community</p>
        
        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-header">
              <span className="reviewer-initial">G</span>
              <div className="reviewer-info">
                <span className="reviewer-name">GameMaster</span>
                <span className="review-date">Jan 2025</span>
              </div>
            </div>
            <p className="review-text">
              "Never miss my preferred character again. The automation works flawlessly every time."
            </p>
          </div>

          <div className="review-card">
            <div className="review-header">
              <span className="reviewer-initial">C</span>
              <div className="reviewer-info">
                <span className="reviewer-name">CompetitivePlayer</span>
                <span className="review-date">Jan 2025</span>
              </div>
            </div>
            <p className="review-text">
              "Finally consistent character selection every match. The backup system is brilliant!"
            </p>
          </div>

          <div className="review-card">
            <div className="review-header">
              <span className="reviewer-initial">E</span>
              <div className="reviewer-info">
                <span className="reviewer-name">ESportsGamer</span>
                <span className="review-date">Dec 2024</span>
              </div>
            </div>
            <p className="review-text">
              "Lightning fast selection automation. Perfect reliability for competitive gaming."
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Optimize Your Selection?</h2>
        <p>Join competitive players using automated selection technology</p>
        <div className="cta-buttons">
          <Link to="/dashboard" className="btn btn--primary btn--large">
            View Agent Locker
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 