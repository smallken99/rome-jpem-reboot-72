
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoiBasicInfoForm } from './LoiBasicInfoForm';
import { LoiEffetsForm } from './LoiEffetsForm';
import { LoiConditionsForm } from './LoiConditionsForm';
import { LoiPenalitesForm } from './LoiPenalitesForm';
import { Loi } from '@/components/republique/lois/hooks/useLois';
import { ensureLoiCompliance } from '../utils/loiAdapter';

interface LoiFormTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  formData: Loi;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  effetInput: string;
  setEffetInput: (value: string) => void;
  addEffet: () => void;
  removeEffet: (index: number) => void;
  conditionInput: string;
  setConditionInput: (value: string) => void;
  addCondition: () => void;
  removeCondition: (index: number) => void;
  penaliteInput: string;
  setPenaliteInput: (value: string) => void;
  addPenalite: () => void;
  removePenalite: (index: number) => void;
  categories: any[];
}

export const LoiFormTabs: React.FC<LoiFormTabsProps> = ({
  activeTab,
  setActiveTab,
  formData,
  handleChange,
  handleSelectChange,
  effetInput,
  setEffetInput,
  addEffet,
  removeEffet,
  conditionInput,
  setConditionInput,
  addCondition,
  removeCondition,
  penaliteInput,
  setPenaliteInput,
  addPenalite,
  removePenalite,
  categories
}) => {
  // Ensure we're working with a compliant Loi object
  const compliantLoi = formData;
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
      <TabsList className="grid grid-cols-4">
        <TabsTrigger value="info">Informations</TabsTrigger>
        <TabsTrigger value="effets">Effets</TabsTrigger>
        <TabsTrigger value="conditions">Conditions</TabsTrigger>
        <TabsTrigger value="penalites">Pénalités</TabsTrigger>
      </TabsList>
      
      <TabsContent value="info" className="space-y-4 mt-4">
        <LoiBasicInfoForm 
          formData={compliantLoi} 
          handleChange={handleChange} 
          handleSelectChange={handleSelectChange} 
          categories={categories}
        />
      </TabsContent>
      
      <TabsContent value="effets" className="space-y-4 mt-4">
        <LoiEffetsForm 
          formData={compliantLoi}
          effetInput={effetInput}
          setEffetInput={setEffetInput}
          addEffet={addEffet}
          removeEffet={removeEffet}
        />
      </TabsContent>
      
      <TabsContent value="conditions" className="space-y-4 mt-4">
        <LoiConditionsForm 
          formData={compliantLoi}
          conditionInput={conditionInput}
          setConditionInput={setConditionInput}
          addCondition={addCondition}
          removeCondition={removeCondition}
        />
      </TabsContent>
      
      <TabsContent value="penalites" className="space-y-4 mt-4">
        <LoiPenalitesForm 
          formData={compliantLoi}
          penaliteInput={penaliteInput}
          setPenaliteInput={setPenaliteInput}
          addPenalite={addPenalite}
          removePenalite={removePenalite}
        />
      </TabsContent>
    </Tabs>
  );
};
