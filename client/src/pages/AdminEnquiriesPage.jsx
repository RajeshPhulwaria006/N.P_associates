import React, { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { api } from '../api/client.js';
import AdminLayout from '../components/AdminLayout.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import Button from '../components/Button.jsx';

export default function AdminEnquiriesPage() {
  const { admin, loading: authLoading } = useAdminAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [enquiries, setEnquiries] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 15, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Selected Enquiry for Detail / Status Update Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [statusUpdateVal, setStatusUpdateVal] = useState('');
  const [adminNotesVal, setAdminNotesVal] = useState('');
  const [updating, setUpdating] = useState(false);

  const statusFilter = searchParams.get('status') || 'all';
  const page = parseInt(searchParams.get('page'), 10) || 1;
  const search = searchParams.get('search') || '';

  const loadEnquiries = () => {
    setLoading(true);
    api
      .getAdminEnquiries({
        status: statusFilter,
        page,
        search,
      })
      .then((res) => {
        if (res?.data) {
          setEnquiries(res.data.items);
          setPagination(res.data.pagination);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load enquiries');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (admin) {
      loadEnquiries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin, statusFilter, page, search]);

  const handleOpenDetail = (item) => {
    setSelectedEnquiry(item);
    setStatusUpdateVal(item.status);
    setAdminNotesVal(item.adminNotes || '');
  };

  const handleSaveDetail = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await api.updateAdminEnquiry(selectedEnquiry._id, {
        status: statusUpdateVal,
        adminNotes: adminNotesVal,
      });
      if (res?.data) {
        setSelectedEnquiry(null);
        loadEnquiries();
      }
    } catch (err) {
      alert(err.message || 'Failed to update enquiry status/notes');
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading session...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <AdminLayout title="Enquiry Management">
      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '16px',
          marginBottom: '20px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Status Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setSearchParams({ status: e.target.value, page: '1' })}
            style={{
              padding: '6px 10px',
              borderRadius: 'var(--radius-input)',
              border: '1px solid var(--color-border)',
              fontSize: '0.85rem',
            }}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
            <option value="spam">Spam</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1, minWidth: '240px' }}>
          <input
            type="text"
            placeholder="Search by Name, Reference ID, or Phone..."
            defaultValue={search}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSearchParams({ status: statusFilter, search: e.target.value, page: '1' });
              }
            }}
            style={{
              width: '100%',
              padding: '6px 12px',
              borderRadius: 'var(--radius-input)',
              border: '1px solid var(--color-border)',
              fontSize: '0.85rem',
            }}
          />
        </div>
      </div>

      {error && <div className="callout callout-warning">⚠️ {error}</div>}
      {loading && <p>Loading enquiries...</p>}

      {/* Enquiries Table */}
      {!loading && enquiries.length === 0 ? (
        <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--color-muted)' }}>
          No enquiries matching this criteria.
        </div>
      ) : (
        <div className="card" style={{ padding: '0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--color-page-bg)',
                  borderBottom: '1px solid var(--color-border)',
                  textAlign: 'left',
                }}
              >
                <th style={{ padding: '12px 16px' }}>Reference ID</th>
                <th style={{ padding: '12px 16px' }}>Name</th>
                <th style={{ padding: '12px 16px' }}>Phone</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Lang</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Created</th>
                <th style={{ padding: '12px 16px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((item) => (
                <tr
                  key={item._id}
                  style={{
                    borderBottom: '1px solid var(--color-border)',
                    backgroundColor: item.status === 'new' ? '#FBFDFF' : 'transparent',
                  }}
                >
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: '700' }}>
                    {item.referenceId}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '600' }}>{item.name}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <a href={`tel:${item.phone}`} style={{ color: 'var(--color-primary)' }}>
                      {item.phone}
                    </a>
                  </td>
                  <td style={{ padding: '12px 16px' }}>{item.serviceType}</td>
                  <td style={{ padding: '12px 16px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                    {item.preferredLanguage}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <StatusBadge status={item.status} />
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--color-muted)', fontSize: '0.85rem' }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Button
                      variant="secondary"
                      onClick={() => handleOpenDetail(item)}
                      style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                    >
                      View / Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      {pagination.pages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          <Button
            variant="secondary"
            disabled={pagination.page <= 1}
            onClick={() => setSearchParams({ status: statusFilter, search, page: String(pagination.page - 1) })}
          >
            ← Previous
          </Button>
          <span style={{ alignSelf: 'center', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
            Page {pagination.page} of {pagination.pages} ({pagination.total} total)
          </span>
          <Button
            variant="secondary"
            disabled={pagination.page >= pagination.pages}
            onClick={() => setSearchParams({ status: statusFilter, search, page: String(pagination.page + 1) })}
          >
            Next →
          </Button>
        </div>
      )}

      {/* Detail & Status Modal */}
      {selectedEnquiry && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(3, 4, 94, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '560px',
              padding: '24px',
              backgroundColor: 'var(--color-white)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>
                Enquiry Details: {selectedEnquiry.referenceId}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '16px', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <div><strong>Name:</strong> {selectedEnquiry.name}</div>
              <div><strong>Phone:</strong> {selectedEnquiry.phone}</div>
              <div><strong>Service Category:</strong> {selectedEnquiry.serviceType}</div>
              <div><strong>Preferred Language:</strong> {selectedEnquiry.preferredLanguage?.toUpperCase()}</div>
              <div><strong>Submitted At:</strong> {new Date(selectedEnquiry.createdAt).toLocaleString()}</div>
              <div><strong>User Message:</strong> {selectedEnquiry.message || 'None provided'}</div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '16px 0' }} />

            {/* Status Update */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', marginBottom: '4px' }}>
                Update Status:
              </label>
              <select
                value={statusUpdateVal}
                onChange={(e) => setStatusUpdateVal(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-input)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
                <option value="spam">Spam</option>
              </select>
            </div>

            {/* Private Admin Notes */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', fontSize: '0.85rem', marginBottom: '4px' }}>
                Private Internal Notes (Never exposed to customers):
              </label>
              <textarea
                rows="4"
                value={adminNotesVal}
                onChange={(e) => setAdminNotesVal(e.target.value)}
                placeholder="Log internal follow-up steps, call notes, or customer consultation details..."
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-input)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'inherit',
                  fontSize: '0.85rem',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button variant="secondary" onClick={() => setSelectedEnquiry(null)}>
                Cancel
              </Button>
              <Button variant="gold" onClick={handleSaveDetail} disabled={updating}>
                {updating ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
