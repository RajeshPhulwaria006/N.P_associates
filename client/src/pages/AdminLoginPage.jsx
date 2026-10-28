import React from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from '../components/SiteLayout.jsx';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';

export default function AdminLoginPage() {
  return (
    <SiteLayout>
      <div
        className="container"
        style={{
          paddingTop: 'var(--space-12)',
          paddingBottom: 'var(--space-16)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="card" style={{ width: '100%', maxWidth: '420px', padding: 'var(--space-8)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <span style={{ fontSize: '2rem' }}>🔒</span>
            <h2 style={{ marginTop: 'var(--space-2)', fontSize: '1.4rem' }}>
              Admin Portal
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
              Protected administrative management interface
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <FormField id="admin-email" label="Administrator Email">
              <input
                id="admin-email"
                type="email"
                placeholder="admin@example.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-input)',
                  border: '1px solid var(--color-border)',
                }}
              />
            </FormField>

            <FormField id="admin-password" label="Password">
              <input
                id="admin-password"
                type="password"
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-input)',
                  border: '1px solid var(--color-border)',
                }}
              />
            </FormField>

            <Button
              variant="primary"
              style={{ width: '100%', marginTop: 'var(--space-2)' }}
              disabled
            >
              Sign In (Active in Stage 4)
            </Button>
          </form>

          <div
            style={{
              marginTop: 'var(--space-6)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--color-border)',
              textAlign: 'center',
              fontSize: '0.85rem',
            }}
          >
            <Link to="/">← Back to Public Website</Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
