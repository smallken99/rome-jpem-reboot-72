
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';
import { Loi } from '../../types/lois';

interface LoisListProps {
  lois: Loi[];
  onCreateLoi: () => void;
  onViewLoi: (loi: Loi) => void;
}

export const LoisList: React.FC<LoisListProps> = ({ lois, onCreateLoi, onViewLoi }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lois en vigueur</CardTitle>
        <CardDescription>Liste des lois actuellement en discussion au Sénat.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-none pl-0">
          {lois.map(loi => (
            <li key={loi.id} className="py-2 border-b border-gray-200 last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{loi.titre}</h3>
                  <p className="text-sm text-gray-500">{loi.description}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => onViewLoi(loi)}>
                    <Book className="h-4 w-4 mr-2" />
                    Voir détails
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        <Button variant="secondary" className="mt-4" onClick={onCreateLoi}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
          Proposer une nouvelle loi
        </Button>
      </CardContent>
    </Card>
  );
};
