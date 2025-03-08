
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, FileText, User, AlertTriangle, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface ReportAlertProps {
  id: string;
  reporter: string;
  target: string;
  reason: string;
  contentType: 'message' | 'post' | 'comment' | 'profile';
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}

export const ReportAlert: React.FC<ReportAlertProps> = ({
  id,
  reporter,
  target,
  reason,
  contentType,
  timestamp,
  severity
}) => {
  const { dismissReport } = useAdmin();
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getContentTypeIcon = () => {
    switch (contentType) {
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'post':
        return <FileText className="h-4 w-4" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4" />;
      case 'profile':
        return <User className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getSeverityBadge = () => {
    switch (severity) {
      case 'high':
        return (
          <div className="flex items-center gap-1 text-red-700 bg-red-50 px-2 py-1 rounded-full text-xs">
            <AlertTriangle className="h-3 w-3" />
            <span>Élevée</span>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-1 rounded-full text-xs">
            <AlertTriangle className="h-3 w-3" />
            <span>Moyenne</span>
          </div>
        );
      case 'low':
        return (
          <div className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-1 rounded-full text-xs">
            <AlertTriangle className="h-3 w-3" />
            <span>Faible</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  const handleDismiss = () => {
    dismissReport(id);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarFallback>{getInitials(target)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-medium">{reporter}</span>
              <span className="text-muted-foreground"> a signalé </span>
              <span className="font-medium">{target}</span>
            </div>
            <span className="text-xs text-muted-foreground">{formatDate(timestamp)}</span>
          </div>
          
          <p className="mt-2">{reason}</p>
          
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1 text-muted-foreground bg-muted/50 px-2 py-1 rounded-full text-xs">
              {getContentTypeIcon()}
              <span>
                {contentType === 'message' ? 'Message' : 
                 contentType === 'post' ? 'Publication' : 
                 contentType === 'comment' ? 'Commentaire' : 'Profil'}
              </span>
            </div>
            {getSeverityBadge()}
          </div>
          
          <div className="mt-4 flex justify-end gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handleDismiss}
            >
              <XCircle className="h-4 w-4" />
              Ignorer
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="flex items-center gap-1 text-amber-700 border-amber-200 hover:bg-amber-50"
            >
              <ShieldAlert className="h-4 w-4" />
              Avertir
            </Button>
            <Button 
              size="sm" 
              className="flex items-center gap-1"
            >
              <CheckCircle className="h-4 w-4" />
              Examiner
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
