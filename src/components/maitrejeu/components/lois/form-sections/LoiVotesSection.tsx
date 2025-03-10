
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loi } from '../../../types/lois';

interface LoiVotesSectionProps {
  formData: Omit<Loi, 'id'>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const LoiVotesSection: React.FC<LoiVotesSectionProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="votesPositifs">Votes pour</Label>
        <Input
          id="votesPositifs"
          name="votesPositifs"
          type="number"
          value={formData.votesPositifs}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="votesNégatifs">Votes contre</Label>
        <Input
          id="votesNégatifs"
          name="votesNégatifs"
          type="number"
          value={formData.votesNégatifs}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="votesAbstention">Abstentions</Label>
        <Input
          id="votesAbstention"
          name="votesAbstention"
          type="number"
          value={formData.votesAbstention}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
