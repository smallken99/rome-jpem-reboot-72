
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { PageHeader } from '@/components/ui-custom/PageHeader';

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Ici, vous récupéreriez les détails du client avec l'ID spécifié
  // Pour l'instant, nous utilisons des données fictives
  
  const handleBack = () => {
    navigate('/clientele');
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title="Détails du Client" 
          subtitle={`Informations complètes et gestion de la relation client #${id}`}
        />
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="roman-btn-outline" onClick={handleBack}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Retour
          </Button>
          <Button variant="outline" size="sm" className="roman-btn-outline">
            <Edit className="mr-1 h-4 w-4" />
            Modifier
          </Button>
          <Button variant="destructive" size="sm">
            <Trash2 className="mr-1 h-4 w-4" />
            Supprimer
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          {/* Détails du client */}
          <div className="roman-card mb-6">
            <h3 className="font-cinzel text-lg mb-4">Informations Personnelles</h3>
            <p>À implémenter: Affichage des détails du client basé sur l'ID: {id}</p>
          </div>
          
          {/* Historique des interactions */}
          <div className="roman-card mb-6">
            <h3 className="font-cinzel text-lg mb-4">Historique des Interactions</h3>
            <p>À implémenter: Liste chronologique des interactions avec ce client</p>
          </div>
        </div>
        
        <div className="col-span-1">
          {/* Actions */}
          <div className="roman-card mb-6">
            <h3 className="font-cinzel text-lg mb-4">Actions</h3>
            <div className="space-y-3">
              <Button className="roman-btn w-full">Accorder une Faveur</Button>
              <Button className="roman-btn w-full">Envoyer un Message</Button>
              <Button className="roman-btn w-full">Organiser une Rencontre</Button>
            </div>
          </div>
          
          {/* Métriques */}
          <div className="roman-card">
            <h3 className="font-cinzel text-lg mb-4">Métriques de Relation</h3>
            <p>À implémenter: Affichage des métriques de la relation avec ce client</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDetail;
