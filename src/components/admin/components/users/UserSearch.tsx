
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const UserSearch: React.FC = () => {
  const { searchTerm, setSearchTerm } = useAdmin();
  
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input 
        placeholder="Rechercher un utilisateur..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
