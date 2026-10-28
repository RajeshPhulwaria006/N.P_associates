import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../api/client.js';
import SiteLayout from '../components/SiteLayout.jsx';

export default function GuidelinesPage() {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentTopicSlug = searchParams.get('topic');

  useEffect(() => {
    let mounted = true;
    api
      .getGuidelines()
      .then((res) => {
        if (mounted && res?.data) {
          setGuidelines(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || 'Unable to load guidelines');
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const activeGuideline =
    guidelines.find((g) => g.slug === currentTopicSlug) || guidelines[0] || null;

  return (
    <SiteLayout>
      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: 'var(--space-4)' }}>
          <Link to="/">Home</Link> / <span>{t.nav.guidelines}</span>
        </div>

        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1>{t.guidelines.pageTitle}</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem' }}>
            {t.guidelines.pageSubtitle}
          </p>
        </div>

        {loading && <p>Loading guidelines...</p>}

        {error && (
          <div className="callout callout-warning">
            ⚠️ {error}
          </div>
        )}

        {guidelines.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
              alignItems: 'start',
            }}
          >
            {/* Table of contents column */}
            <div className="card" style={{ padding: 'var(--space-4)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-4)' }}>
                {t.guidelines.tableOfContents}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {guidelines.map((g) => {
                  const isActive = activeGuideline && activeGuideline.slug === g.slug;
                  return (
                    <li key={g.slug} style={{ marginBottom: 'var(--space-2)' }}>
                      <button
                        type="button"
                        onClick={() => setSearchParams({ topic: g.slug })}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-button)',
                          backgroundColor: isActive ? '#EEF2FF' : 'transparent',
                          color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                          fontWeight: isActive ? '700' : '400',
                          border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
                          borderLeft: isActive ? '4px solid var(--color-primary)' : '1px solid transparent',
                          fontSize: '0.9rem',
                        }}
                      >
                        {g.title?.[language] || g.title?.en}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Article Reading Area */}
            {activeGuideline && (
              <div
                className="card"
                style={{
                  gridColumn: 'span 2',
                  minHeight: '400px',
                  padding: 'var(--space-8)',
                }}
              >
                <h2 style={{ marginBottom: 'var(--space-3)' }}>
                  {activeGuideline.title?.[language] || activeGuideline.title?.en}
                </h2>

                {activeGuideline.reviewedAt && (
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-muted)',
                      marginBottom: 'var(--space-6)',
                      paddingBottom: 'var(--space-3)',
                      borderBottom: '1px solid var(--color-border)',
                    }}
                  >
                    📅 {t.guidelines.lastReviewed}:{' '}
                    {new Date(activeGuideline.reviewedAt).toLocaleDateString()}
                  </div>
                )}

                <div
                  style={{
                    lineHeight: '1.8',
                    fontSize: '1.05rem',
                    color: 'var(--color-text)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {activeGuideline.content?.[language] || activeGuideline.content?.en}
                </div>

                <div className="callout callout-info" style={{ marginTop: 'var(--space-8)' }}>
                  <strong>Disclaimer:</strong> Guidelines provided are for informational preparation only. Every lending institution adheres to independent risk and compliance guidelines.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
