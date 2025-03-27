
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  HeartHandshake, 
  Scroll, 
  GraduationCap, 
  TreePine, 
  Crown
} from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

export const FamilyActions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-cinzel">Actions Familiales</CardTitle>
        <CardDescription>
          Gérez votre famille et prenez des décisions importantes pour son avenir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ActionButton
            icon={<TreePine className="h-5 w-5" />}
            label="Arbre Généalogique"
            title="Visualisez l'histoire de votre famille"
            onClick={() => navigate('/famille/tree')}
          />
          
          <ActionButton
            icon={<HeartHandshake className="h-5 w-5" />}
            label="Alliances Matrimoniales"
            title="Établissez des alliances par le mariage"
            onClick={() => navigate('/famille/alliances')}
          />
          
          <ActionButton
            icon={<GraduationCap className="h-5 w-5" />}
            label="Éducation"
            title="Formez la prochaine génération"
            onClick={() => navigate('/famille/education')}
          />
          
          <ActionButton
            icon={<Scroll className="h-5 w-5" />}
            label="Héritage"
            title="Planifiez votre succession"
            onClick={() => navigate('/famille/inheritance')}
          />
          
          <ActionButton
            icon={<Crown className="h-5 w-5" />}
            label="Réputation"
            title="Suivez la réputation de votre famille"
            onClick={() => navigate('/famille/reputation')}
          />
          
          <ActionButton
            icon={<Users className="h-5 w-5" />}
            label="Relations"
            title="Gérez les relations avec d'autres familles"
            onClick={() => navigate('/famille/relations')}
          />
        </div>
      </CardContent>
    </Card>
  );
};
