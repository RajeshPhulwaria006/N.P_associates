import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { api } from '../api/client.js';
import Button from './Button.jsx';
import FormField from './FormField.jsx';

export default function EnquiryForm({ defaultService = '' }) {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: defaultService || '',
    preferredLanguage: language,
    message: '',
    consentGiven: false,
    website: '', // Honeypot field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [serverError, setServerError] = useState('');

  const servicesList = [
    { value: 'home-loan', label: language === 'hi' ? 'गृह ऋण (Home Loan)' : 'Home Loan' },
    { value: 'business-loan', label: language === 'hi' ? 'व्यापार ऋण (Business Loan)' : 'Business Loan' },
    { value: 'personal-loan', label: language === 'hi' ? 'व्यक्तिगत ऋण (Personal Loan)' : 'Personal Loan' },
    { value: 'vehicle-loan', label: language === 'hi' ? 'वाहन ऋण (Vehicle Loan)' : 'Vehicle Loan' },
    { value: 'loan-against-property', label: language === 'hi' ? 'संपत्ति पर ऋण (Loan Against Property)' : 'Loan Against Property' },
    { value: 'other-services', label: language === 'hi' ? 'अन्य वित्तीय सेवाएं (Other Services)' : 'Other Services' },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter your full name';
    }
    if (!formData.phone.trim() || !/^[0-9+\s\-().]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = language === 'hi' ? 'कृपया एक वैध संपर्क नंबर दर्ज करें' : 'Please enter a valid phone number';
    }
    if (!formData.serviceType) {
      newErrors.serviceType = language === 'hi' ? 'कृपया एक ऋण सेवा चुनें' : 'Please select a loan service';
    }
    if (!formData.consentGiven) {
      newErrors.consentGiven =
        language === 'hi'
          ? 'आगे बढ़ने के लिए सहमति देना आवश्यक है'
          : 'You must consent to be contacted regarding this enquiry';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.submitEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        serviceType: formData.serviceType,
        preferredLanguage: formData.preferredLanguage || language,
        message: formData.message.trim(),
        consentGiven: formData.consentGiven,
        website: formData.website, // honeypot
      });

      if (response?.data?.referenceId) {
        setSubmissionSuccess(response.data);
      } else {
        setServerError(t.enquiryForm.errorGeneric);
      }
    } catch (err) {
      setServerError(err.message || t.enquiryForm.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      serviceType: defaultService || '',
      preferredLanguage: language,
      message: '',
      consentGiven: false,
      website: '',
    });
    setSubmissionSuccess(null);
    setErrors({});
    setServerError('');
  };

  if (submissionSuccess) {
    return (
      <div
        className="card"
        style={{
          borderLeft: '5px solid var(--color-success)',
          padding: 'var(--space-6)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#E8F5E9',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            margin: '0 auto var(--space-4) auto',
          }}
        >
          ✓
        </div>
        <h3 style={{ color: 'var(--color-primary)' }}>{t.enquiryForm.successTitle}</h3>
        <p style={{ color: 'var(--color-muted)' }}>{t.enquiryForm.successMessage}</p>

        <div
          style={{
            backgroundColor: 'var(--color-page-bg)',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-button)',
            padding: 'var(--space-4)',
            margin: 'var(--space-4) 0',
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', display: 'block' }}>
            {t.enquiryForm.referenceLabel}
          </span>
          <strong
            style={{
              fontSize: '1.4rem',
              color: 'var(--color-primary)',
              letterSpacing: '1px',
              fontFamily: 'monospace',
            }}
          >
            {submissionSuccess.referenceId}
          </strong>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
          {t.enquiryForm.keepReferenceNote}
        </p>

        <Button variant="secondary" onClick={resetForm} style={{ marginTop: 'var(--space-3)' }}>
          {t.enquiryForm.submitAnother}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 'var(--space-6)' }} noValidate>
      <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--color-primary)' }}>
        {t.enquiryForm.title}
      </h3>

      {serverError && (
        <div
          className="callout callout-warning"
          role="alert"
          style={{
            color: 'var(--color-error)',
            marginBottom: 'var(--space-4)',
            fontSize: '0.9rem',
          }}
        >
          ⚠️ {serverError}
        </div>
      )}

      {/* Honeypot field for anti-spam (hidden from real users) */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <FormField
        id="enquiry-name"
        label={t.enquiryForm.nameLabel}
        required
        error={errors.name}
      >
        <input
          id="enquiry-name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={t.enquiryForm.namePlaceholder}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 'var(--radius-input)',
            border: `1px solid ${errors.name ? 'var(--color-error)' : 'var(--color-border)'}`,
            fontSize: '0.95rem',
          }}
          disabled={isSubmitting}
        />
      </FormField>

      {/* Phone */}
      <FormField
        id="enquiry-phone"
        label={t.enquiryForm.phoneLabel}
        required
        error={errors.phone}
      >
        <input
          id="enquiry-phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder={t.enquiryForm.phonePlaceholder}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 'var(--radius-input)',
            border: `1px solid ${errors.phone ? 'var(--color-error)' : 'var(--color-border)'}`,
            fontSize: '0.95rem',
          }}
          disabled={isSubmitting}
        />
      </FormField>

      {/* Service Type Selection */}
      <FormField
        id="enquiry-service"
        label={t.enquiryForm.serviceLabel}
        required
        error={errors.serviceType}
      >
        <select
          id="enquiry-service"
          value={formData.serviceType}
          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 'var(--radius-input)',
            border: `1px solid ${errors.serviceType ? 'var(--color-error)' : 'var(--color-border)'}`,
            fontSize: '0.95rem',
            backgroundColor: 'var(--color-white)',
          }}
          disabled={isSubmitting}
        >
          <option value="">{t.enquiryForm.selectPlaceholder}</option>
          {servicesList.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </FormField>

      {/* Preferred Language */}
      <FormField
        id="enquiry-lang"
        label={t.enquiryForm.preferredLanguageLabel}
      >
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="preferredLanguage"
              value="en"
              checked={formData.preferredLanguage === 'en'}
              onChange={() => setFormData({ ...formData, preferredLanguage: 'en' })}
              disabled={isSubmitting}
            />
            English
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', cursor: 'pointer' }}>
            <input
              type="radio"
              name="preferredLanguage"
              value="hi"
              checked={formData.preferredLanguage === 'hi'}
              onChange={() => setFormData({ ...formData, preferredLanguage: 'hi' })}
              disabled={isSubmitting}
            />
            हिंदी (Hindi)
          </label>
        </div>
      </FormField>

      {/* Message */}
      <FormField
        id="enquiry-message"
        label={t.enquiryForm.messageLabel}
      >
        <textarea
          id="enquiry-message"
          rows="3"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={t.enquiryForm.messagePlaceholder}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 'var(--radius-input)',
            border: '1px solid var(--color-border)',
            fontSize: '0.95rem',
            resize: 'vertical',
            fontFamily: 'inherit',
          }}
          disabled={isSubmitting}
        />
      </FormField>

      {/* Consent Checkbox */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            fontSize: '0.85rem',
            color: 'var(--color-text)',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={formData.consentGiven}
            onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
            style={{ marginTop: '3px' }}
            disabled={isSubmitting}
          />
          <span>{t.enquiryForm.consentText}</span>
        </label>
        {errors.consentGiven && (
          <p
            role="alert"
            style={{
              margin: 'var(--space-1) 0 0 0',
              fontSize: '0.85rem',
              color: 'var(--color-error)',
              fontWeight: '500',
            }}
          >
            {errors.consentGiven}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="gold"
        disabled={isSubmitting}
        style={{ width: '100%' }}
      >
        {isSubmitting ? t.enquiryForm.submitting : t.enquiryForm.submitButton}
      </Button>
    </form>
  );
}
