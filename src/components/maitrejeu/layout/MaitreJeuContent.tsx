
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Gavel, Scale, Globe, BookText, Coins } from 'lucide-react';

// Sections du Maître du Jeu
import { GestionSenateurs } from '@/components/maitrejeu/GestionSenateurs';
import { GestionPolitique } from '@/components/maitrejeu/GestionPolitique';
import { GestionEquilibre } from '@/components/maitrejeu/GestionEquilibre';
import { GestionProvinces } from '@/components/maitrejeu/GestionProvinces';
import { GestionHistoire } from '@/components/maitrejeu/GestionHistoire';
import { GestionClients } from '@/components/maitrejeu/GestionClients';
import { GestionEconomie } from '@/components/maitrejeu/GestionEconomie';

interface MaitreJeuContentProps {
  activeTab: string;
}

export const MaitreJeuContent: React.FC<MaitreJeuContentProps> = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-cinzel text-rome-navy flex items-center gap-2">
          {activeTab === 'senateurs' && <Users className="h-5 w-5" />}
          {activeTab === 'clients' && <UserPlus className="h-5 w-5" />}
          {activeTab === 'politique' && <Gavel className="h-5 w-5" />}
          {activeTab === 'equilibre' && <Scale className="h-5 w-5" />}
          {activeTab === 'provinces' && <Globe className="h-5 w-5" />}
          {activeTab === 'histoire' && <BookText className="h-5 w-5" />}
          {activeTab === 'economie' && <Coins className="h-5 w-5" />}
          
          {activeTab === 'senateurs' && 'Gestion des Sénateurs'}
          {activeTab === 'clients' && 'Gestion des Clients'}
          {activeTab === 'politique' && 'Influence Politique'}
          {activeTab === 'equilibre' && 'Équilibrage du Jeu'}
          {activeTab === 'provinces' && 'Provinces & Guerres'}
          {activeTab === 'histoire' && 'Édition de l\'Histoire'}
          {activeTab === 'economie' && 'Économie & Finances'}
        </CardTitle>
        
        <CardDescription>
          {activeTab === 'senateurs' && 'Créez, modifiez ou supprimez des sénateurs et leurs caractéristiques.'}
          {activeTab === 'clients' && 'Gérez le réseau de clientèle, ajoutez ou supprimez des clients et assignez-les aux sénateurs.'}
          {activeTab === 'politique' && 'Ajoutez des lois, créez des événements politiques et des crises.'}
          {activeTab === 'equilibre' && 'Ajustez les richesses, relations et autres paramètres pour équilibrer le jeu.'}
          {activeTab === 'provinces' && 'Gérez les provinces et lancez des campagnes militaires.'}
          {activeTab === 'histoire' && 'Enregistrez et modifiez les événements historiques du jeu.'}
          {activeTab === 'economie' && 'Gérez les finances de la République, ajustez les impôts et contrôlez le trésor public.'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {activeTab === 'senateurs' && <GestionSenateurs />}
        {activeTab === 'clients' && <GestionClients />}
        {activeTab === 'politique' && <GestionPolitique />}
        {activeTab === 'equilibre' && <GestionEquilibre />}
        {activeTab === 'provinces' && <GestionProvinces />}
        {activeTab === 'histoire' && <GestionHistoire />}
        {activeTab === 'economie' && <GestionEconomie />}
      </CardContent>
      
      <CardFooter className="border-t p-4 flex justify-between">
        <p className="text-xs text-muted-foreground">
          Vos actions sont enregistrées et visibles par les administrateurs
        </p>
        
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          Voir le jeu côté joueur
        </Button>
      </CardFooter>
    </Card>
  );
};
