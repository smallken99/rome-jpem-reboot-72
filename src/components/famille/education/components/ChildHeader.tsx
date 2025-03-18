
import React, { useState } from 'react';
import { Edit, User, UserCheck } from 'lucide-react';
import { Child } from '../types/educationTypes';
import { Badge } from '@/components/ui/badge';

interface ChildHeaderProps {
  child: Child;
  onNameChange: (id: string, newName: string) => void;
  hasInvalidEducation?: boolean;
}

export const ChildHeader: React.FC<ChildHeaderProps> = ({ 
  child, 
  onNameChange,
  hasInvalidEducation = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(child.name);
  
  const handleNameSubmit = () => {
    if (newName.trim() && newName !== child.name) {
      onNameChange(child.id, newName);
    }
    setIsEditing(false);
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-rome-marble to-white">
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2 ${child.gender === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
          {child.gender === 'male' ? <UserCheck size={20} /> : <User size={20} />}
        </div>
        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleNameSubmit}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                className="border border-rome-gold/30 px-2 py-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-rome-gold"
                autoFocus
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="font-cinzel font-semibold text-rome-navy">{child.name}</h3>
              <button 
                onClick={() => setIsEditing(true)}
                className="text-muted-foreground hover:text-rome-gold transition-colors"
              >
                <Edit size={14} />
              </button>
            </div>
          )}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{child.age} ans</span>
            {hasInvalidEducation && (
              <Badge variant="destructive" className="text-xs">
                Éducation incompatible
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
