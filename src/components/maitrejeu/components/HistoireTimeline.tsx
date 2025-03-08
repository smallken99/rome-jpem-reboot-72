
import React from 'react';
import { formatDate } from '@/utils/formatUtils';
import { HistoireEntry } from '../types/maitreJeuTypes';
import { Scroll, User, Award, CalendarDays } from 'lucide-react';

interface HistoireTimelineProps {
  entries: HistoireEntry[];
}

export const HistoireTimeline: React.FC<HistoireTimelineProps> = ({ entries }) => {
  // Trier les entrées par date (les plus récentes en premier)
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.date.year !== b.date.year) {
      return b.date.year - a.date.year;
    }
    
    const seasons = {
      'WINTER': 4,
      'AUTUMN': 3,
      'SUMMER': 2,
      'SPRING': 1
    };
    
    return seasons[b.date.season] - seasons[a.date.season];
  });
  
  // Fonction pour obtenir la couleur appropriée selon le type
  const getTypeColor = (type?: string) => {
    if (!type) return 'bg-gray-200';
    
    switch(type) {
      case 'POLITIQUE':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'MILITAIRE':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'SOCIAL':
        return 'bg-amber-100 border-amber-300 text-amber-800';
      case 'RELIGIEUX':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'ECONOMIQUE':
        return 'bg-green-100 border-green-300 text-green-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-md shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Chronologie des événements</h3>
      
      {sortedEntries.length === 0 ? (
        <div className="text-center p-6 text-gray-500">
          Aucun événement historique enregistré.
        </div>
      ) : (
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 z-0"></div>
          
          {/* Entries */}
          <div className="space-y-8">
            {sortedEntries.map((entry) => (
              <div key={entry.id} className="relative pl-10">
                {/* Point sur la timeline */}
                <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center z-10">
                  <Scroll className="h-4 w-4 text-gray-600" />
                </div>
                
                <div className="bg-white border rounded-lg shadow-sm p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-lg font-medium">{entry.titre}</h4>
                      {entry.type && (
                        <span className={`inline-block px-2 py-0.5 text-xs rounded border ${getTypeColor(entry.type)}`}>
                          {entry.type}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {formatDate(entry.date.year, entry.date.season, entry.date.day)}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{entry.contenu}</p>
                  
                  {entry.personnagesImpliqués && entry.personnagesImpliqués.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <User className="h-3 w-3 mr-1" />
                        <span className="font-medium">Personnages impliqués:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {entry.personnagesImpliqués.map((person, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block bg-gray-100 px-2 py-1 text-xs rounded"
                          >
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
