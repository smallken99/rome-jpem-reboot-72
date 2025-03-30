
import React from 'react';
import { HistoriqueEntry } from '@/types/equilibre';
import { formatDate } from '@/utils/dateFormatters';

interface RecentEventsTableProps {
  events: HistoriqueEntry[];
  limit?: number;
}

export const RecentEventsTable: React.FC<RecentEventsTableProps> = ({ 
  events,
  limit = 5
}) => {
  // Trions les événements par date (les plus récents d'abord)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  }).slice(0, limit);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Événement
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Impact
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
              <tr key={event.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(event.date)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-gray-500">{event.event}</div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  {Object.entries(event.impact).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-1">
                      <span className="text-xs">{key}:</span>
                      <span className={`text-xs font-medium ${Number(value) > 0 ? 'text-green-600' : Number(value) < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                        {Number(value) > 0 ? `+${value}` : value}
                      </span>
                    </div>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="px-4 py-4 text-sm text-center text-gray-500">
                Aucun événement récent à afficher
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
