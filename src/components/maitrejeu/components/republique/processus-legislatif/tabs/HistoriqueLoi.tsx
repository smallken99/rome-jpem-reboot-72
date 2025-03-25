
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { formatGameDateForRender } from '@/components/maitrejeu/components/lois/utils/formatGameDate';
import { Loi } from '@/components/maitrejeu/types/lois';
import { 
  Calendar, 
  FileText, 
  User, 
  Bookmark, 
  BookText, 
  ThumbsUp, 
  ThumbsDown, 
  Minus
} from 'lucide-react';

interface HistoriqueLoiProps {
  lois: Loi[];
  onViewLoi?: (loi: Loi) => void;
}

export const HistoriqueLoi: React.FC<HistoriqueLoiProps> = ({ lois }) => {
  const sortedLois = [...lois].sort((a, b) => {
    // Supposons que les dates plus récentes doivent venir en premier
    const dateA = a.date || a.dateProposition || { year: 0, season: "" };
    const dateB = b.date || b.dateProposition || { year: 0, season: "" };
    
    if (typeof dateA === 'object' && typeof dateB === 'object' && 'year' in dateA && 'year' in dateB) {
      if (dateA.year !== dateB.year) {
        return dateB.year - dateA.year;
      }
      // Comparaison simplifiée des saisons
      const seasons = { "Ver": 0, "Aestas": 1, "Autumnus": 2, "Hiems": 3 };
      const seasonA = seasons[dateA.season as keyof typeof seasons] || 0;
      const seasonB = seasons[dateB.season as keyof typeof seasons] || 0;
      return seasonB - seasonA;
    }
    
    // Fallback pour d'autres formats de date
    return 0;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historique législatif</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh]">
            <div className="space-y-8 pr-4">
              {sortedLois.map(loi => (
                <div key={loi.id} className="relative pl-6 border-l border-muted-foreground/20">
                  <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary"></div>
                  
                  <div className="mb-2">
                    <div className="font-medium text-lg">{loi.titre || loi.title}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {formatGameDateForRender(loi.date || loi.dateProposition)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Proposée par</div>
                        <div className="text-sm text-muted-foreground">
                          {loi.proposeur || loi.auteur || loi.proposedBy || "Inconnu"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <BookText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Catégorie</div>
                        <div className="text-sm text-muted-foreground">
                          {loi.catégorie || loi.category || loi.categorieId || loi.catégorieId || "Non classée"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Bookmark className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Statut</div>
                        <div>
                          <StatusBadge status={loi.état || loi.status || loi.statut || "Inconnue"} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Vote</div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1 text-green-500" />
                            <span>{loi.votesPositifs || loi.votesFor || loi.votes?.pour || 0}</span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsDown className="h-3 w-3 mr-1 text-red-500" />
                            <span>{loi.votesNégatifs || loi.votesAgainst || loi.votes?.contre || 0}</span>
                          </div>
                          <div className="flex items-center">
                            <Minus className="h-3 w-3 mr-1 text-amber-500" />
                            <span>{loi.votesAbstention || loi.votes?.abstention || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm font-medium">Description</div>
                    <p className="text-sm text-muted-foreground">
                      {loi.description || "Aucune description fournie"}
                    </p>
                  </div>
                  
                  {loi.effets && (
                    <div className="mb-3">
                      <div className="text-sm font-medium">Effets</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Array.isArray(loi.effets) ? (
                          loi.effets.map((effet, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-50">
                              {typeof effet === 'string' ? effet : JSON.stringify(effet)}
                            </Badge>
                          ))
                        ) : (
                          Object.entries(loi.effets).map(([key, value]) => (
                            <Badge key={key} variant="outline" className="bg-blue-50">
                              {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Séparateur entre les lois */}
                  <div className="mt-8 pt-4 border-t border-muted"></div>
                </div>
              ))}
              
              {sortedLois.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto opacity-20" />
                  <h3 className="mt-2 text-xl font-medium">Aucune loi trouvée</h3>
                  <p className="mt-1">L'historique législatif est vide.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

// Composant utilitaire pour afficher le statut avec la bonne couleur
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let color = "bg-muted text-muted-foreground";
  
  if (status.toLowerCase() === 'promulguée' || status.toLowerCase() === 'en vigueur' || status.toLowerCase() === 'active') {
    color = "bg-green-100 text-green-800";
  } else if (status.toLowerCase() === 'rejetée' || status.toLowerCase() === 'rejected') {
    color = "bg-red-100 text-red-800";
  } else if (status.toLowerCase() === 'proposée' || status.toLowerCase() === 'en discussion' || status.toLowerCase() === 'en délibération') {
    color = "bg-amber-100 text-amber-800";
  } else if (status.toLowerCase() === 'adoptée') {
    color = "bg-blue-100 text-blue-800";
  } else if (status.toLowerCase() === 'abrogée' || status.toLowerCase() === 'expired') {
    color = "bg-gray-100 text-gray-800";
  }
  
  return (
    <Badge variant="outline" className={color}>
      {status}
    </Badge>
  );
};
