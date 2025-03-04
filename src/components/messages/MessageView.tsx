
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Reply, Forward, Archive, Trash2, Flag, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const MessageView: React.FC = () => {
  return (
    <RomanCard className="h-[70vh]">
      <RomanCard.Header>
        <div className="flex justify-between items-center">
          <h3 className="font-cinzel text-lg text-rome-navy">Concernant la situation politique</h3>
          <div className="flex gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      </RomanCard.Header>
      <RomanCard.Content className="h-[calc(70vh-4rem)] flex flex-col">
        <div className="bg-rome-parchment/50 rounded-md p-3 mb-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium">De: Marcus Tullius Cicero</p>
              <p className="text-sm">À: Caius Julius Caesar</p>
            </div>
            <p className="text-sm text-muted-foreground">Id. Apr.</p>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none flex-1 overflow-auto">
          <p className="font-cinzel text-lg mb-3">Ave Caesar,</p>
          
          <p className="mb-3">
            J'espère que cette missive vous trouve en bonne santé et que les affaires de l'État prospèrent sous votre direction éclairée.
          </p>
          
          <p className="mb-3">
            Je vous écris pour vous informer des derniers développements politiques à Rome pendant votre absence. Le Sénat s'est réuni trois fois depuis votre départ, et plusieurs questions importantes ont été soulevées concernant l'administration des provinces orientales.
          </p>
          
          <p className="mb-3">
            Caton continue de s'opposer à vos propositions, mais j'ai pu rallier plusieurs sénateurs à notre cause. Votre fidèle allié, Lucius Cornelius, a prononcé un discours éloquent en faveur de vos réformes agraires, ce qui a considérablement influencé l'opinion des indécis.
          </p>
          
          <p className="mb-3">
            Quant à la situation avec Pompée, elle reste délicate. Il affiche publiquement son soutien, mais mes sources m'informent qu'il tient des réunions privées avec vos opposants. Je vous conseille la prudence dans vos futures transactions avec lui.
          </p>
          
          <p className="mb-3">
            J'attends avec impatience votre retour à Rome pour discuter plus en détail de ces affaires et de notre stratégie pour les mois à venir.
          </p>
          
          <p className="font-cinzel">
            Avec mes respects les plus sincères,<br />
            Marcus Tullius Cicero
          </p>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1 roman-btn-outline">
              <Reply className="h-4 w-4" />
              <span>Répondre</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-1 roman-btn-outline">
              <Forward className="h-4 w-4" />
              <span>Transférer</span>
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="roman-btn-outline">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="roman-btn-outline">
              <Flag className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="roman-btn-outline text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
