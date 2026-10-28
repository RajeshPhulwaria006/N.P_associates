import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import SiteLayout from '../components/SiteLayout.jsx';
import Button from '../components/Button.jsx';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <SiteLayout>
      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: 'var(--space-4)' }}>
          <Link to="/">Home</Link> / <span>{t.nav.about}</span>
        </div>

        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h1 style={{ marginBottom: 'var(--space-4)' }}>{t.home.aboutHeading}</h1>

          <div className="card" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              {t.home.aboutP1}
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
              {t.home.aboutP2}
            </p>

            <div className="callout callout-warning" style={{ marginTop: 'var(--space-6)' }}>
              <strong>Notice:</strong> {t.home.aboutDisclaimer}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-8)',
            }}
          >
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                {t.principles.docGuidanceTitle}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                {t.principles.docGuidanceDesc}
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                {t.principles.transparencyTitle}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                {t.principles.transparencyDesc}
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>
                {t.principles.personalAssistanceTitle}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                {t.principles.personalAssistanceDesc}
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/contact">
              <Button variant="primary">{t.nav.enquireNow}</Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
