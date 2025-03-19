
import React, { useState } from 'react';
import { useEducation } from '../context/EducationContext';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { HirePreceptorDialog } from '../dialogs/HirePreceptorDialog';
import { FirePreceptorDialog } from '../dialogs/FirePreceptorDialog';
import { usePreceptorsManagement } from '../hooks/usePreceptorsManagement';

const PreceptorsTab = () => {
  const [selectedPreceptorId, setSelectedPreceptorId] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(true);
  const [hireDialogOpen, setHireDialogOpen] = useState(false);
  const [fireDialogOpen, setFireDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('rhetoric');

  const { preceptors } = useEducation();
  const {
    availablePreceptors,
    hirePreceptor,
    firePreceptor,
  } = usePreceptorsManagement();

  const getFilteredPreceptors = () => {
    const preceptorsToUse = showAvailableOnly ? 
      preceptors.filter(p => p.available !== false) : 
      preceptors;
    
    if (activeTab === 'all') {
      return preceptorsToUse;
    }
    
    return preceptorsToUse.filter(p => p.specialty === activeTab);
  };

  const handleSelectPreceptor = (preceptorId: string) => {
    setSelectedPreceptorId(preceptorId);
  };

  const handleHirePreceptor = () => {
    hirePreceptor(selectedPreceptorId);
    setHireDialogOpen(false);
  };

  const handleFirePreceptor = () => {
    firePreceptor(selectedPreceptorId);
    setFireDialogOpen(false);
  };

  const openHireDialog = (preceptorId: string) => {
    setSelectedPreceptorId(preceptorId);
    setHireDialogOpen(true);
  };

  const openFireDialog = (preceptorId: string) => {
    setSelectedPreceptorId(preceptorId);
    setFireDialogOpen(true);
  };

  const filteredPreceptors = getFilteredPreceptors();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            variant={activeTab === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab('all')}
          >
            Tous
          </Button>
          <Button
            variant={activeTab === 'rhetoric' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab('rhetoric')}
          >
            Rhétorique
          </Button>
          <Button
            variant={activeTab === 'military' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab('military')}
          >
            Militaire
          </Button>
          <Button
            variant={activeTab === 'religious' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab('religious')}
          >
            Religieux
          </Button>
          <Button
            variant={activeTab === 'academic' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab('academic')}
          >
            Académique
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAvailableOnly(!showAvailableOnly)}
        >
          {showAvailableOnly ? "Voir tous" : "Voir disponibles uniquement"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPreceptors.map((preceptor) => (
          <div 
            key={preceptor.id}
            className={`border rounded-lg p-4 ${selectedPreceptorId === preceptor.id ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => handleSelectPreceptor(preceptor.id)}
          >
            <h3 className="font-semibold text-lg">{preceptor.name}</h3>
            <p className="text-sm text-gray-600">Spécialité: {preceptor.specialty}</p>
            <p className="text-sm text-gray-600">Qualité: {preceptor.quality}/5</p>
            <p className="text-sm text-gray-600">Prix: {preceptor.price || 0} as/an</p>
            <div className="flex justify-end mt-4 space-x-2">
              {preceptor.available !== false ? (
                <Button 
                  size="sm" 
                  onClick={() => openHireDialog(preceptor.id)}
                >
                  Engager
                </Button>
              ) : (
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => openFireDialog(preceptor.id)}
                >
                  Renvoyer
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPreceptors.length === 0 && (
        <div className="flex items-center justify-center p-8 border rounded-lg">
          <div className="flex items-center space-x-2 text-gray-500">
            <Info size={20} />
            <span>Aucun précepteur disponible pour cette catégorie.</span>
          </div>
        </div>
      )}

      <HirePreceptorDialog
        isOpen={hireDialogOpen}
        onOpenChange={setHireDialogOpen}
        preceptorId={selectedPreceptorId}
        onHire={handleHirePreceptor}
      />

      <FirePreceptorDialog
        isOpen={fireDialogOpen}
        onOpenChange={setFireDialogOpen}
        preceptorId={selectedPreceptorId}
        onFire={handleFirePreceptor}
      />
    </div>
  );
};

export default PreceptorsTab;
