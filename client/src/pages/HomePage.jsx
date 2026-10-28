import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../api/client.js';
import SiteLayout from '../components/SiteLayout.jsx';
import Button from '../components/Button.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';

export default function HomePage() {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    let mounted = true;
    api
      .getServices()
      .then((res) => {
        if (mounted && res?.data) setServices(res.data);
      })
      .catch(() => {});

    api
      .getGuidelines()
      .then((res) => {
        if (mounted && res?.data) setGuidelines(res.data);
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: t.home.faq1Q, a: t.home.faq1A },
    { q: t.home.faq2Q, a: t.home.faq2A },
    { q: t.home.faq3Q, a: t.home.faq3A },
    { q: t.home.faq4Q, a: t.home.faq4A },
  ];

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--color-white)',
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-12)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-12)',
              alignItems: 'center',
            }}
          >
            {/* Left Column */}
            <div>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--color-accent)',
                  letterSpacing: '1px',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {t.brand.eyebrow}
              </span>
              <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
                {t.hero.title}
              </h1>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--color-muted)',
                  marginBottom: 'var(--space-8)',
                  lineHeight: '1.6',
                }}
              >
                {t.hero.subtitle}
              </p>

              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Link to="/services">
                  <Button variant="primary">{t.hero.exploreServices}</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="secondary">{t.hero.talkToTeam}</Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Restrained Editorial Visual / Consultation Highlights */}
            <div
              style={{
                backgroundColor: 'var(--color-page-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-card)',
                padding: 'var(--space-8)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '4px',
                  backgroundColor: 'var(--color-accent)',
                  marginBottom: 'var(--space-4)',
                }}
              />
              <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
                Professional Loan Assistance
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem', marginBottom: 'var(--space-4)' }}>
                Helping you navigate loan options with verified documentation checklists and direct enquiry support.
              </p>

              <ul style={{ paddingLeft: '20px', color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li>Pre-application documentation review</li>
                <li>Clear guidance on eligibility parameters</li>
                <li>Intermediary coordination for loan files</li>
              </ul>

              <div
                style={{
                  marginTop: 'var(--space-6)',
                  paddingTop: 'var(--space-4)',
                  borderTop: '1px solid var(--color-border)',
                  fontSize: '0.8rem',
                  color: 'var(--color-muted)',
                }}
              >
                * Note: Final credit decisions and interest rates are determined exclusively by formal lending institutions.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Service Principles */}
      <section
        style={{
          backgroundColor: 'var(--color-white)',
          paddingTop: 'var(--space-8)',
          paddingBottom: 'var(--space-8)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  minWidth: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  marginTop: '2px',
                }}
              >
                ✓
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: 'var(--color-primary)' }}>
                  {t.principles.docGuidanceTitle}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                  {t.principles.docGuidanceDesc}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  minWidth: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  marginTop: '2px',
                }}
              >
                ✓
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: 'var(--color-primary)' }}>
                  {t.principles.transparencyTitle}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                  {t.principles.transparencyDesc}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  minWidth: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.8rem',
                  marginTop: '2px',
                }}
              >
                ✓
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', color: 'var(--color-primary)' }}>
                  {t.principles.personalAssistanceTitle}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                  {t.principles.personalAssistanceDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Services Overview */}
      <section style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <h2 style={{ color: 'var(--color-primary)' }}>{t.home.servicesHeading}</h2>
            <p style={{ color: 'var(--color-muted)', margin: '0 auto' }}>
              {t.home.servicesSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#EEF2FF',
                      color: 'var(--color-primary)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    💼
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)' }}>
                    {svc.title?.[language] || svc.title?.en}
                  </h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                    {svc.shortDescription?.[language] || svc.shortDescription?.en}
                  </p>
                </div>
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <Link
                    to={`/services/${svc.slug}`}
                    style={{
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
      </section>

      {/* How It Works */}
      <section
        style={{
          backgroundColor: 'var(--color-white)',
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-12)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <h2>{t.home.howItWorksHeading}</h2>
            <p style={{ color: 'var(--color-muted)', margin: '0 auto' }}>
              {t.home.howItWorksSubtitle}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  marginBottom: 'var(--space-3)',
                }}
              >
                1
              </div>
              <h4>{t.home.step1Title}</h4>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                {t.home.step1Desc}
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  marginBottom: 'var(--space-3)',
                }}
              >
                2
              </div>
              <h4>{t.home.step2Title}</h4>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                {t.home.step2Desc}
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  marginBottom: 'var(--space-3)',
                }}
              >
                3
              </div>
              <h4>{t.home.step3Title}</h4>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                {t.home.step3Desc}
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  marginBottom: 'var(--space-3)',
                }}
              >
                4
              </div>
              <h4>{t.home.step4Title}</h4>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
                {t.home.step4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guidelines & Enquiry Form Section */}
      <section style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-12)',
              alignItems: 'start',
            }}
          >
            {/* Guidelines Column */}
            <div>
              <h2>{t.home.guidelinesHeading}</h2>
              <p style={{ color: 'var(--color-muted)' }}>{t.home.guidelinesSubtitle}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {guidelines.map((g) => (
                  <div key={g.slug} className="card" style={{ padding: 'var(--space-4)' }}>
                    <h4 style={{ marginBottom: '6px' }}>{g.title?.[language] || g.title?.en}</h4>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-muted)',
                        marginBottom: '8px',
                      }}
                    >
                      {g.content?.[language]?.slice(0, 140) || g.content?.en?.slice(0, 140)}...
                    </p>
                    <Link
                      to={`/guidelines?topic=${g.slug}`}
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        color: 'var(--color-primary)',
                      }}
                    >
                      {t.home.readMore} →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Enquiry Form Column */}
            <div>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section
        style={{
          backgroundColor: 'var(--color-white)',
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-12)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            {t.home.faqHeading}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-button)',
                  overflow: 'hidden',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: 'var(--space-4)',
                    backgroundColor: openFaq === idx ? 'var(--color-page-bg)' : 'var(--color-white)',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: '600',
                    color: 'var(--color-primary)',
                    fontSize: '1rem',
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div
                    style={{
                      padding: 'var(--space-4)',
                      backgroundColor: 'var(--color-white)',
                      fontSize: '0.95rem',
                      color: 'var(--color-text)',
                      borderTop: '1px solid var(--color-border)',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Deep Blue Call to Action */}
      <section
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-white)',
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-12)',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '700px' }}>
          <div
            style={{
              width: '40px',
              height: '3px',
              backgroundColor: 'var(--color-accent)',
              margin: '0 auto var(--space-4) auto',
            }}
          />
          <h2 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-4)' }}>
            {t.home.finalCtaHeading}
          </h2>
          <p
            style={{
              color: '#D2D6E8',
              fontSize: '1.05rem',
              marginBottom: 'var(--space-8)',
              margin: '0 auto var(--space-8) auto',
            }}
          >
            {t.home.finalCtaSubtitle}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact">
              <Button variant="gold">{t.home.sendEnquiry}</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">{t.home.viewContact}</Button>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
