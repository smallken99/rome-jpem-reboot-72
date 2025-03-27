
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Character } from '@/types/character';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ArrowUp, ArrowDown, X } from 'lucide-react';
import { toast } from '@/components/ui-custom/toast';

interface HeirSelectionProps {
  character: Character;
  allCharacters: Character[];
  eligibleHeirs: Character[];
}

export const HeirSelection: React.FC<HeirSelectionProps> = ({
  character,
  allCharacters,
  eligibleHeirs
}) => {
  const [selectedHeirs, setSelectedHeirs] = useState<Character[]>(eligibleHeirs.slice(0, 5));
  const [availableHeirs, setAvailableHeirs] = useState<Character[]>(
    eligibleHeirs.filter(heir => !selectedHeirs.some(selected => selected.id === heir.id))
  );
  
  const handleAddHeir = (heir: Character) => {
    if (selectedHeirs.length >= 10) {
      toast.warning("Vous ne pouvez pas désigner plus de 10 héritiers.");
      return;
    }
    
    setSelectedHeirs(prev => [...prev, heir]);
    setAvailableHeirs(prev => prev.filter(h => h.id !== heir.id));
  };
  
  const handleRemoveHeir = (heirId: string) => {
    const removedHeir = selectedHeirs.find(h => h.id === heirId);
    if (!removedHeir) return;
    
    setSelectedHeirs(prev => prev.filter(h => h.id !== heirId));
    setAvailableHeirs(prev => [...prev, removedHeir]);
  };
  
  const moveHeir = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === selectedHeirs.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newHeirs = [...selectedHeirs];
    [newHeirs[index], newHeirs[newIndex]] = [newHeirs[newIndex], newHeirs[index]];
    
    setSelectedHeirs(newHeirs);
  };
  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const newHeirs = [...selectedHeirs];
    const [movedItem] = newHeirs.splice(result.source.index, 1);
    newHeirs.splice(result.destination.index, 0, movedItem);
    
    setSelectedHeirs(newHeirs);
  };
  
  const handleSave = () => {
    toast.success("Ordre de succession sauvegardé avec succès.");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Ordre de Succession</h3>
        <p className="text-sm text-gray-500 mb-6">
          Faites glisser les héritiers pour modifier leur ordre dans la succession.
          L'ordre de succession détermine qui héritera en priorité.
        </p>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="heirs-list">
            {(provided) => (
              <ul 
                className="space-y-2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {selectedHeirs.length === 0 ? (
                  <li className="text-center text-gray-500 italic py-4 border rounded">
                    Aucun héritier sélectionné
                  </li>
                ) : (
                  selectedHeirs.map((heir, index) => (
                    <Draggable key={heir.id} draggableId={heir.id} index={index}>
                      {(provided) => (
                        <li 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex justify-between items-center p-3 bg-gray-50 border rounded"
                        >
                          <div className="flex items-center">
                            <span className="font-bold mr-2">{index + 1}.</span>
                            <div>
                              <p className="font-medium">{heir.name}</p>
                              <p className="text-sm text-gray-500">
                                {heir.relation}, {heir.age} ans
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => moveHeir(index, 'up')}
                              disabled={index === 0}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => moveHeir(index, 'down')}
                              disabled={index === selectedHeirs.length - 1}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveHeir(heir.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        
        <div className="mt-6">
          <Button onClick={handleSave} className="w-full">
            Sauvegarder l'ordre de succession
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Autres héritiers potentiels</h3>
        <Card>
          <CardContent className="p-4">
            <ul className="space-y-2">
              {availableHeirs.length === 0 ? (
                <li className="text-center text-gray-500 italic py-4">
                  Tous les héritiers potentiels sont déjà dans l'ordre de succession
                </li>
              ) : (
                availableHeirs.map(heir => (
                  <li 
                    key={heir.id} 
                    className="flex justify-between items-center p-3 bg-gray-50 border rounded"
                  >
                    <div>
                      <p className="font-medium">{heir.name}</p>
                      <p className="text-sm text-gray-500">
                        {heir.relation}, {heir.age} ans
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddHeir(heir)}
                    >
                      Ajouter
                    </Button>
                  </li>
                ))
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
