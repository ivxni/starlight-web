import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlassCard from '../ui/Card/GlassCard';
import styles from './FeaturesSection.module.scss';

const primaryFeatures = [
  {
    icon: 'bolt',
    title: 'Instant Agent Selection',
    description: 'Revolutionary instalock technology with sub-millisecond response times for guaranteed agent selection.',
    highlight: 'Sub-1ms Speed',
    badge: 'Core'
  },
  {
    icon: 'brain',
    title: 'AI Priority System',
    description: 'Advanced artificial intelligence that learns your preferences and optimizes agent selection strategies.',
    highlight: 'Smart Learning',
    badge: 'AI-Powered'
  },
  {
    icon: 'cloud',
    title: 'Cloud-Based Platform',
    description: 'Access your agent locker from any device with our powerful web-based interface and cloud processing.',
    highlight: 'Universal Access',
    badge: 'Cloud'
  }
];

const secondaryFeatures = [
  {
    icon: 'list',
    title: 'Priority Queue Management',
    description: 'Sophisticated queue system that prioritizes your preferred agents automatically.',
    stats: 'Smart Queue'
  },
  {
    icon: 'shield-alt',
    title: 'Secure Infrastructure',
    description: 'Enterprise-grade security with encrypted connections and protected data.',
    stats: '100% Secure'
  },
  {
    icon: 'headset',
    title: 'Expert Support',
    description: 'Dedicated support team with gaming industry experts available 24/7.',
    stats: '24/7 Support'
  },
  {
    icon: 'chart-line',
    title: 'Performance Analytics',
    description: 'Detailed statistics and insights about your agent selection success rates.',
    stats: 'Live Data'
  },
  {
    icon: 'users',
    title: 'Gaming Community',
    description: 'Connect with thousands of competitive gamers using advanced selection tools.',
    stats: '50k+ Users'
  },
  {
    icon: 'award',
    title: 'Industry Leader',
    description: 'The most trusted and reliable agent selection platform in competitive gaming.',
    stats: '#1 Choice'
  }
];

const FeaturesSection = () => {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.badge}>
            <FontAwesomeIcon icon="bolt" />
            <span>Agent Locker Technology</span>
          </div>
          <h2>Revolutionary Agent Selection</h2>
          <p>Experience the most advanced agent locking system with AI-powered prioritization and instant cloud-based selection technology</p>
        </div>
        
        {/* Main Feature Showcase */}
        <div className={styles.mainFeature}>
          <GlassCard variant="hero" size="xl" className={styles.mainFeatureCard}>
            <div className={styles.featureContent}>
              <div className={styles.featureInfo}>
                <div className={styles.featureLabel}>Core Feature</div>
                <h3>Smart Agent Instalock System</h3>
                <p>Revolutionary agent selection automation with intelligent priority queue management and lightning-fast response times for guaranteed agent selection</p>
                
                <div className={styles.subFeatures}>
                  <div className={styles.subFeature}>
                    <FontAwesomeIcon icon="brain" />
                    <div>
                      <h4>AI Priority Learning</h4>
                      <p>Smart algorithms that learn your preferences</p>
                    </div>
                  </div>
                  <div className={styles.subFeature}>
                    <FontAwesomeIcon icon="bolt" />
                    <div>
                      <h4>Instant Selection</h4>
                      <p>Sub-millisecond response times guaranteed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.featureVisual}>
                <div className={styles.agentDemo}>
                  <div className={styles.agentTitle}>Agent Priority Queue</div>
                  <div className={styles.agentList}>
                    <div className={`${styles.agentItem} ${styles.priority1}`}>
                      <div className={styles.agentRank}>1</div>
                      <div className={styles.agentName}>Primary Choice</div>
                      <div className={styles.agentStatus}>READY</div>
                    </div>
                    <div className={`${styles.agentItem} ${styles.priority2}`}>
                      <div className={styles.agentRank}>2</div>
                      <div className={styles.agentName}>Backup Option</div>
                      <div className={styles.agentStatus}>STANDBY</div>
                    </div>
                    <div className={`${styles.agentItem} ${styles.priority3}`}>
                      <div className={styles.agentRank}>3</div>
                      <div className={styles.agentName}>Third Choice</div>
                      <div className={styles.agentStatus}>QUEUE</div>
                    </div>
                  </div>
                  <div className={styles.lockButton}>
                    <FontAwesomeIcon icon="lock" />
                    <span>INSTALOCK ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Secondary Features Grid */}
        <div className={styles.featuresGrid}>
          {primaryFeatures.map((feature, index) => (
            <GlassCard key={index} variant="feature" size="md" className={styles.featureCard}>
              <div className={styles.cardIcon}>
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.featureBadge}>{feature.badge}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className={styles.highlight}>
                  <FontAwesomeIcon icon="check" />
                  <span>{feature.highlight}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom Features */}
        <div className={styles.bottomFeatures}>
          <h3 className={styles.bottomTitle}>Professional Gaming Suite</h3>
          <div className={styles.bottomGrid}>
            {secondaryFeatures.map((feature, index) => (
              <div key={index} className={styles.bottomFeature}>
                <div className={styles.bottomIcon}>
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <div className={styles.bottomContent}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                  <div className={styles.stat}>{feature.stats}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;