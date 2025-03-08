import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

// Importer les constantes de type pour EvenementType
import { EvenementType, EVENEMENT_TYPES } from '../types/maitreJeuTypes';

export const EvenementsList = ({ evenements, onResolve, filteredType }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleResolve = (eventId) => {
    setSelectedEventId(eventId);
    setShowConfirmation(true);
  };

  const confirmResolve = () => {
    if (selectedEventId && onResolve) {
      onResolve(selectedEventId);
    }
    setShowConfirmation(false);
    setSelectedEventId(null);
  };

  const cancelResolve = () => {
    setShowConfirmation(false);
    setSelectedEventId(null);
  };

  const getTypeColor = (type: EvenementType) => {
    if (type === EVENEMENT_TYPES.CRISE) return 'bg-red-500';
    if (type === EVENEMENT_TYPES.GUERRE) return 'bg-orange-500';
    if (type === EVENEMENT_TYPES.POLITIQUE) return 'bg-blue-500';
    if (type === EVENEMENT_TYPES.RELIGION) return 'bg-purple-500';
    if (type === EVENEMENT_TYPES.ÉCONOMIQUE) return 'bg-green-500';
    if (type === EVENEMENT_TYPES.DIPLOMATIQUE) return 'bg-cyan-500';
    if (type === EVENEMENT_TYPES.SOCIAL) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const filteredEvenements = evenements.filter(evenement => {
    return !filteredType || evenement.type === filteredType;
  });
  
  // Corriger les références de 'title' à 'titre'
  // Corriger les références à 'actions' avec vérifications nullables
  // Corriger les comparaisons d'impact
  return (
    <div className="space-y-4">
      {filteredEvenements.map(evenement => (
        <div key={evenement.id} className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${getTypeColor(evenement.type)}`}></div>
            <h3 className="font-bold">{evenement.titre}</h3>
          </div>
          
          <p className="text-sm">{evenement.description}</p>
          
          {/* Gestion conditionnelle des actions */}
          {evenement.actions && evenement.actions.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-sm">Actions possibles :</h4>
              {evenement.actions.map(action => (
                <div key={action.id} className="p-2 border border-gray-200 rounded">
                  <p className="text-sm font-medium">{action.titre}</p>
                  <p className="text-xs">{action.description}</p>
                  <p className="text-xs italic">Conséquences: {action.conséquences}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Correction du rendu de l'impact pour gérer les types corrects */}
          {evenement.impact && (
            <div className="mt-2 text-sm">
              <p className="font-semibold">Impact :</p>
              <ul className="list-disc pl-5">
                {evenement.impact.stabilité !== undefined && (
                  <li className={evenement.impact.stabilité > 0 ? 'text-green-600' : 'text-red-600'}>
                    Stabilité: {evenement.impact.stabilité > 0 ? '+' : ''}{evenement.impact.stabilité}
                  </li>
                )}
                {evenement.impact.trésorPublique !== undefined && (
                  <li className={evenement.impact.trésorPublique > 0 ? 'text-green-600' : 'text-red-600'}>
                    Trésor Publique: {evenement.impact.trésorPublique > 0 ? '+' : ''}{evenement.impact.trésorPublique}
                  </li>
                )}
                {evenement.impact.prestigeRome !== undefined && (
                  <li className={evenement.impact.prestigeRome > 0 ? 'text-green-600' : 'text-red-600'}>
                    Prestige de Rome: {evenement.impact.prestigeRome > 0 ? '+' : ''}{evenement.impact.prestigeRome}
                  </li>
                )}
                {evenement.impact.religion !== undefined && (
                  <li className={evenement.impact.religion > 0 ? 'text-green-600' : 'text-red-600'}>
                    Religion: {evenement.impact.religion > 0 ? '+' : ''}{evenement.impact.religion}
                  </li>
                )}
                {evenement.impact.autre && Object.keys(evenement.impact.autre).map(key => (
                  <li key={key} className="text-gray-600">
                    {key}: {evenement.impact.autre[key]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-auto h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleResolve(evenement.id)}>
                Marquer comme résolu
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};
