import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'gold' | 'outline'
  type = 'button',
  disabled = false,
  onClick,
  style = {},
  className = '',
  ...props
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    fontSize: '0.95rem',
    fontWeight: '600',
    borderRadius: 'var(--radius-button)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.65 : 1,
    transition: 'all var(--transition-fast)',
    textDecoration: 'none',
    lineHeight: 1.4,
    ...style,
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
      borderColor: 'var(--color-primary)',
    },
    // Distinctive gold button with deep-blue text per visual design rules (not white on gold)
    gold: {
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-primary)',
      borderColor: 'var(--color-accent)',
    },
    secondary: {
      backgroundColor: 'var(--color-white)',
      color: 'var(--color-primary)',
      borderColor: 'var(--color-border)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-white)',
      borderColor: 'rgba(255, 255, 255, 0.4)',
    },
  };

  const variantStyle = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{ ...baseStyle, ...variantStyle }}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
