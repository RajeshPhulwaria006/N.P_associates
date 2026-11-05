// Native fetch wrapper with consistent error normalization and CSRF token handling

const API_BASE = 'https://n-p-associates-1.onrender.com/api/v1';

export class ApiError extends Error {
  constructor(message, statusCode, code, details = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

async function getCsrfToken() {
  const res = await fetch(`${API_BASE}/health`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Unable to initialize CSRF protection');
  }

  const token = res.headers.get('X-CSRF-Token');

  if (!token) {
    throw new Error('CSRF token missing from server response');
  }

  return token;
}

export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const method = (options.method || 'GET').toUpperCase();
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];

  if (!safeMethods.includes(method) && !headers['X-CSRF-Token']) {
    headers['X-CSRF-Token'] = await getCsrfToken();
  }

  const config = {
    credentials: 'include', // send session cookies
    ...options,
    headers,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage = data?.error?.message || `Request failed with status ${res.status}`;
      const errorCode = data?.error?.code || 'API_ERROR';
      const details = data?.error?.details || null;
      throw new ApiError(errorMessage, res.status, errorCode, details);
    }

    return data;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(
      err.message || 'Network error or server unreachable. Please check your connection.',
      0,
      'NETWORK_ERROR'
    );
  }
}

// Convenient helpers
export const api = {
  // Public
  getServices: () => apiClient('/services'),
  getServiceBySlug: (slug) => apiClient(`/services/${slug}`),
  getGuidelines: () => apiClient('/guidelines'),
  getGuidelineBySlug: (slug) => apiClient(`/guidelines/${slug}`),
  getContactInfo: () => apiClient('/contact-info'),
  submitEnquiry: (payload) =>
    apiClient('/enquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Admin Auth
  adminLogin: (credentials) =>
    apiClient('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  adminLogout: () =>
    apiClient('/admin/auth/logout', {
      method: 'POST',
    }),
  getAdminMe: () => apiClient('/admin/auth/me'),

  // Admin Operations
  getAdminDashboard: () => apiClient('/admin/dashboard'),
  getAdminEnquiries: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient(`/admin/enquiries${query ? `?${query}` : ''}`);
  },
  getAdminEnquiryById: (id) => apiClient(`/admin/enquiries/${id}`),
  updateAdminEnquiry: (id, payload) =>
    apiClient(`/admin/enquiries/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  getAdminServices: () => apiClient('/admin/services'),
  createAdminService: (payload) =>
    apiClient('/admin/services', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateAdminService: (id, payload) =>
    apiClient(`/admin/services/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  getAdminGuidelines: () => apiClient('/admin/guidelines'),
  createAdminGuideline: (payload) =>
    apiClient('/admin/guidelines', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateAdminGuideline: (id, payload) =>
    apiClient(`/admin/guidelines/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
};
