
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, Save, X } from 'lucide-react';
import { ChildHeaderProps } from '../types/educationTypes';

export const ChildHeader: React.FC<ChildHeaderProps> = ({ 
  child,
  onNameChange,
  hasInvalidEducation
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(child.name);
  
  // Gérer la modification du nom
  const handleEditName = () => {
    setIsEditing(true);
  };
  
  // Annuler l'édition
  const handleCancel = () => {
    setIsEditing(false);
    setNewName(child.name);
  };
  
  // Enregistrer le nouveau nom
  const handleSave = () => {
    // Check if the child object has an id property and if onNameChange is provided
    if (newName.trim() && onNameChange && 'id' in child && child.id) {
      onNameChange(child.id, newName.trim());
    }
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="max-w-xs"
              autoFocus
            />
            <Button variant="ghost" size="icon" onClick={handleSave}>
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {child.name}
            {onNameChange && (
              <Button variant="ghost" size="icon" onClick={handleEditName}>
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </h2>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          Âge: {child.age} ans
        </div>
        <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
          {child.gender === 'male' ? 'Garçon' : 'Fille'}
        </div>
        {hasInvalidEducation && (
          <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            Éducation incompatible
          </div>
        )}
      </div>
    </div>
  );
};
