import React from 'react';

export default function FormField({
  id,
  label,
  error,
  helperText,
  required = false,
  children,
}) {
  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            marginBottom: 'var(--space-1)',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          {label} {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
        </label>
      )}

      {children}

      {helperText && !error && (
        <p
          style={{
            margin: 'var(--space-1) 0 0 0',
            fontSize: '0.8rem',
            color: 'var(--color-muted)',
          }}
        >
          {helperText}
        </p>
      )}

      {error && (
        <p
          role="alert"
          style={{
            margin: 'var(--space-1) 0 0 0',
            fontSize: '0.85rem',
            color: 'var(--color-error)',
            fontWeight: '500',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
