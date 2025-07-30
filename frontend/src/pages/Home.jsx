import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DarkVeil from '../components/DarkVeil';
import logo from '../assets/img/Logo512.png';

const Home = () => {
  return (
    <div className="page">
      <div className="modern-hero">
        <div className="hero-backdrop">
          <DarkVeil 
            hueShift={205}
            noiseIntensity={0.03}
            scanlineIntensity={0.00}
            speed={0.2}
            scanlineFrequency={0.0}
            warpAmount={0.1}
            resolutionScale={1}
          />
        </div>
        
        <div className="hero-content-modern">
          <div className="glass-hero-card">
            <div className="hero-left">
              <div className="hero-logo-container">
                <img src={logo} alt="STARLIGHT" className="hero-logo-modern" />
                <div className="logo-glow"></div>
              </div>
              
              <h1 className="hero-title-modern">STARLIGHT</h1>
              <p className="hero-tagline">Shine bright with STARLIGHT.</p>
              
              <div className="hero-divider"></div>
              
              <p className="hero-description-modern">
                Next-generation automation for competitive gaming.
                <br />
                <span className="text-accent">Lightning fast. Undetectable. Reliable.</span>
              </p>
            </div>
            
            <div className="hero-right">
              <div className="hero-actions">
                <Link to="/agent-locker" className="glass-button glass-button--primary glass-button--large">
                  <FontAwesomeIcon icon="rocket" />
                  <span>Launch Agent Locker</span>
                </Link>
                <Link to="/dashboard" className="glass-button glass-button--secondary">
                  <FontAwesomeIcon icon="compass" />
                  <span>Explore Dashboard</span>
                </Link>
              </div>
              
              <div className="hero-stats-grid">
                <div className="stat-card-mini">
                  <FontAwesomeIcon icon="users" className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">500+</span>
                    <span className="stat-label">Active Users</span>
                  </div>
                </div>
                <div className="stat-card-mini">
                  <FontAwesomeIcon icon="chart-line" className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">99.9%</span>
                    <span className="stat-label">Success Rate</span>
                  </div>
                </div>
                <div className="stat-card-mini">
                  <FontAwesomeIcon icon="headset" className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">24/7</span>
                    <span className="stat-label">Live Support</span>
                  </div>
                </div>
                <div className="stat-card-mini">
                  <FontAwesomeIcon icon="shield-alt" className="stat-icon" />
                  <div className="stat-content">
                    <span className="stat-value">100%</span>
                    <span className="stat-label">Undetected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="modern-features">
        <div className="section-header-modern">
          <h2 className="section-title-modern">Why STARLIGHT?</h2>
          <p className="section-subtitle-modern">Experience the future of gaming automation</p>
        </div>
        
        <div className="glass-features-grid">
          <div className="glass-feature-card">
            <div className="feature-icon-container">
              <FontAwesomeIcon icon="bolt" className="feature-icon-modern" />
            </div>
            <h3>Lightning Fast</h3>
            <p>Sub-10ms response time for instant selections</p>
            <div className="feature-accent"></div>
          </div>
          
          <div className="glass-feature-card">
            <div className="feature-icon-container">
              <FontAwesomeIcon icon="shield-alt" className="feature-icon-modern" />
            </div>
            <h3>Undetectable</h3>
            <p>Advanced stealth technology keeps you safe</p>
            <div className="feature-accent"></div>
          </div>
          
          <div className="glass-feature-card">
            <div className="feature-icon-container">
              <FontAwesomeIcon icon="brain" className="feature-icon-modern" />
            </div>
            <h3>Smart AI</h3>
            <p>Intelligent priority system with auto-fallback</p>
            <div className="feature-accent"></div>
          </div>
          
          <div className="glass-feature-card">
            <div className="feature-icon-container">
              <FontAwesomeIcon icon="sliders-h" className="feature-icon-modern" />
            </div>
            <h3>Customizable</h3>
            <p>Full control over your selection preferences</p>
            <div className="feature-accent"></div>
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <div className="modern-showcase">
        <div className="section-header-modern">
          <h2 className="section-title-modern">Agent Locker System</h2>
          <p className="section-subtitle-modern">See it in action</p>
        </div>
        
        <div className="glass-showcase-container">
          <div className="glass-showcase-card">
            <div className="showcase-header">
              <div className="showcase-status">
                <div className="status-dot-live"></div>
                <span>LIVE DEMO</span>
              </div>
              <div className="showcase-title">Priority Configuration</div>
            </div>
            
            <div className="showcase-content">
              <div className="priority-demo-modern">
                <div className="priority-slot active-slot">
                  <div className="priority-number">1</div>
                  <div className="priority-info">
                    <span className="priority-label">PRIMARY</span>
                    <span className="priority-status locked">LOCKED</span>
                  </div>
                  <div className="priority-indicator"></div>
                </div>
                
                <div className="priority-slot">
                  <div className="priority-number">2</div>
                  <div className="priority-info">
                    <span className="priority-label">SECONDARY</span>
                    <span className="priority-status">READY</span>
                  </div>
                  <div className="priority-indicator"></div>
                </div>
                
                <div className="priority-slot">
                  <div className="priority-number">3</div>
                  <div className="priority-info">
                    <span className="priority-label">TERTIARY</span>
                    <span className="priority-status">READY</span>
                  </div>
                  <div className="priority-indicator"></div>
                </div>
              </div>
              
              <div className="showcase-features">
                <div className="showcase-feature">
                  <FontAwesomeIcon icon="check-circle" className="check-icon" />
                  <span>Auto-detect selection phase</span>
                </div>
                <div className="showcase-feature">
                  <FontAwesomeIcon icon="check-circle" className="check-icon" />
                  <span>Instant lock on availability</span>
                </div>
                <div className="showcase-feature">
                  <FontAwesomeIcon icon="check-circle" className="check-icon" />
                  <span>Smart fallback system</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="modern-testimonials">
        <div className="section-header-modern">
          <h2 className="section-title-modern">Community Feedback</h2>
          <p className="section-subtitle-modern">Trusted by competitive gamers worldwide</p>
        </div>
        
        <div className="glass-testimonials-grid">
          <div className="glass-testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Never miss my main again. The speed is incredible and it works flawlessly every single time.
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">R</div>
              <div className="author-info">
                <span className="author-name">RadiantPlayer</span>
                <span className="author-rank">Immortal 3</span>
              </div>
            </div>
          </div>
          
          <div className="glass-testimonial-card glass-card--accent">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Game changer! The priority system ensures I always get my preferred pick or the next best option.
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">A</div>
              <div className="author-info">
                <span className="author-name">AceGamer</span>
                <span className="author-rank">Diamond 2</span>
              </div>
            </div>
          </div>
          
          <div className="glass-testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Professional grade tool. The stealth technology is unmatched and support is always helpful.
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">P</div>
              <div className="author-info">
                <span className="author-name">ProPlayer</span>
                <span className="author-rank">Radiant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="modern-cta">
        <div className="glass-cta-card">
          <h2 className="cta-title-modern">Ready to Dominate?</h2>
          <p className="cta-subtitle-modern">
            Join the elite gamers using STARLIGHT for consistent victories
          </p>
          
          <div className="cta-features-grid">
            <div className="cta-feature">
              <FontAwesomeIcon icon="check" className="cta-check" />
              <span>Instant Setup</span>
            </div>
            <div className="cta-feature">
              <FontAwesomeIcon icon="check" className="cta-check" />
              <span>24/7 Support</span>
            </div>
            <div className="cta-feature">
              <FontAwesomeIcon icon="check" className="cta-check" />
              <span>Regular Updates</span>
            </div>
          </div>
          
          <div className="cta-actions">
            <Link to="/agent-locker" className="glass-button glass-button--large glass-button--primary">
              <FontAwesomeIcon icon="gamepad" />
              <span>Start Now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 