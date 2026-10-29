import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import Button from './Button.jsx';

export default function AdminLayout({ children, title }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItemStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    color: isActive ? 'var(--color-primary)' : 'var(--color-muted)',
    backgroundColor: isActive ? '#EEF2FF' : 'transparent',
    borderLeft: isActive ? '4px solid var(--color-accent)' : '4px solid transparent',
    textDecoration: 'none',
    fontWeight: isActive ? '700' : '500',
    fontSize: '0.9rem',
    borderRadius: '0 6px 6px 0',
    transition: 'all var(--transition-fast)',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-page-bg)' }}>
      {/* Admin Sidebar */}
      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--color-white)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Admin Header / Monogram */}
          <div
            style={{
              padding: '20px 16px',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-accent)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.9rem',
              }}
            >
              NP
            </div>
            <div>
              <span
                style={{
                  display: 'block',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  color: 'var(--color-primary)',
                }}
              >
                N.P Admin
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
                Portal & Dashboard
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <NavLink to="/admin/dashboard" style={navItemStyle}>
              📊 Overview
            </NavLink>
            <NavLink to="/admin/enquiries" style={navItemStyle}>
              📥 Enquiries
            </NavLink>
            <NavLink to="/admin/content" style={navItemStyle}>
              📝 Services & Guidelines
            </NavLink>
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 16px',
                color: 'var(--color-muted)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                marginTop: '16px',
              }}
            >
              🌐 View Public Site
            </Link>
          </nav>
        </div>

        {/* User Info & Logout */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: '#FAFAFC',
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: '700',
                color: 'var(--color-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {admin?.email}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
              Role: {admin?.role || 'Administrator'}
            </span>
          </div>

          <Button
            variant="secondary"
            onClick={handleLogout}
            style={{ width: '100%', padding: '6px 12px', fontSize: '0.85rem' }}
          >
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header
          style={{
            height: '60px',
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-primary)' }}>
            {title}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
            🔒 Authenticated Session Active
          </span>
        </header>

        {/* Page body */}
        <main style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>{children}</main>
      </div>
    </div>
  );
}
