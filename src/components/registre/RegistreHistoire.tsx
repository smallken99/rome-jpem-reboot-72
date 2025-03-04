
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Milestone, BookOpen, Crown, Scroll, Sword } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface EvenementHistorique {
  id: string;
  titre: string;
  description: string;
  date: string;
  categorie: 'politique' | 'militaire' | 'culturel' | 'religieux';
  importance: 1 | 2 | 3; // 1 = majeur, 3 = mineur
}

export const RegistreHistoire: React.FC = () => {
  const evenements: EvenementHistorique[] = [
    {
      id: "hist-001",
      titre: "Fondation de Rome",
      description: "Selon la tradition, Rome est fondée par Romulus sur le Palatin.",
      date: "753 av. J.-C.",
      categorie: "politique",
      importance: 1
    },
    {
      id: "hist-002",
      titre: "Chute de la monarchie",
      description: "Expulsion du dernier roi étrusque, Tarquin le Superbe, et établissement de la République.",
      date: "509 av. J.-C.",
      categorie: "politique",
      importance: 1
    },
    {
      id: "hist-003",
      titre: "Les Douze Tables",
      description: "Première codification écrite du droit romain.",
      date: "451-450 av. J.-C.",
      categorie: "politique",
      importance: 1
    },
    {
      id: "hist-004",
      titre: "Sac de Rome par les Gaulois",
      description: "Rome est pillée par les Gaulois menés par Brennus.",
      date: "390 av. J.-C.",
      categorie: "militaire",
      importance: 2
    },
    {
      id: "hist-005",
      titre: "Première Guerre Punique",
      description: "Premier conflit majeur entre Rome et Carthage.",
      date: "264-241 av. J.-C.",
      categorie: "militaire",
      importance: 1
    },
  ];

  const getCategorieIcon = (categorie: string) => {
    switch (categorie) {
      case 'politique': return <Crown className="h-5 w-5" />;
      case 'militaire': return <Sword className="h-5 w-5" />;
      case 'culturel': return <BookOpen className="h-5 w-5" />;
      case 'religieux': return <Scroll className="h-5 w-5" />;
      default: return <Milestone className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Chronologie de la République</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-rome-gold/30"></div>
            
            <div className="space-y-8">
              {evenements.map((event, index) => (
                <div key={event.id} className="relative pl-12">
                  <div className="absolute left-0 w-10 h-10 rounded-full bg-rome-parchment border-2 border-rome-gold/50 flex items-center justify-center">
                    {getCategorieIcon(event.categorie)}
                  </div>
                  
                  <div className="bg-white border border-rome-gold/30 rounded-md p-4 hover:border-rome-gold/60 transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="font-cinzel font-semibold text-rome-navy">{event.titre}</h4>
                      <span className="bg-rome-gold/10 px-2 py-0.5 rounded text-xs font-medium">
                        {event.date}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-sm">{event.description}</p>
                    
                    <div className="mt-3 flex">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">
                        {event.categorie}
                      </span>
                      
                      <div className="ml-auto flex">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-full ${i < event.importance ? 'bg-rome-terracotta' : 'bg-gray-200'} ${i > 0 ? 'ml-1' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
