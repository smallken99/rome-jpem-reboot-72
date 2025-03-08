
import React from 'react';
import { Input } from "@/components/ui/input";

interface HistoireSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const HistoireSearchBar: React.FC<HistoireSearchBarProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <Input 
      placeholder="Rechercher dans l'histoire..." 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="max-w-sm"
    />
  );
};
