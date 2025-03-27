
import { toast as sonnerToast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    sonnerToast.success(message, options);
  },
  
  error: (message: string, options?: ToastOptions) => {
    sonnerToast.error(message, options);
  },
  
  info: (message: string, options?: ToastOptions) => {
    sonnerToast.info(message, options);
  },
  
  warning: (message: string, options?: ToastOptions) => {
    sonnerToast.warning(message, options);
  },
  
  custom: (
    title: string,
    description?: string,
    type: ToastType = 'info',
    duration = 5000
  ) => {
    switch (type) {
      case 'success':
        sonnerToast.success(title, { description, duration });
        break;
      case 'error':
        sonnerToast.error(title, { description, duration });
        break;
      case 'warning':
        sonnerToast.warning(title, { description, duration });
        break;
      default:
        sonnerToast.info(title, { description, duration });
    }
  },
  
  dismiss: () => {
    sonnerToast.dismiss();
  }
};
