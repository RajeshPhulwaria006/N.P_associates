import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both administrator email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(email.trim(), password);
      if (res?.data?.admin) {
        navigate('/admin/dashboard');
      } else {
        setError('Login failed. Please verify credentials.');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-page-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
      }}
    >
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: 'var(--space-8)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-accent)',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '1.2rem',
              marginBottom: 'var(--space-3)',
            }}
          >
            NP
          </div>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', margin: '0 0 4px 0' }}>
            Admin Portal Login
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', margin: 0 }}>
            N.P Associates content & enquiry administration
          </p>
        </div>

        {error && (
          <div
            className="callout callout-warning"
            role="alert"
            style={{
              color: 'var(--color-error)',
              fontSize: '0.85rem',
              marginBottom: 'var(--space-4)',
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField id="admin-email" label="Administrator Email" required>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@npassociates.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-input)',
                border: '1px solid var(--color-border)',
                fontSize: '0.95rem',
              }}
              disabled={isSubmitting}
            />
          </FormField>

          <FormField id="admin-password" label="Password" required>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-input)',
                border: '1px solid var(--color-border)',
                fontSize: '0.95rem',
              }}
              disabled={isSubmitting}
            />
          </FormField>

          <Button
            type="submit"
            variant="gold"
            disabled={isSubmitting}
            style={{ width: '100%', marginTop: 'var(--space-3)' }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
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
          <Link to="/">← Return to Public Website</Link>
        </div>
      </div>
    </div>
  );
}
