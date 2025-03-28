
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatDate } from '@/utils/dateUtils';

interface LoiDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  loi: Loi | null;
  onEdit?: (loi: Loi) => void;
}

export const LoiDetailDialog: React.FC<LoiDetailDialogProps> = ({
  isOpen,
  onClose,
  loi,
  onEdit
}) => {
  if (!loi) return null;

  const formatGameDate = (date: any) => {
    if (!date) return 'Date inconnue';
    if (typeof date === 'string') return date;
    return `An ${date.year}, ${date.season}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'proposed':
      case 'proposée':
        return 'bg-blue-100 text-blue-800';
      case 'voted':
      case 'votée':
        return 'bg-green-100 text-green-800';
      case 'rejected':
      case 'rejetée':
        return 'bg-red-100 text-red-800';
      case 'implemented':
      case 'implémentée':
      case 'promulguée':
        return 'bg-purple-100 text-purple-800';
      case 'debated':
      case 'en débat':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = () => {
    if (onEdit && loi) {
      onEdit(loi);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{loi.titre}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className={getStatusColor(loi.état)}>{loi.état}</Badge>
            <Badge variant="outline">{loi.catégorie}</Badge>
            <Badge variant="outline">{loi.importance}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Proposé par:</span> {loi.proposeur}
            </div>
            <div>
              <span className="font-medium">Date:</span> {formatGameDate(loi.date)}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="whitespace-pre-wrap">{loi.description}</p>
          </div>

          {loi.contenu && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Contenu de la loi</h3>
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                  {loi.contenu}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Votes</h3>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 w-full justify-center">
                    Pour: {loi.votesPositifs}
                  </Badge>
                </div>
                <div>
                  <Badge variant="outline" className="bg-red-100 text-red-800 w-full justify-center">
                    Contre: {loi.votesNégatifs}
                  </Badge>
                </div>
                <div>
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 w-full justify-center">
                    Abst.: {loi.votesAbstention || 0}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Mots-clés</h3>
              <div className="flex flex-wrap gap-1">
                {loi.tags && loi.tags.length > 0 ? (
                  loi.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">Aucun mot-clé</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          {onEdit && (
            <Button onClick={handleEdit}>
              Modifier
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
