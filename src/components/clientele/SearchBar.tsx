
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full sm:w-auto">
      <Input
        placeholder="Rechercher un client..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 w-full sm:w-80 bg-white border-rome-gold/30"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
    </div>
  );
};
