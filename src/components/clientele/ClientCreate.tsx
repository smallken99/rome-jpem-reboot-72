
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { PageHeader } from '@/components/ui-custom/PageHeader';

const ClientCreate = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: '',
    type: 'artisan_commercant',
    subType: '',
    location: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form values:', formValues);
    // Ici, vous implémenteriez la logique pour créer un nouveau client
    // Pour l'instant, nous redirigeons simplement vers la liste des clients
    navigate('/clientele');
  };
  
  const handleCancel = () => {
    navigate('/clientele');
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title="Nouveau Client" 
          subtitle="Créer un nouveau client dans votre réseau de clientèle"
        />
        
        <Button variant="outline" size="sm" className="roman-btn-outline" onClick={handleCancel}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Annuler
        </Button>
      </div>
      
      <div className="roman-card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom du client</Label>
                <Input
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  placeholder="Nom complet"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type de client</Label>
                <select
                  id="type"
                  name="type"
                  value={formValues.type}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-rome-gold/30 p-2"
                  required
                >
                  <option value="artisan_commercant">Artisan & Commerçant</option>
                  <option value="proprietaire">Propriétaire Terrien</option>
                  <option value="politicien">Politicien</option>
                  <option value="religieux">Religieux</option>
                  <option value="pegre">Pègre</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="subType">Profession/Spécialité</Label>
                <Input
                  id="subType"
                  name="subType"
                  value={formValues.subType}
                  onChange={handleInputChange}
                  placeholder="Ex: Forgeron, Boulanger..."
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Quartier/Localisation</Label>
                <select
                  id="location"
                  name="location"
                  value={formValues.location}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-rome-gold/30 p-2"
                  required
                >
                  <option value="Forum">Forum</option>
                  <option value="Subure">Subure</option>
                  <option value="Palatin">Palatin</option>
                  <option value="Aventin">Aventin</option>
                  <option value="Esquilin">Esquilin</option>
                  <option value="Capitole">Capitole</option>
                  <option value="Quirinal">Quirinal</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="loyalty">Loyauté initiale</Label>
                <select
                  id="loyalty"
                  name="loyalty"
                  className="w-full rounded-md border border-rome-gold/30 p-2"
                  required
                >
                  <option value="faible">Faible</option>
                  <option value="moyenne">Moyenne</option>
                  <option value="forte">Forte</option>
                </select>
              </div>
              
              <div>
                <Label>Niveaux d'influence</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label htmlFor="political" className="text-xs">Politique</Label>
                    <Input
                      id="political"
                      name="political"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="popular" className="text-xs">Populaire</Label>
                    <Input
                      id="popular"
                      name="popular"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="religious" className="text-xs">Religieuse</Label>
                    <Input
                      id="religious"
                      name="religious"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue="1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="roman-btn">
              <Save className="mr-1 h-4 w-4" />
              Créer le client
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ClientCreate;
