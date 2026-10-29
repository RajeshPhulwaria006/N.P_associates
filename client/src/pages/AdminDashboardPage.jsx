import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { api } from '../api/client.js';
import AdminLayout from '../components/AdminLayout.jsx';

export default function AdminDashboardPage() {
  const { admin, loading: authLoading } = useAdminAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    if (admin) {
      api
        .getAdminDashboard()
        .then((res) => {
          if (mounted && res?.data) {
            setData(res.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (mounted) {
            setError(err.message || 'Unable to load dashboard data');
            setLoading(false);
          }
        });
    }
    return () => {
      mounted = false;
    };
  }, [admin]);

  if (authLoading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading session...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  const counts = data?.counts || {
    newEnquiries: 0,
    totalEnquiries: 0,
    publishedServices: 0,
    draftServices: 0,
    publishedGuidelines: 0,
  };

  const statCardStyle = {
    backgroundColor: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-card)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  return (
    <AdminLayout title="Dashboard Overview">
      {error && <div className="callout callout-warning">⚠️ {error}</div>}
      {loading && <p>Loading dashboard statistics...</p>}

      {/* Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {/* New Enquiries */}
        <div style={{ ...statCardStyle, borderLeft: '4px solid var(--color-accent)' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: '600' }}>
            NEW ENQUIRIES
          </span>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)', margin: '8px 0' }}>
            {counts.newEnquiries}
          </div>
          <Link to="/admin/enquiries?status=new" style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>
            Review new submissions →
          </Link>
        </div>

        {/* Total Enquiries */}
        <div style={statCardStyle}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: '600' }}>
            TOTAL ENQUIRIES
          </span>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-text)', margin: '8px 0' }}>
            {counts.totalEnquiries}
          </div>
          <Link to="/admin/enquiries" style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>
            View all enquiries →
          </Link>
        </div>

        {/* Published Services */}
        <div style={statCardStyle}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: '600' }}>
            SERVICES
          </span>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)', margin: '8px 0' }}>
            {counts.publishedServices}{' '}
            <span style={{ fontSize: '0.9rem', color: 'var(--color-muted)', fontWeight: '400' }}>
              ({counts.draftServices} draft)
            </span>
          </div>
          <Link to="/admin/content?tab=services" style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>
            Manage loan services →
          </Link>
        </div>

        {/* Published Guidelines */}
        <div style={statCardStyle}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', fontWeight: '600' }}>
            GUIDELINES
          </span>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-primary)', margin: '8px 0' }}>
            {counts.publishedGuidelines}
          </div>
          <Link to="/admin/content?tab=guidelines" style={{ fontSize: '0.85rem', color: 'var(--color-primary)' }}>
            Manage guidelines →
          </Link>
        </div>
      </div>

      {/* Recent Audit Log */}
      <div className="card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-primary)' }}>
          Recent Admin Activity (Audit Log)
        </h3>

        {!data?.recentAuditLogs || data.recentAuditLogs.length === 0 ? (
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            No administrative events recorded yet.
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                <th style={{ padding: '8px' }}>Action</th>
                <th style={{ padding: '8px' }}>Entity</th>
                <th style={{ padding: '8px' }}>Actor</th>
                <th style={{ padding: '8px' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {data.recentAuditLogs.map((log) => (
                <tr key={log._id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '8px', fontWeight: '600', color: 'var(--color-primary)' }}>
                    {log.action}
                  </td>
                  <td style={{ padding: '8px' }}>{log.entityType}</td>
                  <td style={{ padding: '8px', color: 'var(--color-muted)' }}>
                    {log.actorId?.email || 'Admin'}
                  </td>
                  <td style={{ padding: '8px', color: 'var(--color-muted)' }}>
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
