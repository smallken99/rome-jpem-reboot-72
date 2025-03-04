
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, X } from 'lucide-react';
import { ClientType } from './ClientCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const ClientCreate: React.FC = () => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    name: '',
    type: 'artisan_commercant' as ClientType,
    subType: '',
    location: '',
    loyalty: 'neutre',
    influences: {
      political: 30,
      popular: 30,
      religious: 30
    }
  });
  
  const handleGoBack = () => {
    navigate('/clientele');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClientData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleInfluenceChange = (type: keyof typeof clientData.influences, value: number[]) => {
    setClientData(prev => ({
      ...prev,
      influences: {
        ...prev.influences,
        [type]: value[0]
      }
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, on pourrait envoyer les données à une API
    console.log('Client data submitted:', clientData);
    
    // Afficher un toast de succès
    toast.success('Client ajouté avec succès');
    
    // Rediriger vers la liste des clients
    navigate('/clientele');
  };
  
  return (
    <Layout>
      <PageHeader 
        title="Ajouter un nouveau client" 
        subtitle="Enregistrer un plébéien dans votre réseau de clientèle"
        actions={
          <Button variant="outline" onClick={handleGoBack} className="roman-btn-outline gap-1">
            <ArrowLeft className="h-4 w-4" />
            Annuler
          </Button>
        }
      />
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel">Informations Principales</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={clientData.name}
                    onChange={handleChange}
                    placeholder="Ex: Marcus Junius" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type de client</Label>
                  <select 
                    id="type" 
                    name="type" 
                    value={clientData.type}
                    onChange={handleChange}
                    className="w-full rounded-md border border-rome-gold/30 p-2"
                    required
                  >
                    <option value="artisan_commercant">Artisan & Commerçant</option>
                    <option value="politicien">Politicien</option>
                    <option value="religieux">Religieux</option>
                    <option value="proprietaire">Propriétaire</option>
                    <option value="pegre">Pègre</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subType">Occupation précise</Label>
                  <Input 
                    id="subType" 
                    name="subType" 
                    value={clientData.subType}
                    onChange={handleChange}
                    placeholder="Ex: Forgeron, Boulanger, etc." 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Lieu de résidence</Label>
                  <select 
                    id="location" 
                    name="location" 
                    value={clientData.location}
                    onChange={handleChange}
                    className="w-full rounded-md border border-rome-gold/30 p-2"
                    required
                  >
                    <option value="">Sélectionnez un quartier...</option>
                    <option value="Palatin">Palatin</option>
                    <option value="Capitole">Capitole</option>
                    <option value="Forum">Forum</option>
                    <option value="Subure">Subure</option>
                    <option value="Aventin">Aventin</option>
                    <option value="Caelius">Caelius</option>
                    <option value="Esquilin">Esquilin</option>
                    <option value="Quirinal">Quirinal</option>
                    <option value="Viminal">Viminal</option>
                    <option value="Champ de Mars">Champ de Mars</option>
                    <option value="Trastevere">Trastevere</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loyalty">Loyauté initiale</Label>
                  <select 
                    id="loyalty" 
                    name="loyalty" 
                    value={clientData.loyalty}
                    onChange={handleChange}
                    className="w-full rounded-md border border-rome-gold/30 p-2"
                    required
                  >
                    <option value="hostile">Hostile</option>
                    <option value="méfiant">Méfiant</option>
                    <option value="neutre">Neutre</option>
                    <option value="favorable">Favorable</option>
                    <option value="dévoué">Dévoué</option>
                  </select>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
          
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel">Influence</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Influence Politique ({clientData.influences.political})</Label>
                  <Slider 
                    value={[clientData.influences.political]} 
                    onValueChange={(value) => handleInfluenceChange('political', value)}
                    min={0} 
                    max={100} 
                    step={1}
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Influence Populaire ({clientData.influences.popular})</Label>
                  <Slider 
                    value={[clientData.influences.popular]} 
                    onValueChange={(value) => handleInfluenceChange('popular', value)}
                    min={0} 
                    max={100} 
                    step={1}
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Influence Religieuse ({clientData.influences.religious})</Label>
                  <Slider 
                    value={[clientData.influences.religious]} 
                    onValueChange={(value) => handleInfluenceChange('religious', value)}
                    min={0} 
                    max={100} 
                    step={1}
                  />
                </div>
                
                <div className="pt-6 border-t border-rome-gold/20">
                  <div className="text-sm text-muted-foreground mb-4">
                    <p>L'influence détermine l'impact que ce client peut avoir sur différentes sphères de la société romaine.</p>
                    <p className="mt-2">Un client avec une influence élevée vous apportera plus de bénéfices, mais exigera également plus d'attention.</p>
                  </div>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleGoBack} className="gap-1">
            <X className="h-4 w-4" />
            Annuler
          </Button>
          <Button type="submit" className="roman-btn gap-1">
            <Save className="h-4 w-4" />
            Enregistrer le client
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default ClientCreate;
