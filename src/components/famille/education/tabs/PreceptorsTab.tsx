
import React, { useState } from 'react';
import { useEducation } from '../context/EducationContext';
import { PreceptorList } from '../PreceptorList';
import { HirePreceptorDialog } from '../dialogs/HirePreceptorDialog';
import { FirePreceptorDialog } from '../dialogs/FirePreceptorDialog';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const PreceptorsTab: React.FC = () => {
  const { preceptors, hirePreceptor, firePreceptor } = useEducation();
  const [selectedPreceptorId, setSelectedPreceptorId] = useState<string | undefined>();
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [showHireDialog, setShowHireDialog] = useState(false);
  const [showFireDialog, setShowFireDialog] = useState(false);
  
  const handleSelectPreceptor = (preceptorId: string) => {
    setSelectedPreceptorId(preceptorId);
  };
  
  const handleHirePreceptor = () => {
    if (selectedPreceptorId) {
      const success = hirePreceptor(selectedPreceptorId);
      if (success) {
        setShowHireDialog(false);
      }
    }
  };
  
  const handleFirePreceptor = () => {
    if (selectedPreceptorId) {
      firePreceptor(selectedPreceptorId);
      setShowFireDialog(false);
    }
  };
  
  const handleOpenHireDialog = (preceptorId: string) => {
    setSelectedPreceptorId(preceptorId);
    setShowHireDialog(true);
  };
  
  const handleOpenFireDialog = (preceptorId: string) => {
    setSelectedPreceptorId(preceptorId);
    setShowFireDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-cinzel">Précepteurs</h2>
        <Button className="roman-btn">
          <Plus className="h-4 w-4 mr-2" />
          Recruter un précepteur
        </Button>
      </div>
      
      <div className="bg-white p-4 border border-rome-gold/20 rounded-md shadow-sm">
        <div className="flex items-center mb-4">
          <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filtrer par:</span>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="bg-slate-100">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="available">Disponibles</TabsTrigger>
            <TabsTrigger value="military">Militaire</TabsTrigger>
            <TabsTrigger value="rhetoric">Rhétorique</TabsTrigger>
            <TabsTrigger value="academic">Académique</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="bg-white p-6 border border-rome-gold/20 rounded-md shadow-sm">
        <PreceptorList
          preceptors={preceptors}
          selectedPreceptorId={selectedPreceptorId}
          onSelectPreceptor={handleSelectPreceptor}
          onHirePreceptor={handleOpenHireDialog}
          onFirePreceptor={handleOpenFireDialog}
          showAvailableOnly={selectedTab === 'available'}
          educationType={selectedTab !== 'all' && selectedTab !== 'available' ? selectedTab : undefined}
          showHireButton={true}
        />
      </div>
      
      {showHireDialog && selectedPreceptorId && (
        <HirePreceptorDialog
          open={showHireDialog}
          onOpenChange={setShowHireDialog}
          preceptorId={selectedPreceptorId}
          onHire={handleHirePreceptor}
        />
      )}
      
      {showFireDialog && selectedPreceptorId && (
        <FirePreceptorDialog
          open={showFireDialog}
          onOpenChange={setShowFireDialog}
          preceptorId={selectedPreceptorId}
          onFire={handleFirePreceptor}
        />
      )}
    </div>
  );
};
