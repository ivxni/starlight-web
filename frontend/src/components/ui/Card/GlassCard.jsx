import React from 'react';
import './GlassCard.css';

const GlassCard = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '',
  style = {},
  ...props 
}) => {
  const cardClasses = [
    'glass-card',
    `glass-card--${variant}`,
    `glass-card--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses} 
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;