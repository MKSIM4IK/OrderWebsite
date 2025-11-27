import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosConfig';
import '../styles/ClientForm.css';
import { useTranslation } from '../i18n';
import { usePageTitle } from '../usePageTitle';

function ClientForm() {
  const { t } = useTranslation();
  usePageTitle('Request');

  const [formData, setFormData] = useState({
    client_name: '',
    phone: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.client_name.trim() || !formData.phone.trim() || !formData.description.trim()) {
      toast.error(t('common.please_fill_all'));
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post('/api/orders', formData);
      toast.success(t('clientForm.success_message'));
      setSubmitted(true);
      setFormData({ client_name: '', phone: '', description: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit order';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-form-container">
      <div className="form-wrapper">
        <h1>{t('clientForm.title')}</h1>
        <p className="form-subtitle">{t('clientForm.subtitle')}</p>

        {submitted && (
          <div className="success-message">
            ✓ Your request has been submitted! Check your order status on the <a href="/orders">Orders Board</a>.
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="client_name">{t('clientForm.name_label')} *</label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              placeholder={t('clientForm.name_placeholder')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t('clientForm.phone_label')} *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('clientForm.phone_placeholder')}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">{t('clientForm.description_label')} *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t('clientForm.description_placeholder')}
              rows="6"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? t('dashboard.accepting') : t('clientForm.submit')}
          </button>
        </form>

        <div className="info-box">
          <h3>{t('clientForm.how_it_works_title')}</h3>
          <ul>
            {t('clientForm.how_it_works').map((i, idx) => (
              <li key={idx}>• {i}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ClientForm;
