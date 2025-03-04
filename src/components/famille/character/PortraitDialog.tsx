
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PortraitDialogProps {
  selectedCharacterId: string | null;
  portraitUrl: string;
  onClose: () => void;
  onPortraitChange: (characterId: string, newPortraitUrl: string) => void;
  onPortraitUrlChange: (url: string) => void;
}

export const PortraitDialog: React.FC<PortraitDialogProps> = ({
  selectedCharacterId,
  portraitUrl,
  onClose,
  onPortraitChange,
  onPortraitUrlChange
}) => {
  return (
    <Dialog 
      open={!!selectedCharacterId} 
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Changer le portrait</DialogTitle>
          <DialogDescription>
            Entrez l'URL d'une image pour modifier le portrait du personnage.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="portrait-url" className="text-sm">URL de l'image</label>
            <Input 
              id="portrait-url" 
              placeholder="https://exemple.com/image.jpg" 
              value={portraitUrl}
              onChange={(e) => onPortraitUrlChange(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button 
              onClick={() => {
                if (selectedCharacterId) {
                  onPortraitChange(selectedCharacterId, portraitUrl);
                }
              }}
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
