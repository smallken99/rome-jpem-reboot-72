
import React from 'react';
import { AllianceItem } from '../../features/AllianceItem';

// Define the alliance type here for better organization
export interface Alliance {
  id?: string;
  name: string;
  member?: string;
  spouse?: string;
  type: 'politique' | 'matrimoniale';
  status: 'actif' | 'en négociation' | 'rompu';
  benefits: string[];
  date?: string;
}

interface AllianceListProps {
  alliances: Alliance[];
}

export const AllianceList: React.FC<AllianceListProps> = ({ alliances }) => {
  const activeAlliances = alliances.filter(alliance => alliance.status === 'actif');
  
  return (
    <div className="space-y-4">
      {activeAlliances.map((alliance, index) => (
        <div key={alliance.id || index} className="border rounded-md overflow-hidden">
          {(alliance.member && alliance.spouse) && (
            <div className="p-3 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel">{alliance.member}</h3>
                <span className="text-rome-terracotta">♥</span>
                <h3 className="font-cinzel">{alliance.spouse}</h3>
              </div>
              {alliance.date && (
                <div className="text-sm text-muted-foreground">
                  {alliance.date}
                </div>
              )}
            </div>
          )}
          
          <AllianceItem
            name={alliance.name}
            type={alliance.type}
            status={alliance.status}
            benefits={alliance.benefits}
          />
        </div>
      ))}
      
      {activeAlliances.length === 0 && (
        <div className="text-center p-4 text-muted-foreground italic">
          Aucune alliance active pour le moment.
        </div>
      )}
    </div>
  );
};
