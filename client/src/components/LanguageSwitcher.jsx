import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label="Switch Language / भाषा बदलें"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        fontSize: '0.85rem',
        fontWeight: '600',
        color: 'var(--color-primary)',
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-button)',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
      }}
      title={language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
    >
      <span style={{ color: language === 'en' ? 'var(--color-primary)' : 'var(--color-muted)' }}>
        EN
      </span>
      <span style={{ margin: '0 4px', color: 'var(--color-border)' }}>/</span>
      <span
        style={{
          color: language === 'hi' ? 'var(--color-primary)' : 'var(--color-muted)',
          fontFamily: 'var(--font-family-hindi)',
        }}
      >
        हिं
      </span>
    </button>
  );
}
