import React from 'react';
import styles from './Footer.module.scss';
import logo from '../../assets/img/Logo512.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <img src={logo} alt="Starlight" className={styles.footerLogo} />
        <p className={styles.footerText}>
          All rights reserved. © 2025 STARLIGHT
        </p>
      </div>
    </footer>
  );
};

export default Footer;