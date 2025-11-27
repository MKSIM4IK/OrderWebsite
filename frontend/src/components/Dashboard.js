import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosConfig';
import '../styles/Dashboard.css';
import { useTranslation } from '../i18n';
import { usePageTitle } from '../usePageTitle';

function Dashboard() {
  const { t } = useTranslation();
  usePageTitle('Dashboard');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingOrderId, setAcceptingOrderId] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [deleteConfirmOrderId, setDeleteConfirmOrderId] = useState(null);
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const username = localStorage.getItem('username');

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/api/orders');
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

  const acceptOrder = async (orderId) => {
    setAcceptingOrderId(orderId);
    try {
      await axiosInstance.post(
        `/api/orders/${orderId}/accept`,
        {}
      );

      toast.success(`${t('dashboard.accepted_badge')} #${orderId}`);
      fetchOrders();
    } catch (error) {
      const message = error.response?.data?.message || t('common.failed_accept');
      toast.error(message);
    } finally {
      setAcceptingOrderId(null);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingStatusId(orderId);
    try {
      await axiosInstance.put(
        `/api/orders/${orderId}/work-status`,
        { work_status: newStatus }
      );

      toast.success(t(`dashboard.${newStatus}`));
      
      // If marking as done, show delete confirmation
      if (newStatus === 'done') {
        setDeleteConfirmOrderId(orderId);
      } else {
        fetchOrders();
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Error updating status';
      toast.error(message);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const deleteOrder = async (orderId) => {
    setDeletingOrderId(orderId);
    try {
      await axiosInstance.delete(
        `/api/orders/${orderId}`
      );

      toast.success('Order deleted');
      setDeleteConfirmOrderId(null);
      fetchOrders();
    } catch (error) {
      const message = error.response?.data?.message || 'Error deleting order';
      toast.error(message);
    } finally {
      setDeletingOrderId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const newOrders = orders.filter(order => order.status === 'new');
  const acceptedOrders = orders.filter(order => order.status === 'accepted');

  if (loading) {
    return <div className="loading-container">{t('common.loading')}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1>{t('dashboard.title')}</h1>
          <p className="welcome">{t('dashboard.welcome')}, <strong>{username}</strong></p>
        </div>

        <div className="orders-stats">
          <div className="stat-card">
            <div className="stat-number">{newOrders.length}</div>
            <div className="stat-label">{t('dashboard.new_orders')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{acceptedOrders.length}</div>
            <div className="stat-label">{t('dashboard.accepted_orders')}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{orders.length}</div>
            <div className="stat-label">{t('dashboard.total_orders')}</div>
          </div>
        </div>

        <div className="orders-section">
          <h2>{t('dashboard.new_orders')}</h2>
          {newOrders.length === 0 ? (
            <div className="no-orders-message">
              {t('dashboard.no_new_orders')}
            </div>
          ) : (
            <div className="orders-list">
              {newOrders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-main-info">
                    <div className="order-id-badge">#{order.id}</div>
                    <div className="order-details">
                      <h3>{order.client_name}</h3>
                      <p className="phone">📞 {order.phone}</p>
                      <p className="description">{order.description}</p>
                      <p className="timestamp">{t('clientForm.submitted_label')}: {formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  <button
                    className="accept-btn"
                    onClick={() => acceptOrder(order.id)}
                    disabled={acceptingOrderId === order.id}
                  >
                    {acceptingOrderId === order.id ? t('dashboard.accepting') : `${t('dashboard.accept')}`}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {acceptedOrders.length > 0 && (
          <div className="orders-section">
            <h2>{t('dashboard.accepted_orders')}</h2>
            <div className="orders-list">
              {acceptedOrders.map(order => (
                <div key={order.id} className="order-item accepted">
                  <div className="order-main-info">
                    <div className="order-id-badge accepted">#{order.id}</div>
                    <div className="order-details">
                      <h3>{order.client_name}</h3>
                      <p className="phone">📞 {order.phone}</p>
                      <p className="description">{order.description}</p>
                      <p className="timestamp">{t('clientForm.submitted_label')}: {formatDate(order.created_at)}</p>
                      <p className="timestamp accepted-time">{t('clientForm.accepted_label')}: {formatDate(order.accepted_at)}</p>
                      
                      {/* Status Dropdown */}
                      <div className="status-control">
                        <label className="status-label">{t('dashboard.mark_done')}:</label>
                        <select 
                          className="status-dropdown"
                          value={order.work_status || 'not_done'}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          disabled={updatingStatusId === order.id}
                        >
                          <option value="not_done">{t('dashboard.not_done')}</option>
                          <option value="in_progress">{t('dashboard.in_progress')}</option>
                          <option value="done">{t('dashboard.done')}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="accepted-actions">
                    <div className="accepted-badge">✓ Accepted</div>
                    <button
                      className="delete-btn"
                      onClick={() => setDeleteConfirmOrderId(order.id)}
                      title={t('dashboard.delete_option')}
                    >
                      🗑️ {t('dashboard.delete')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirmOrderId && (
          <div className="modal-overlay" onClick={() => setDeleteConfirmOrderId(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{t('dashboard.confirm_delete')}</h3>
              <div className="modal-actions">
                <button
                  className="modal-btn modal-yes"
                  onClick={() => deleteOrder(deleteConfirmOrderId)}
                  disabled={deletingOrderId === deleteConfirmOrderId}
                >
                  {deletingOrderId === deleteConfirmOrderId ? t('common.loading') : t('dashboard.delete')}
                </button>
                <button
                  className="modal-btn modal-no"
                  onClick={() => setDeleteConfirmOrderId(null)}
                  disabled={deletingOrderId === deleteConfirmOrderId}
                >
                  {t('dashboard.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
