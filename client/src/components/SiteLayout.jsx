import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function SiteLayout({ children }) {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkStyle = ({ isActive }) => ({
    padding: '8px 12px',
    color: 'var(--color-primary)',
    fontWeight: '500',
    fontSize: '0.95rem',
    textDecoration: 'none',
    borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
    transition: 'all var(--transition-fast)',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Banner Notice */}
      <div
        style={{
          backgroundColor: '#02033B',
          color: '#E0E3ED',
          fontSize: '0.8rem',
          padding: '6px 16px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <span style={{ color: 'var(--color-accent)', fontWeight: '600' }}>[Notice]</span>{' '}
        {t.hero.disclaimerNotice}
      </div>

      {/* Navbar */}
      <header
        style={{
          backgroundColor: 'var(--color-white)',
          borderBottom: '1px solid var(--color-border)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
          }}
        >
          {/* Brand Wordmark with subtle geometric monogram */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-white)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.1rem',
                borderBottom: '3px solid var(--color-accent)',
              }}
            >
              NP
            </div>
            <div>
              <span
                style={{
                  display: 'block',
                  color: 'var(--color-primary)',
                  fontWeight: '700',
                  fontSize: '1.2rem',
                  lineHeight: '1.1',
                }}
              >
                {t.brand.name}
              </span>
              <span
                style={{
                  display: 'block',
                  color: 'var(--color-muted)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.5px',
                }}
              >
                {t.brand.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '8px',
            }}
            className="desktop-nav"
          >
            <NavLink to="/" style={navLinkStyle}>
              {t.nav.home}
            </NavLink>
            <NavLink to="/services" style={navLinkStyle}>
              {t.nav.services}
            </NavLink>
            <NavLink to="/guidelines" style={navLinkStyle}>
              {t.nav.guidelines}
            </NavLink>
            <NavLink to="/about" style={navLinkStyle}>
              {t.nav.about}
            </NavLink>
            <NavLink to="/contact" style={navLinkStyle}>
              {t.nav.contact}
            </NavLink>
          </nav>

          {/* Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <LanguageSwitcher />

            <Link
              to="/contact"
              style={{
                display: 'none',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
                padding: '8px 16px',
                borderRadius: 'var(--radius-button)',
                fontSize: '0.9rem',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'opacity var(--transition-fast)',
              }}
              className="desktop-cta"
            >
              {t.nav.enquireNow}
            </Link>

            {/* Mobile menu hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              style={{
                display: 'inline-flex',
                background: 'none',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-button)',
                padding: '6px 10px',
                color: 'var(--color-primary)',
                fontSize: '1.2rem',
              }}
              className="mobile-toggle"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-white)',
              padding: '16px',
            }}
            className="mobile-menu"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'var(--color-primary)', fontWeight: '500' }}
              >
                {t.nav.home}
              </Link>
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'var(--color-primary)', fontWeight: '500' }}
              >
                {t.nav.services}
              </Link>
              <Link
                to="/guidelines"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'var(--color-primary)', fontWeight: '500' }}
              >
                {t.nav.guidelines}
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'var(--color-primary)', fontWeight: '500' }}
              >
                {t.nav.about}
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{ color: 'var(--color-primary)', fontWeight: '500' }}
              >
                {t.nav.contact}
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: 'var(--radius-button)',
                  fontWeight: '600',
                  marginTop: '8px',
                }}
              >
                {t.nav.enquireNow}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'var(--color-primary)',
          color: '#E0E3ED',
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-8)',
          marginTop: 'var(--space-12)',
          borderTop: '3px solid var(--color-accent)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-8)',
              marginBottom: 'var(--space-8)',
            }}
          >
            {/* Brand column */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: 'var(--space-3)',
                }}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-primary)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                  }}
                >
                  NP
                </div>
                <h3 style={{ color: 'var(--color-white)', margin: 0, fontSize: '1.2rem' }}>
                  {t.brand.name}
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#B0B5C9', lineHeight: '1.5' }}>
                {t.footer.description}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#9095AC', fontStyle: 'italic' }}>
                {t.footer.humanReviewNotice}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-3)' }}>
                {t.footer.quickLinks}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/" style={{ color: '#E0E3ED' }}>
                    {t.nav.home}
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/services" style={{ color: '#E0E3ED' }}>
                    {t.nav.services}
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/guidelines" style={{ color: '#E0E3ED' }}>
                    {t.nav.guidelines}
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/about" style={{ color: '#E0E3ED' }}>
                    {t.nav.about}
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/contact" style={{ color: '#E0E3ED' }}>
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-3)' }}>
                {t.footer.servicesLinks}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/services/home-loans" style={{ color: '#E0E3ED' }}>
                    Home Loans
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/services/business-loans" style={{ color: '#E0E3ED' }}>
                    Business Loans
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/services/personal-loans" style={{ color: '#E0E3ED' }}>
                    Personal Loans
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/services/vehicle-loans" style={{ color: '#E0E3ED' }}>
                    Vehicle Loans
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/services/loan-against-property" style={{ color: '#E0E3ED' }}>
                    Loan Against Property
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 style={{ color: 'var(--color-white)', marginBottom: 'var(--space-3)' }}>
                {t.footer.legalHeading}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/legal/privacy" style={{ color: '#E0E3ED' }}>
                    {t.footer.privacyLink}
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/legal/terms" style={{ color: '#E0E3ED' }}>
                    {t.footer.termsLink}
                  </Link>
                </li>
                <li style={{ marginBottom: '8px' }}>
                  <Link to="/legal/disclaimer" style={{ color: '#E0E3ED' }}>
                    {t.footer.disclaimerLink}
                  </Link>
                </li>
                <li style={{ marginTop: '16px' }}>
                  <Link
                    to="/admin/login"
                    style={{
                      color: 'var(--color-accent)',
                      fontSize: '0.85rem',
                      opacity: 0.85,
                    }}
                  >
                    🔒 {t.footer.adminLink}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: 'var(--space-4)',
              textAlign: 'center',
              fontSize: '0.85rem',
              color: '#8D93A8',
            }}
          >
            © {new Date().getFullYear()} N.P Associates. {t.footer.rightsReserved}
          </div>
        </div>
      </footer>

      {/* Responsive media helper */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
