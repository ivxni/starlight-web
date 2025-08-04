import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GlassCard from '../ui/Card/GlassCard';
import styles from './StatsSection.module.scss';

const stats = [
  {
    icon: 'bolt',
    value: '99.8%',
    label: 'Selection Rate',
    description: 'Agent Lock Success'
  },
  {
    icon: 'users',
    value: '50k+',
    label: 'Active Users',
    description: 'Gaming Community'
  },
  {
    icon: 'clock',
    value: '<1ms',
    label: 'Response Time',
    description: 'Instalock Speed'
  },
  {
    icon: 'cloud',
    value: '24/7',
    label: 'Cloud Access',
    description: 'Always Available'
  }
];

const StatsSection = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <GlassCard key={index} variant="stat" size="md" className={styles.statCard}>
              <div className={styles.statIcon}>
                <FontAwesomeIcon icon={stat.icon} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statDescription}>{stat.description}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;