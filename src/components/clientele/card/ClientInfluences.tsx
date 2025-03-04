
import React from 'react';
import { Building, Heart, BookIcon } from 'lucide-react';
import { InfluenceBar } from './InfluenceBar';
import { ClientInfluence } from '../ClientCard';

interface ClientInfluencesProps {
  influences: ClientInfluence;
}

export const ClientInfluences: React.FC<ClientInfluencesProps> = ({ influences }) => {
  return (
    <div className="space-y-1 mt-2 bg-gray-50 p-2 rounded">
      <h4 className="text-sm font-medium mb-1">Influences:</h4>
      
      {influences.political > 0 && (
        <div className="flex items-center gap-2">
          <Building className="h-3 w-3 text-purple-600" />
          <InfluenceBar level={influences.political} color="text-purple-600" />
        </div>
      )}
      
      {influences.popular > 0 && (
        <div className="flex items-center gap-2">
          <Heart className="h-3 w-3 text-rose-600" />
          <InfluenceBar level={influences.popular} color="text-rose-600" />
        </div>
      )}
      
      {influences.religious > 0 && (
        <div className="flex items-center gap-2">
          <BookIcon className="h-3 w-3 text-amber-600" />
          <InfluenceBar level={influences.religious} color="text-amber-600" />
        </div>
      )}
    </div>
  );
};
