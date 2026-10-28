// Native fetch wrapper with consistent error normalization

const API_BASE = '/api/v1';

export class ApiError extends Error {
  constructor(message, statusCode, code, details = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
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
};
