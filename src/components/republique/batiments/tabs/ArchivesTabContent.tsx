
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scroll, Building } from 'lucide-react';

interface HistoricalBuilding {
  id: string;
  name: string;
  period: string;
  location: string;
  description: string;
  purpose: string;
  historicalFigure?: string;
}

export const ArchivesTabContent: React.FC = () => {
  const historicalBuildings: HistoricalBuilding[] = [
    {
      id: "hist-1",
      name: "Temple de Jupiter Capitolin",
      period: "509 av. J.-C.",
      location: "Mont Capitolin",
      description: "Le principal temple de la triade capitoline (Jupiter, Junon et Minerve), construit à la fin de la période royale.",
      purpose: "Temple principal dédié aux divinités protectrices de Rome",
      historicalFigure: "Tarquin le Superbe"
    },
    {
      id: "hist-2",
      name: "Via Appia",
      period: "312 av. J.-C.",
      location: "De Rome vers le sud de l'Italie",
      description: "La première et la plus importante des voies romaines, reliant Rome à Capoue puis étendue à Brindisi.",
      purpose: "Route militaire et commerciale",
      historicalFigure: "Appius Claudius Caecus"
    },
    {
      id: "hist-3",
      name: "Basilique Aemilia",
      period: "179 av. J.-C.",
      location: "Forum Romain",
      description: "L'une des premières basiliques civiles de Rome, lieu d'administration et de commerce.",
      purpose: "Administration et commerce",
      historicalFigure: "Marcus Aemilius Lepidus"
    },
    {
      id: "hist-4",
      name: "Temple de la Concorde",
      period: "121 av. J.-C.",
      location: "Forum Romain",
      description: "Construit pour commémorer la fin des troubles liés aux réformes des Gracques.",
      purpose: "Temple symbolisant l'harmonie et la paix sociale",
      historicalFigure: "Lucius Opimius"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-cinzel">Archives historiques des constructions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Les bâtiments historiques sont les témoins de la grandeur passée de Rome et des accomplissements 
            de nos ancêtres. Chaque bâtiment raconte l'histoire d'une époque et des hommes qui l'ont façonnée.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {historicalBuildings.map(building => (
              <Card key={building.id} className="bg-white border-rome-gold/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-rome-gold/10 p-3 rounded-full">
                      <Building className="h-6 w-6 text-rome-navy" />
                    </div>
                    <div>
                      <h3 className="font-cinzel font-semibold mb-1">{building.name}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        <Scroll className="h-3 w-3 mr-1" />
                        <span>{building.period}</span>
                        <span className="mx-2">•</span>
                        <span>{building.location}</span>
                      </div>
                      <p className="text-sm mb-2">{building.description}</p>
                      <div className="text-xs">
                        <span className="font-medium">Fonction:</span> {building.purpose}
                      </div>
                      {building.historicalFigure && (
                        <div className="text-xs mt-1">
                          <span className="font-medium">Initié par:</span> {building.historicalFigure}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
