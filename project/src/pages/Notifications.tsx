import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const getNotifications = (): Notification[] => {
  return JSON.parse(localStorage.getItem('notifications') || '[]');
};

const setNotifications = (notifications: Notification[]) => {
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

const iconByType = {
  success: (
    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ),
  error: (
    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
  ),
  info: (
    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" /></svg>
  ),
};

const Notifications: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifs] = useState<Notification[]>(getNotifications());

  useEffect(() => {
    if (!user) navigate('/login');
    setNotifs(getNotifications());
  }, [user, navigate]);

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifs(updated);
    setNotifications(updated);
  };

  const deleteNotif = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifs(updated);
    setNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifs(updated);
    setNotifications(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <button onClick={markAllAsRead} className="text-sm text-iai-blue hover:underline">Tout marquer comme lu</button>
        </div>
        {notifications.length === 0 ? (
          <div className="text-center text-gray-400 py-16">Aucune notification</div>
        ) : (
          <div className="space-y-4">
            {notifications.map(n => (
              <div key={n.id} className={`flex items-start bg-white rounded-lg shadow p-4 gap-4 border-l-4 ${n.type === 'success' ? 'border-green-600' : n.type === 'error' ? 'border-red-600' : 'border-blue-600'} ${!n.read ? 'opacity-100' : 'opacity-70'}`}>
                <div className="mt-1">{iconByType[n.type]}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className={`font-semibold ${!n.read ? 'text-gray-900' : 'text-gray-500'}`}>{n.title}</h2>
                    <span className="text-xs text-gray-400 ml-2">{new Date(n.date).toLocaleString()}</span>
                  </div>
                  <p className={`text-sm mt-1 ${!n.read ? 'text-gray-700' : 'text-gray-400'}`}>{n.message}</p>
                  {!n.read && (
                    <button onClick={() => markAsRead(n.id)} className="mt-2 text-xs text-iai-blue hover:underline">Marquer comme lu</button>
                  )}
                </div>
                <button onClick={() => deleteNotif(n.id)} className="ml-2 text-gray-400 hover:text-red-600" title="Supprimer">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 