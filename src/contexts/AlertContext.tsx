import { createContext, useContext, useState, ReactNode } from 'react';

export interface Alert {
  id: string;
  stockTicker: string;
  horizon: 'hourly' | 'daily';
  confidenceThreshold: number;
  isActive: boolean;
  dateCreated: string;
}

export interface AlertNotification {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info';
  timestamp: string;
  read: boolean;
}

interface AlertContextType {
  alerts: Alert[];
  notifications: AlertNotification[];
  addAlert: (alert: Omit<Alert, 'id' | 'dateCreated'>) => void;
  removeAlert: (alertId: string) => void;
  updateAlert: (alertId: string, updates: Partial<Alert>) => void;
  addNotification: (notification: Omit<AlertNotification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlerts() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
}

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [notifications, setNotifications] = useState<AlertNotification[]>([]);

  const addAlert = (alertData: Omit<Alert, 'id' | 'dateCreated'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      dateCreated: new Date().toISOString(),
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  const removeAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const updateAlert = (alertId: string, updates: Partial<Alert>) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, ...updates } : alert
    ));
  };

  const addNotification = (notificationData: Omit<AlertNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: AlertNotification = {
      ...notificationData,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <AlertContext.Provider value={{
      alerts,
      notifications,
      addAlert,
      removeAlert,
      updateAlert,
      addNotification,
      markNotificationAsRead,
      clearAllNotifications,
    }}>
      {children}
    </AlertContext.Provider>
  );
}