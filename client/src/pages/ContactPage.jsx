import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../api/client.js';
import SiteLayout from '../components/SiteLayout.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';

export default function ContactPage() {
  const { t } = useLanguage();
  const [contactInfo, setContactInfo] = useState({
    phone: '7728956389',
    whatsapp: '7728956389',
  });

  useEffect(() => {
    let mounted = true;
    api.getContactInfo()
      .then((res) => {
        if (mounted && res?.data) {
          setContactInfo(res.data);
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  const isPhoneConfigured = contactInfo.phone;
  const isWhatsappConfigured = contactInfo.whatsapp;

  return (
    <SiteLayout>
      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: 'var(--space-4)' }}>
          <Link to="/">Home</Link> / <span>{t.nav.contact}</span>
        </div>

        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1>{t.contact.pageTitle}</h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem' }}>
            {t.contact.pageSubtitle}
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
          {/* Direct channels & business hours */}
          <div>
            <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
              <h3 style={{ marginBottom: 'var(--space-3)' }}>
                {t.contact.directContactHeading}
              </h3>
              <p style={{ color: 'var(--color-muted)', fontSize: '0.95rem' }}>
                {t.contact.directContactDesc}
              </p>

              {/* Phone Link */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: 'var(--space-3) 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontSize: '1.3rem' }}>📞</div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', display: 'block' }}>
                    {t.contact.phoneLabel}
                  </span>
                  {isPhoneConfigured ? (
                    <a
                      href={`tel:${contactInfo.phone}`}
                      style={{ fontWeight: '600', fontSize: '1.05rem' }}
                    >
                      {contactInfo.phone}
                    </a>
                  ) : (
                    <span style={{ fontStyle: 'italic', color: 'var(--color-muted)' }}>
                      To be confirmed by business administrator
                    </span>
                  )}
                </div>
              </div>

              {/* WhatsApp Link */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: 'var(--space-3) 0',
                }}
              >
                <div style={{ fontSize: '1.3rem' }}>💬</div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)', display: 'block' }}>
                    {t.contact.whatsappLabel}
                  </span>
                  {isWhatsappConfigured ? (
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: '600', fontSize: '1.05rem', color: 'var(--color-primary)' }}
                    >
                      Chat on WhatsApp ({contactInfo.whatsapp})
                    </a>
                  ) : (
                    <span style={{ fontStyle: 'italic', color: 'var(--color-muted)' }}>
                      To be confirmed by business administrator
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-2)' }}>{t.contact.hoursHeading}</h3>
              <p style={{ color: 'var(--color-text)', margin: 0, fontSize: '0.95rem' }}>
                {t.contact.hoursDesc}
              </p>
            </div>
          </div>

          {/* Enquiry form column */}
          <div>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
