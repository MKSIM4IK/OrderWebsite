import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/OrderList.css';
import { useTranslation } from '../i18n';

function OrderList() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(t('common.failed_fetch'));
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); 
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const getStatusBadge = (status) => {
    if (status === 'accepted') {
      return <span className="badge badge-accepted">{t('orderList.badge_accepted')}</span>;
    }
    return <span className="badge badge-new">{t('orderList.badge_new')}</span>;
  };

  const getWorkStatusBadge = (workStatus) => {
    const statusMap = {
      'not_done': { label: t('dashboard.not_done'), className: 'badge-work-not-done' },
      'in_progress': { label: t('dashboard.in_progress'), className: 'badge-work-progress' },
      'done': { label: t('dashboard.done'), className: 'badge-work-done' }
    };

    const status = statusMap[workStatus] || statusMap['not_done'];
    return <span className={`badge-work ${status.className}`}>{status.label}</span>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return <div className="loading-container">{t('common.loading')}</div>;
  }

  return (
    <div className="order-list-container">
      <div className="order-list-wrapper">
        <h1>{t('orderList.title')}</h1>
        <p className="subtitle">{t('orderList.subtitle')}</p>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>{t('orderList.no_orders')}</p>
            <a href="/" className="btn-link">{t('orderList.submit_request')}</a>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order.id} className={`order-card order-${order.status}`}>
                <div className="order-header">
                  <div className="order-id">Order #{order.id}</div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="order-content">
                  <div className="order-info">
                    <div className="info-item">
                      <strong>{t('orderList.client')}:</strong>
                      <span>{order.client_name}</span>
                    </div>
                    <div className="info-item">
                      <strong>{t('orderList.phone')}:</strong>
                      <span>{order.phone}</span>
                    </div>
                    <div className="info-item">
                      <strong>{t('orderList.description')}:</strong>
                      <p className="description-text">{order.description}</p>
                    </div>
                    <div className="info-item">
                      <strong>{t('orderList.submitted')}:</strong>
                      <span className="time">{formatDate(order.created_at)}</span>
                    </div>
                    {order.accepted_at && (
                      <div className="info-item">
                        <strong>{t('orderList.accepted')}:</strong>
                        <span className="time">{formatDate(order.accepted_at)}</span>
                      </div>
                    )}
                    <div className="info-item">
                      <strong>{t('orderList.status')}:</strong>
                      {getWorkStatusBadge(order.work_status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderList;
