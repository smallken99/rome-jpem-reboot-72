
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMaitreJeu } from '../../context';
import { 
  EvenementType, 
  EvenementAction, 
  ImportanceType,
  Evenement
} from '../../types/evenements';

export const useEvenementForm = (onClose: () => void) => {
  const { currentYear, currentSeason, addEvenement } = useMaitreJeu();
  
  const [evenement, setEvenement] = useState({
    titre: '',
    description: '',
    type: 'POLITIQUE' as EvenementType,
    date: { year: currentYear, season: currentSeason },
    importance: 'normale' as ImportanceType,
    options: [] as EvenementAction[],
    resolved: false
  });
  
  const [optionText, setOptionText] = useState('');
  const [consequence, setConsequence] = useState('');

  const updateEvenementField = <K extends keyof typeof evenement>(field: K, value: typeof evenement[K]) => {
    setEvenement(prev => ({ ...prev, [field]: value }));
  };
  
  const handleAddOption = () => {
    if (optionText.trim() === '') return;
    
    // Create a new option with the correct structure
    const newOption: EvenementAction = {
      id: uuidv4(),
      texte: optionText,
      effets: {},
      label: optionText,
      consequence: consequence,
      description: consequence // Ajouter description pour satisfaire le type
    };
    
    // Update the evenement state with the new option
    setEvenement(prev => ({
      ...prev,
      options: [...prev.options, newOption]
    }));
    
    // Clear the input fields
    setOptionText('');
    setConsequence('');
  };
  
  const handleRemoveOption = (id: string) => {
    setEvenement(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt.id !== id)
    }));
  };
  
  const handleSubmit = () => {
    if (evenement.titre.trim() === '' || evenement.description.trim() === '' || evenement.options.length === 0) {
      // Show error toast or validation message
      return;
    }
    
    // Adapter le format pour correspondre à l'interface Evenement
    const eventToSubmit: Evenement = {
      id: uuidv4(),
      title: evenement.titre,
      description: evenement.description,
      type: evenement.type,
      date: evenement.date,
      importance: evenement.importance,
      options: evenement.options,
      resolved: evenement.resolved,
      titre: evenement.titre
    };
    
    addEvenement(eventToSubmit);
    onClose();
    
    // Reset the form
    setEvenement({
      titre: '',
      description: '',
      type: 'POLITIQUE',
      date: { year: currentYear, season: currentSeason },
      importance: 'normale',
      options: [],
      resolved: false
    });
  };

  return {
    evenement,
    optionText,
    consequence,
    updateEvenementField,
    setOptionText,
    setConsequence,
    handleAddOption,
    handleRemoveOption,
    handleSubmit
  };
};
