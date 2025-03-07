
import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertMessageProps {
  type: AlertType;
  title: string;
  message?: string;
  className?: string;
  onClose?: () => void;
}

const alertStyles = {
  success: {
    container: 'bg-green-50 border-green-500 text-green-900',
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    closeButton: 'text-green-500 hover:bg-green-100'
  },
  error: {
    container: 'bg-red-50 border-red-500 text-red-900',
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    closeButton: 'text-red-500 hover:bg-red-100'
  },
  warning: {
    container: 'bg-amber-50 border-amber-500 text-amber-900',
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    closeButton: 'text-amber-500 hover:bg-amber-100'
  },
  info: {
    container: 'bg-blue-50 border-blue-500 text-blue-900',
    icon: <Info className="h-5 w-5 text-blue-500" />,
    closeButton: 'text-blue-500 hover:bg-blue-100'
  }
};

export const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  title,
  message,
  className,
  onClose
}) => {
  const styles = alertStyles[type];

  return (
    <div 
      className={cn(
        'border-l-4 p-4 rounded-r-md shadow-sm relative animate-in fade-in-0 slide-in-from-top-5 duration-300',
        styles.container,
        className
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 pt-0.5">
          {styles.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
        </div>
        {onClose && (
          <button
            type="button"
            className={cn(
              "p-1.5 rounded-full ml-4",
              styles.closeButton
            )}
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertMessage;
