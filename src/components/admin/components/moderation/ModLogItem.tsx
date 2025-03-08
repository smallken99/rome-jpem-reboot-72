
import React from 'react';
import { ModLog } from '../../types/adminTypes';
import { Ban, AlertTriangle, Trash2, RefreshCw } from 'lucide-react';

interface ModLogItemProps {
  log: ModLog;
}

export const ModLogItem: React.FC<ModLogItemProps> = ({ log }) => {
  // Fonction pour formater la date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Obtenir l'icône en fonction du type d'action
  const getActionIcon = () => {
    switch (log.actionType) {
      case 'ban':
        return <Ban className="h-4 w-4" />;
      case 'warn':
        return <AlertTriangle className="h-4 w-4" />;
      case 'delete_content':
        return <Trash2 className="h-4 w-4" />;
      case 'restore_content':
        return <RefreshCw className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  // Obtenir la classe CSS en fonction du type d'action
  const getActionClass = () => {
    switch (log.actionType) {
      case 'ban':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'warn':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'delete_content':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'restore_content':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  // Obtenir le libellé en fonction du type d'action
  const getActionLabel = () => {
    switch (log.actionType) {
      case 'ban':
        return 'Bannissement';
      case 'warn':
        return 'Avertissement';
      case 'delete_content':
        return 'Suppression de contenu';
      case 'restore_content':
        return 'Restauration de contenu';
      default:
        return 'Action inconnue';
    }
  };
  
  // Construire le texte de l'action
  const getActionDescription = () => {
    let description = '';
    
    switch (log.actionType) {
      case 'ban':
        description = `a banni ${log.userName}`;
        if (log.duration) {
          description += ` pour ${log.duration} jour${log.duration > 1 ? 's' : ''}`;
        } else {
          description += ` définitivement`;
        }
        break;
      case 'warn':
        description = `a averti ${log.userName}`;
        break;
      case 'delete_content':
        description = `a supprimé du contenu de ${log.userName}`;
        if (log.contentType) {
          description += ` (${log.contentType})`;
        }
        break;
      case 'restore_content':
        description = `a restauré du contenu de ${log.userName}`;
        if (log.contentType) {
          description += ` (${log.contentType})`;
        }
        break;
      default:
        description = `a effectué une action sur ${log.userName}`;
    }
    
    return description;
  };
  
  return (
    <div className="border-b py-4 last:border-0">
      <div className="flex items-start">
        <div className={`flex items-center justify-center rounded-full p-2 ${getActionClass()} mr-4`}>
          {getActionIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-medium">{log.moderatorName}</span>
              <span className="text-muted-foreground"> {getActionDescription()}</span>
            </div>
            <span className="text-xs text-muted-foreground">{formatDate(log.timestamp)}</span>
          </div>
          
          <div className="mt-1 text-sm">
            <span className="font-medium">Raison:</span> {log.reason}
          </div>
          
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getActionClass()}`}>
              {getActionIcon()}
              <span className="ml-1">{getActionLabel()}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
