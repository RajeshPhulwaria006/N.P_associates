import React, { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { api } from '../api/client.js';
import AdminLayout from '../components/AdminLayout.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';

export default function AdminContentPage() {
  const { admin, loading: authLoading } = useAdminAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') || 'services';

  const [services, setServices] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Editing state for Service
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    slug: '',
    category: 'home-loan',
    titleEn: '',
    titleHi: '',
    shortDescEn: '',
    shortDescHi: '',
    descEn: '',
    descHi: '',
    status: 'draft',
    sortOrder: 0,
  });

  // Editing state for Guideline
  const [editingGuideline, setEditingGuideline] = useState(null);
  const [guidelineForm, setGuidelineForm] = useState({
    slug: '',
    titleEn: '',
    titleHi: '',
    contentEn: '',
    contentHi: '',
    status: 'draft',
    sortOrder: 0,
  });

  const [saving, setSaving] = useState(false);

  const loadData = () => {
    setLoading(true);
    setError('');
    Promise.all([api.getAdminServices(), api.getAdminGuidelines()])
      .then(([sRes, gRes]) => {
        if (sRes?.data) setServices(sRes.data);
        if (gRes?.data) setGuidelines(gRes.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load content');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (admin) {
      loadData();
    }
  }, [admin]);

  const handleEditService = (s) => {
    setEditingService(s);
    setServiceForm({
      slug: s.slug,
      category: s.category,
      titleEn: s.title?.en || '',
      titleHi: s.title?.hi || '',
      shortDescEn: s.shortDescription?.en || '',
      shortDescHi: s.shortDescription?.hi || '',
      descEn: s.description?.en || '',
      descHi: s.description?.hi || '',
      status: s.status,
      sortOrder: s.sortOrder || 0,
    });
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        slug: serviceForm.slug,
        category: serviceForm.category,
        title: { en: serviceForm.titleEn, hi: serviceForm.titleHi },
        shortDescription: { en: serviceForm.shortDescEn, hi: serviceForm.shortDescHi },
        description: { en: serviceForm.descEn, hi: serviceForm.descHi },
        status: serviceForm.status,
        sortOrder: Number(serviceForm.sortOrder),
      };

      if (editingService?._id) {
        await api.updateAdminService(editingService._id, payload);
      } else {
        await api.createAdminService(payload);
      }
      setEditingService(null);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleEditGuideline = (g) => {
    setEditingGuideline(g);
    setGuidelineForm({
      slug: g.slug,
      titleEn: g.title?.en || '',
      titleHi: g.title?.hi || '',
      contentEn: g.content?.en || '',
      contentHi: g.content?.hi || '',
      status: g.status,
      sortOrder: g.sortOrder || 0,
    });
  };

  const handleSaveGuideline = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        slug: guidelineForm.slug,
        title: { en: guidelineForm.titleEn, hi: guidelineForm.titleHi },
        content: { en: guidelineForm.contentEn, hi: guidelineForm.contentHi },
        status: guidelineForm.status,
        sortOrder: Number(guidelineForm.sortOrder),
      };

      if (editingGuideline?._id) {
        await api.updateAdminGuideline(editingGuideline._id, payload);
      } else {
        await api.createAdminGuideline(payload);
      }
      setEditingGuideline(null);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to save guideline');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading session...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <AdminLayout title="Content Management">
      {/* Sub Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <button
          type="button"
          onClick={() => setSearchParams({ tab: 'services' })}
          style={{
            padding: '10px 16px',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'services' ? '3px solid var(--color-accent)' : '3px solid transparent',
            color: activeTab === 'services' ? 'var(--color-primary)' : 'var(--color-muted)',
            fontWeight: activeTab === 'services' ? '700' : '500',
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          Loan Services ({services.length})
        </button>
        <button
          type="button"
          onClick={() => setSearchParams({ tab: 'guidelines' })}
          style={{
            padding: '10px 16px',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'guidelines' ? '3px solid var(--color-accent)' : '3px solid transparent',
            color: activeTab === 'guidelines' ? 'var(--color-primary)' : 'var(--color-muted)',
            fontWeight: activeTab === 'guidelines' ? '700' : '500',
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          Guidelines ({guidelines.length})
        </button>
      </div>

      {error && <div className="callout callout-warning">⚠️ {error}</div>}
      {loading && <p>Loading records...</p>}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>Configured Loan Services</h3>
            <Button
              variant="primary"
              onClick={() => {
                setEditingService({});
                setServiceForm({
                  slug: '',
                  category: 'home-loan',
                  titleEn: '',
                  titleHi: '',
                  shortDescEn: '',
                  shortDescHi: '',
                  descEn: '',
                  descHi: '',
                  status: 'draft',
                  sortOrder: services.length + 1,
                });
              }}
            >
              + Create New Service
            </Button>
          </div>

          <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-page-bg)', borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px' }}>Title (EN / HI)</th>
                  <th style={{ padding: '12px 16px' }}>Slug</th>
                  <th style={{ padding: '12px 16px' }}>Category</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px' }}>Order</th>
                  <th style={{ padding: '12px 16px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc) => (
                  <tr key={svc._id || svc.slug} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <strong>{svc.title?.en}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{svc.title?.hi}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>{svc.slug}</td>
                    <td style={{ padding: '12px 16px' }}>{svc.category}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <StatusBadge status={svc.status} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>{svc.sortOrder}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <Button
                        variant="secondary"
                        onClick={() => handleEditService(svc)}
                        style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      >
                        Edit / Publish
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Guidelines Tab */}
      {activeTab === 'guidelines' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>Configured Guidelines</h3>
            <Button
              variant="primary"
              onClick={() => {
                setEditingGuideline({});
                setGuidelineForm({
                  slug: '',
                  titleEn: '',
                  titleHi: '',
                  contentEn: '',
                  contentHi: '',
                  status: 'draft',
                  sortOrder: guidelines.length + 1,
                });
              }}
            >
              + Create New Guideline
            </Button>
          </div>

          <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-page-bg)', borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px' }}>Title (EN / HI)</th>
                  <th style={{ padding: '12px 16px' }}>Slug</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                  <th style={{ padding: '12px 16px' }}>Order</th>
                  <th style={{ padding: '12px 16px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {guidelines.map((g) => (
                  <tr key={g._id || g.slug} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <strong>{g.title?.en}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>{g.title?.hi}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>{g.slug}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <StatusBadge status={g.status} />
                    </td>
                    <td style={{ padding: '12px 16px' }}>{g.sortOrder}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <Button
                        variant="secondary"
                        onClick={() => handleEditGuideline(g)}
                        style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      >
                        Edit / Publish
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Service Edit Modal */}
      {editingService && (
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
          <form
            onSubmit={handleSaveService}
            className="card"
            style={{
              width: '100%',
              maxWidth: '650px',
              padding: '24px',
              backgroundColor: 'var(--color-white)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>
                {editingService._id ? 'Edit Loan Service' : 'Create New Loan Service'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField id="svc-slug" label="Slug (URL identifier)" required>
                <input
                  id="svc-slug"
                  value={serviceForm.slug}
                  onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                  required
                />
              </FormField>

              <FormField id="svc-cat" label="Category" required>
                <select
                  id="svc-cat"
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                >
                  <option value="home-loan">Home Loan</option>
                  <option value="business-loan">Business Loan</option>
                  <option value="personal-loan">Personal Loan</option>
                  <option value="vehicle-loan">Vehicle Loan</option>
                  <option value="loan-against-property">Loan Against Property</option>
                  <option value="other-services">Other Services</option>
                </select>
              </FormField>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField id="svc-title-en" label="Title (English)" required>
                <input
                  id="svc-title-en"
                  value={serviceForm.titleEn}
                  onChange={(e) => setServiceForm({ ...serviceForm, titleEn: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                  required
                />
              </FormField>
              <FormField id="svc-title-hi" label="Title (Hindi)" required>
                <input
                  id="svc-title-hi"
                  value={serviceForm.titleHi}
                  onChange={(e) => setServiceForm({ ...serviceForm, titleHi: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                  required
                />
              </FormField>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField id="svc-short-en" label="Short Description (English)" required>
                <textarea
                  id="svc-short-en"
                  rows="2"
                  value={serviceForm.shortDescEn}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDescEn: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'inherit' }}
                  required
                />
              </FormField>
              <FormField id="svc-short-hi" label="Short Description (Hindi)" required>
                <textarea
                  id="svc-short-hi"
                  rows="2"
                  value={serviceForm.shortDescHi}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDescHi: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'inherit' }}
                  required
                />
              </FormField>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField id="svc-desc-en" label="Full Description (English)" required>
                <textarea
                  id="svc-desc-en"
                  rows="4"
                  value={serviceForm.descEn}
                  onChange={(e) => setServiceForm({ ...serviceForm, descEn: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'inherit' }}
                  required
                />
              </FormField>
              <FormField id="svc-desc-hi" label="Full Description (Hindi)" required>
                <textarea
                  id="svc-desc-hi"
                  rows="4"
                  value={serviceForm.descHi}
                  onChange={(e) => setServiceForm({ ...serviceForm, descHi: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'inherit' }}
                  required
                />
              </FormField>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField id="svc-status" label="Publication Status">
                <select
                  id="svc-status"
                  value={serviceForm.status}
                  onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                >
                  <option value="draft">Draft (Unpublished)</option>
                  <option value="published">Published</option>
                </select>
              </FormField>

              <FormField id="svc-order" label="Sort Order">
                <input
                  id="svc-order"
                  type="number"
                  value={serviceForm.sortOrder}
                  onChange={(e) => setServiceForm({ ...serviceForm, sortOrder: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                />
              </FormField>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <Button variant="secondary" onClick={() => setEditingService(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="gold" disabled={saving}>
                {saving ? 'Saving...' : 'Save Service'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Guideline Edit Modal */}
      {editingGuideline && (
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
          <form
            onSubmit={handleSaveGuideline}
            className="card"
            style={{
              width: '100%',
              maxWidth: '650px',
              padding: '24px',
              backgroundColor: 'var(--color-white)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>
                {editingGuideline._id ? 'Edit Guideline' : 'Create New Guideline'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingGuideline(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <FormField id="g-slug" label="Slug (URL identifier)" required>
              <input
                id="g-slug"
                value={guidelineForm.slug}
                onChange={(e) => setGuidelineForm({ ...guidelineForm, slug: e.target.value })}
                style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                required
              />
            </FormField>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField id="g-title-en" label="Title (English)" required>
                <input
                  id="g-title-en"
                  value={guidelineForm.titleEn}
                  onChange={(e) => setGuidelineForm({ ...guidelineForm, titleEn: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                  required
                />
              </FormField>
              <FormField id="g-title-hi" label="Title (Hindi)" required>
                <input
                  id="g-title-hi"
                  value={guidelineForm.titleHi}
                  onChange={(e) => setGuidelineForm({ ...guidelineForm, titleHi: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                  required
                />
              </FormField>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField id="g-content-en" label="Content (English)" required>
                <textarea
                  id="g-content-en"
                  rows="5"
                  value={guidelineForm.contentEn}
                  onChange={(e) => setGuidelineForm({ ...guidelineForm, contentEn: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'inherit' }}
                  required
                />
              </FormField>
              <FormField id="g-content-hi" label="Content (Hindi)" required>
                <textarea
                  id="g-content-hi"
                  rows="5"
                  value={guidelineForm.contentHi}
                  onChange={(e) => setGuidelineForm({ ...guidelineForm, contentHi: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontFamily: 'inherit' }}
                  required
                />
              </FormField>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField id="g-status" label="Publication Status">
                <select
                  id="g-status"
                  value={guidelineForm.status}
                  onChange={(e) => setGuidelineForm({ ...guidelineForm, status: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                >
                  <option value="draft">Draft (Unpublished)</option>
                  <option value="published">Published</option>
                </select>
              </FormField>

              <FormField id="g-order" label="Sort Order">
                <input
                  id="g-order"
                  type="number"
                  value={guidelineForm.sortOrder}
                  onChange={(e) => setGuidelineForm({ ...guidelineForm, sortOrder: e.target.value })}
                  style={{ width: '100%', padding: '8px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                />
              </FormField>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <Button variant="secondary" onClick={() => setEditingGuideline(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="gold" disabled={saving}>
                {saving ? 'Saving...' : 'Save Guideline'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
}
