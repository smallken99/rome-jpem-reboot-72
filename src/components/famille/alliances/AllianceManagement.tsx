
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Coins, Heart, Users } from 'lucide-react';
import { useTimeStore } from '@/utils/timeSystem';
import { familyAlliances } from '@/data/alliances';
import { characters } from '@/data/characters';
import { Character } from '@/types/character';
import { toast } from 'sonner';

export const AllianceManagement = () => {
  const { femaleId } = useParams<{ femaleId: string }>();
  const navigate = useNavigate();
  const { year } = useTimeStore();
  
  const [female, setFemale] = useState<Character | null>(null);
  const [dowryAmount, setDowryAmount] = useState<number>(10000);
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  const [negotiationTerms, setNegotiationTerms] = useState<string>('');
  const [marriageYear, setMarriageYear] = useState<number>(year + 1);
  
  // Potential families for alliance (in a real app, this would come from a database)
  const potentialFamilies = [
    { id: 'cornelia', name: 'Gens Cornelia', prestige: 'Haute', influence: '+++', wealth: '++' },
    { id: 'julia', name: 'Gens Julia', prestige: 'Très haute', influence: '++++', wealth: '+++' },
    { id: 'claudia', name: 'Gens Claudia', prestige: 'Moyenne', influence: '++', wealth: '++++' },
    { id: 'aemilia', name: 'Gens Aemilia', prestige: 'Haute', influence: '+++', wealth: '++' },
    { id: 'valeria', name: 'Gens Valeria', prestige: 'Moyenne', influence: '++', wealth: '+' },
  ];
  
  // Load female character data
  useEffect(() => {
    if (femaleId) {
      const foundFemale = characters.find(char => char.id === femaleId && char.gender === 'female');
      if (foundFemale) {
        setFemale(foundFemale);
      } else {
        // Handle case when female character is not found
        toast.error("Personnage féminin non trouvé");
        navigate('/famille/alliances');
      }
    }
  }, [femaleId, navigate]);
  
  // Calculate potential benefits based on selected family
  const calculateBenefits = () => {
    const family = potentialFamilies.find(f => f.id === selectedFamily);
    
    if (!family) return [];
    
    const benefits = [
      `Alliance avec une famille de prestige ${family.prestige.toLowerCase()}`,
    ];
    
    // Add benefits based on family influence
    if (family.influence === '++++') {
      benefits.push('Influence politique majeure au Sénat');
      benefits.push('Accès aux magistratures supérieures');
    } else if (family.influence === '+++') {
      benefits.push('Influence politique significative');
      benefits.push('Soutien dans les votes populaires');
    } else {
      benefits.push('Réseau de contacts politiques');
    }
    
    // Add benefits based on family wealth
    if (family.wealth === '++++' || family.wealth === '+++') {
      benefits.push('Opportunités commerciales lucratives');
    }
    
    return benefits;
  };
  
  // Handle alliance negotiation
  const handleNegotiateAlliance = () => {
    const family = potentialFamilies.find(f => f.id === selectedFamily);
    
    if (!family || !female) {
      toast.error("Veuillez sélectionner une famille");
      return;
    }
    
    if (dowryAmount < 5000) {
      toast.error("La dot est trop faible pour cette alliance");
      return;
    }
    
    toast.success(`Négociations entamées avec la famille ${family.name}`);
    
    // In a real application, we would save this to a database
    // For now, we'll just redirect back to alliances page
    setTimeout(() => {
      navigate('/famille/alliances');
    }, 1500);
  };
  
  if (!female) {
    return (
      <div className="p-4 text-center">
        <p>Chargement des informations...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-rome-parchment/50 p-4 rounded-md">
        <h2 className="font-cinzel text-xl mb-2 flex items-center gap-2">
          <Heart className="h-5 w-5 text-rome-terracotta" />
          Alliance Matrimoniale pour {female.name}
        </h2>
        <p className="text-muted-foreground text-sm">
          Âge: {female.age} ans • Statut: {female.role || "Fille de la famille"}
        </p>
        <div className="mt-4 text-sm">
          <p>
            Les alliances matrimoniales sont essentielles pour l'expansion de l'influence de votre Gens. 
            Une dot généreuse attirera des familles plus prestigieuses et renforcera votre position politique.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-cinzel text-lg mb-4">Dot et Conditions</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dowry">Montant de la dot (en As)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="dowry"
                  type="number"
                  value={dowryAmount}
                  onChange={(e) => setDowryAmount(parseInt(e.target.value) || 0)}
                  min={1000}
                  className="flex-1"
                />
                <Coins className="h-5 w-5 text-rome-gold" />
              </div>
              <p className="text-xs text-muted-foreground">
                La dot minimale recommandée est de 5,000 As pour une alliance respectable.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Année de mariage prévue</Label>
              <Input
                id="year"
                type="number"
                value={marriageYear}
                onChange={(e) => setMarriageYear(parseInt(e.target.value) || year)}
                min={year}
                max={year + 5}
              />
              <p className="text-xs text-muted-foreground">
                L'année actuelle est {year} AUC. Le mariage peut être planifié jusqu'à 5 ans dans le futur.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="terms">Termes de négociation additionnels</Label>
              <Textarea
                id="terms"
                value={negotiationTerms}
                onChange={(e) => setNegotiationTerms(e.target.value)}
                placeholder="Conditions spéciales, préférences, ou demandes particulières..."
                className="min-h-[120px]"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-cinzel text-lg mb-4">Sélection de Famille</h3>
          
          <div className="space-y-4">
            {potentialFamilies.map((family) => (
              <Card 
                key={family.id} 
                className={`border cursor-pointer transition-colors hover:border-rome-gold ${
                  selectedFamily === family.id ? 'border-rome-gold bg-rome-gold/5' : ''
                }`}
                onClick={() => setSelectedFamily(family.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-cinzel">{family.name}</h4>
                    <span className="text-sm">Prestige: {family.prestige}</span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-rome-navy" />
                      <span>Influence: {family.influence}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-rome-gold" />
                      <span>Richesse: {family.wealth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {selectedFamily && (
        <RomanCard className="mt-6">
          <RomanCard.Header>
            <h3 className="font-cinzel flex items-center gap-2">
              <Handshake className="h-5 w-5 text-rome-gold" />
              Bénéfices potentiels de l'alliance
            </h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <ul className="space-y-2">
              {calculateBenefits().map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-rome-gold">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex justify-end gap-4">
              <ActionButton
                variant="outline"
                label="Annuler"
                to="/famille/alliances"
              />
              <ActionButton
                label="Entamer les négociations"
                icon={<Handshake className="h-4 w-4" />}
                onClick={handleNegotiateAlliance}
              />
            </div>
          </RomanCard.Content>
        </RomanCard>
      )}
    </div>
  );
};
