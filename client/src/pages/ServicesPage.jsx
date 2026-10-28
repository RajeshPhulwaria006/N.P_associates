import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../api/client.js';
import SiteLayout from '../components/SiteLayout.jsx';

export default function ServicesPage() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    api
      .getServices()
      .then((res) => {
        if (mounted && res?.data) {
          setServices(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || 'Unable to load services');
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SiteLayout>
      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: 'var(--space-4)' }}>
          <Link to="/">Home</Link> / <span>{t.nav.services}</span>
        </div>

        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1>{t.services.pageTitle}</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem' }}>
            {t.services.pageSubtitle}
          </p>
        </div>

        {loading && <p>Loading services...</p>}

        {error && (
          <div className="callout callout-warning">
            ⚠️ {error}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {services.map((svc) => (
            <div
              key={svc.slug}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: '#EEF2FF',
                    color: 'var(--color-primary)',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {svc.category}
                </span>
                <h3 style={{ fontSize: '1.3rem', marginBottom: 'var(--space-2)' }}>
                  {svc.title?.[language] || svc.title?.en}
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                  {svc.shortDescription?.[language] || svc.shortDescription?.en}
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                <Link
                  to={`/services/${svc.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '600',
                    color: 'var(--color-primary)',
                    fontSize: '0.9rem',
                  }}
                >
                  {t.home.viewDetails} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
