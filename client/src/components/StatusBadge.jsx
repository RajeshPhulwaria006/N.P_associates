import React from 'react';

export default function StatusBadge({ status }) {
  const statusConfig = {
    new: { label: 'New', bg: '#EEF2FF', color: 'var(--color-primary)' },
    in_progress: { label: 'In Progress', bg: '#FFF8E7', color: '#B45309' },
    contacted: { label: 'Contacted', bg: '#E0F2FE', color: '#0369A1' },
    closed: { label: 'Closed', bg: '#E8F5E9', color: '#166534' },
    spam: { label: 'Spam', bg: '#FEE2E2', color: '#991B1B' },
    published: { label: 'Published', bg: '#E8F5E9', color: '#166534' },
    draft: { label: 'Draft', bg: '#F1F5F9', color: '#475569' },
  };

  const config = statusConfig[status] || {
    label: status,
    bg: '#F1F5F9',
    color: '#475569',
  };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '3px 8px',
        borderRadius: '4px',
        backgroundColor: config.bg,
        color: config.color,
        fontSize: '0.75rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {config.label}
    </span>
  );
}
