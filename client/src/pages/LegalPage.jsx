import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import SiteLayout from '../components/SiteLayout.jsx';

export default function LegalPage() {
  const { t } = useLanguage();
  const location = useLocation();

  // Determine section from pathname: /legal/privacy, /legal/terms, /legal/disclaimer
  const path = location.pathname.toLowerCase();
  const isTerms = path.includes('/terms');
  const isDisclaimer = path.includes('/disclaimer');
  const isPrivacy = !isTerms && !isDisclaimer;

  return (
    <SiteLayout>
      <div className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: 'var(--space-4)' }}>
          <Link to="/">Home</Link> / <span>Legal & Disclosures</span>
        </div>

        {/* Section Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: 'var(--space-8)',
          }}
        >
          <Link
            to="/legal/privacy"
            style={{
              padding: '10px 16px',
              fontWeight: '600',
              color: isPrivacy ? 'var(--color-primary)' : 'var(--color-muted)',
              borderBottom: isPrivacy ? '3px solid var(--color-accent)' : '3px solid transparent',
              textDecoration: 'none',
            }}
          >
            {t.footer.privacyLink}
          </Link>
          <Link
            to="/legal/terms"
            style={{
              padding: '10px 16px',
              fontWeight: '600',
              color: isTerms ? 'var(--color-primary)' : 'var(--color-muted)',
              borderBottom: isTerms ? '3px solid var(--color-accent)' : '3px solid transparent',
              textDecoration: 'none',
            }}
          >
            {t.footer.termsLink}
          </Link>
          <Link
            to="/legal/disclaimer"
            style={{
              padding: '10px 16px',
              fontWeight: '600',
              color: isDisclaimer ? 'var(--color-primary)' : 'var(--color-muted)',
              borderBottom: isDisclaimer ? '3px solid var(--color-accent)' : '3px solid transparent',
              textDecoration: 'none',
            }}
          >
            {t.footer.disclaimerLink}
          </Link>
        </div>

        <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-8)' }}>
          {isPrivacy && (
            <div>
              <h1 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-3)' }}>
                {t.legal.privacyTitle}
              </h1>
              <div className="callout callout-warning">
                ⚠️ {t.legal.privacyNotice}
              </div>
              <h3 style={{ marginTop: 'var(--space-6)' }}>1. Information Collected</h3>
              <p>
                N.P Associates collects contact details provided voluntarily through our enquiry forms, including name, phone number, and loan category preference.
              </p>
              <h3>2. Use of Information</h3>
              <p>
                We use this information exclusively to communicate regarding your consultation request. We do not sell or rent personal information to external marketers.
              </p>
              <h3>3. Sensitive Data Policy</h3>
              <p>
                We do not request or store passwords, Aadhaar numbers, OTPs, or financial account credentials through this public prototype website.
              </p>
            </div>
          )}

          {isTerms && (
            <div>
              <h1 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-3)' }}>
                {t.legal.termsTitle}
              </h1>
              <div className="callout callout-warning">
                ⚠️ {t.legal.privacyNotice}
              </div>
              <h3 style={{ marginTop: 'var(--space-6)' }}>1. Nature of Website</h3>
              <p>
                This website is operated as an informational prototype and lead-generation portal for loan assistance services. It does not provide automated lending or credit approvals.
              </p>
              <h3>2. No Loan Guarantees</h3>
              <p>
                N.P Associates facilitates documentation and procedural guidance. All credit assessments, interest rates, tenure, and sanctions are decided exclusively by regulated banks or financial institutions.
              </p>
              <h3>3. Accuracy of User Information</h3>
              <p>
                Visitors submitting enquiries agree to provide accurate and truthful contact information.
              </p>
            </div>
          )}

          {isDisclaimer && (
            <div>
              <h1 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-3)' }}>
                {t.legal.disclaimerTitle}
              </h1>
              <div className="callout callout-warning" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                <strong>Important Disclosure:</strong> {t.legal.disclaimerNotice}
              </div>
              <h3 style={{ marginTop: 'var(--space-6)' }}>Intermediary Role</h3>
              <p>
                N.P Associates is not an authorized banking licensee, credit bureau, or depository institution. Submission of an enquiry does not constitute loan sanction or disbursement.
              </p>
              <h3>Third-Party Lenders</h3>
              <p>
                Specific institutional logos, names, or interest rates displayed on external documentation belong solely to their respective copyright holders.
              </p>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
