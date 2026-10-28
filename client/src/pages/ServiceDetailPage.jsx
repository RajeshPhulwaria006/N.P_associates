import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../api/client.js';
import SiteLayout from '../components/SiteLayout.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');

    api
      .getServiceBySlug(slug)
      .then((res) => {
        if (mounted && res?.data) {
          setService(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || 'Service not found');
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="container" style={{ padding: 'var(--space-12) 0' }}>
          <p>Loading service information...</p>
        </div>
      </SiteLayout>
    );
  }

  if (error || !service) {
    return (
      <SiteLayout>
        <div className="container" style={{ padding: 'var(--space-12) 0' }}>
          <div className="callout callout-warning">
            ⚠️ {error || 'Requested service could not be found.'}
          </div>
          <Link to="/services">← Back to all services</Link>
        </div>
      </SiteLayout>
    );
  }

  const eligibilityList = service.eligibility?.[language]?.length
    ? service.eligibility[language]
    : service.eligibility?.en || [];

  const documentsList = service.documents?.[language]?.length
    ? service.documents[language]
    : service.documents?.en || [];

  return (
    <SiteLayout>
      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: 'var(--space-4)' }}>
          <Link to="/">Home</Link> / <Link to="/services">{t.nav.services}</Link> /{' '}
          <span>{service.title?.[language] || service.title?.en}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ marginBottom: 'var(--space-2)' }}>
            {service.title?.[language] || service.title?.en}
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-muted)' }}>
            {service.shortDescription?.[language] || service.shortDescription?.en}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-12)',
            alignItems: 'start',
          }}
        >
          {/* Main Details Column */}
          <div>
            {/* Overview */}
            <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
              <h3 style={{ marginBottom: 'var(--space-3)' }}>Overview</h3>
              <p style={{ lineHeight: '1.7', color: 'var(--color-text)' }}>
                {service.description?.[language] || service.description?.en}
              </p>
            </div>

            {/* General Eligibility Considerations */}
            {eligibilityList.length > 0 && (
              <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>
                  {t.services.eligibilityTitle}
                </h3>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                  {eligibilityList.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Documentation Checklist */}
            {documentsList.length > 0 && (
              <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>
                  {t.services.documentsTitle}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
                  * This is an informational checklist. Lending institutions may request additional documentation.
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                  {documentsList.map((doc, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Important Conditions Notice */}
            <div className="callout callout-warning">
              <h4 style={{ margin: '0 0 6px 0', color: 'var(--color-primary)' }}>
                {t.services.importantConditionsTitle}
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text)' }}>
                {t.services.conditionsNotice}
              </p>
            </div>
          </div>

          {/* Sticky Sidebar Form Column */}
          <div>
            <div style={{ position: 'sticky', top: '90px' }}>
              <EnquiryForm defaultService={service.category} />
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
