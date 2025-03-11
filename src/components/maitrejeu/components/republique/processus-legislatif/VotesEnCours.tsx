
import React from 'react';
import { Button } from '@/components/ui/button';
import { Vote } from 'lucide-react';
import { votesData } from './data';
import { VoteLoi } from './types';

interface VotesEnCoursProps {
  searchTerm: string;
}

export const VotesEnCours: React.FC<VotesEnCoursProps> = ({ searchTerm }) => {
  // Filtrer les votes selon le terme de recherche
  const filteredVotes = votesData.filter(vote => 
    vote.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vote.auteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredVotes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun vote en cours ne correspond à vos critères
        </div>
      ) : (
        filteredVotes.map(vote => (
          <VoteItem key={vote.id} vote={vote} />
        ))
      )}
    </div>
  );
};

interface VoteItemProps {
  vote: VoteLoi;
}

const VoteItem: React.FC<VoteItemProps> = ({ vote }) => {
  return (
    <div className="flex flex-col p-4 border rounded-lg hover:bg-muted/20">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-green-100">
            <Vote className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium">{vote.titre}</h3>
            <p className="text-sm text-muted-foreground">
              Proposé par {vote.auteur} • Vote du {vote.dateDebut} au {vote.dateFin}
            </p>
          </div>
        </div>
        <div>
          <Button variant="default" size="sm">Gérer le vote</Button>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <VoteStatBox value={vote.pour} label="Pour" bgColor="bg-green-50" textColor="text-green-600" />
        <VoteStatBox value={vote.contre} label="Contre" bgColor="bg-red-50" textColor="text-red-600" />
        <VoteStatBox value={vote.abstention} label="Abstention" bgColor="bg-gray-50" textColor="text-gray-600" />
      </div>
    </div>
  );
};

interface VoteStatBoxProps {
  value: number;
  label: string;
  bgColor: string;
  textColor: string;
}

const VoteStatBox: React.FC<VoteStatBoxProps> = ({ value, label, bgColor, textColor }) => {
  return (
    <div className={`text-center p-2 ${bgColor} rounded-md`}>
      <div className={`text-lg font-bold ${textColor}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
};
