import React from 'react';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/FeaturesSection';
import StatsSection from '../../components/StatsSection';
import styles from './Home.module.scss';

const Home = ({ user }) => {
  const handleDiscordLogin = () => {
    // This would redirect to backend Discord OAuth endpoint
    console.log('Discord login clicked - implement OAuth flow');
    // window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/auth/discord`;
  };

  return (
    <div className={styles.homePage}>
      <HeroSection user={user} onDiscordLogin={handleDiscordLogin} />
      <FeaturesSection />
      <StatsSection />
    </div>
  );
};

export default Home;