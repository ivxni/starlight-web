import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './GlossyButton.css';

const GlossyButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon = null, 
  iconPosition = 'left',
  onClick,
  disabled = false,
  className = '',
  ...props 
}) => {
  const buttonClasses = [
    'glossy-btn',
    `glossy-btn--${variant}`,
    `glossy-btn--${size}`,
    disabled && 'glossy-btn--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses} 
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <FontAwesomeIcon icon={icon} className="glossy-btn__icon glossy-btn__icon--left" />
      )}
      <span className="glossy-btn__text">{children}</span>
      {icon && iconPosition === 'right' && (
        <FontAwesomeIcon icon={icon} className="glossy-btn__icon glossy-btn__icon--right" />
      )}
    </button>
  );
};

export default GlossyButton;