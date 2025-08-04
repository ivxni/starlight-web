import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord as faDiscordBrand } from '@fortawesome/free-brands-svg-icons';
import GlassCard from '../ui/Card/GlassCard';
import DarkVeil from '../DarkVeil';
import styles from './HeroSection.module.scss';
import logo from '../../assets/img/Logo512.png';

const HeroSection = ({ user, onDiscordLogin }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleSystemRequirements = () => {
    // Scroll to system requirements or show modal
    console.log('Show system requirements');
  };

  return (
    <section className={styles.heroSection}>
      {/* DarkVeil Background for Hero Section */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1,
        pointerEvents: 'none'
      }}>
        <DarkVeil 
          speed={0.5}
          hueShift={0}
          noiseIntensity={0.00}
          scanlineIntensity={0.0}
          scanlineFrequency={0.0}
          warpAmount={0.2}
        />
      </div>
      
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {/* Technology Badge */}
          <div className={styles.techBadge}>
            <FontAwesomeIcon icon="brain" />
            <span>AI-Powered Gaming Technology</span>
          </div>

          {/* Main Hero Content */}
          <div className={styles.mainContent}>
            <div className={styles.leftContent}>
              {/* Logo and Title */}
              <div className={styles.logoSection}>
                <img src={logo} alt="Starlight" className={styles.logo} />
                <h1 className={styles.title}>Starlight</h1>
              </div>

              {/* Tagline */}
              <h2 className={styles.tagline}>
                AI-Powered Agent Selection & Gaming Intelligence
              </h2>

              {/* Description */}
              <p className={styles.description}>
                Revolutionary agent selection automation with advanced AI prioritization 
                and instant cloud-based processing for competitive gaming excellence.
              </p>

              {/* Action Buttons */}
              <div className={styles.actionButtons}>
                <button onClick={handleGetStarted} className={styles.primaryButton}>
                  <span>Explore Solutions</span>
                  <FontAwesomeIcon icon="arrow-right" />
                </button>
                
                <button onClick={handleSystemRequirements} className={styles.secondaryButton}>
                  <FontAwesomeIcon icon="cog" />
                  <span>System Requirements</span>
                </button>
              </div>

              {/* System Info */}
              <div className={styles.systemInfo}>
                <div className={styles.systemBadge}>
                  <FontAwesomeIcon icon="cloud" />
                  <span>Cloud-Based</span>
                </div>
                <div className={styles.systemBadge}>
                  <FontAwesomeIcon icon="globe" />
                  <span>Web Interface</span>
                </div>
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    <FontAwesomeIcon icon="star" />
                    <FontAwesomeIcon icon="star" />
                    <FontAwesomeIcon icon="star" />
                    <FontAwesomeIcon icon="star" />
                    <FontAwesomeIcon icon="star" />
                    <span>5.00</span>
                  </div>
                  <span className={styles.reviews}>1038 reviews</span>
                </div>
              </div>
            </div>

            {/* Right Side - Feature Cards */}
            <div className={styles.rightContent}>
              <div className={styles.featureCards}>
                <GlassCard variant="feature" size="sm" className={styles.featureCard}>
                  <div className={styles.cardIcon}>
                    <FontAwesomeIcon icon="brain" />
                  </div>
                  <h3>AI Prioritization</h3>
                  <p>Intelligent agent selection with advanced priority algorithms</p>
                </GlassCard>

                <GlassCard variant="feature" size="sm" className={styles.featureCard}>
                  <div className={styles.cardIcon}>
                    <FontAwesomeIcon icon="bolt" />
                  </div>
                  <h3>Instant Selection</h3>
                  <p>Lightning-fast agent locking with sub-millisecond response times</p>
                </GlassCard>

                <GlassCard variant="feature" size="sm" className={styles.featureCard}>
                  <div className={styles.cardIcon}>
                    <FontAwesomeIcon icon="cloud" />
                  </div>
                  <h3>Cloud Processing</h3>
                  <p>Web-based interface accessible from any device, anywhere</p>
                </GlassCard>

                <GlassCard variant="feature" size="sm" className={styles.featureCard}>
                  <div className={styles.cardIcon}>
                    <FontAwesomeIcon icon="list" />
                  </div>
                  <h3>Smart Queue</h3>
                  <p>Advanced priority queue system for optimal agent selection</p>
                </GlassCard>

                {/* Interactive Demo Card */}
                <GlassCard variant="feature" size="md" className={styles.demoCard}>
                  <div className={styles.demoHeader}>
                    <FontAwesomeIcon icon="play" />
                    <span>Interactive Demo</span>
                  </div>
                  <p>Experience our interface firsthand</p>
                  <FontAwesomeIcon icon="arrow-right" className={styles.demoArrow} />
                </GlassCard>
              </div>
            </div>
          </div>

          {/* Discord Login for Mobile */}
          {!user && (
            <div className={styles.mobileLogin}>
              <button onClick={onDiscordLogin} className={styles.discordButton}>
                <FontAwesomeIcon icon={faDiscordBrand} />
                <span>Login with Discord</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;