
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
  Crown,
  Handshake
} from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { motion } from 'framer-motion';

export const FamilyActions: React.FC = () => {
  const navigate = useNavigate();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle className="font-cinzel text-2xl text-primary">Actions Familiales</CardTitle>
        <CardDescription className="text-base">
          Gérez votre famille et prenez des décisions importantes pour son avenir
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <ActionButton
              icon={<TreePine className="h-5 w-5" />}
              label="Arbre Généalogique"
              description="Visualisez l'histoire et la lignée de votre famille"
              title="Visualisez l'histoire de votre famille"
              onClick={() => navigate('/famille/tree')}
              className="w-full h-full"
              variant="outline"
              size="lg"
            />
          </motion.div>
          
          <motion.div variants={item}>
            <ActionButton
              icon={<HeartHandshake className="h-5 w-5" />}
              label="Alliances Matrimoniales"
              description="Établissez des alliances par le mariage"
              title="Établissez des alliances par le mariage"
              onClick={() => navigate('/famille/alliances')}
              className="w-full h-full"
              variant="outline"
              size="lg"
            />
          </motion.div>
          
          <motion.div variants={item}>
            <ActionButton
              icon={<GraduationCap className="h-5 w-5" />}
              label="Éducation"
              description="Formez la prochaine génération de votre famille"
              title="Formez la prochaine génération"
              onClick={() => navigate('/famille/education')}
              className="w-full h-full"
              variant="outline"
              size="lg"
            />
          </motion.div>
          
          <motion.div variants={item}>
            <ActionButton
              icon={<Scroll className="h-5 w-5" />}
              label="Héritage"
              description="Planifiez votre succession et votre patrimoine"
              title="Planifiez votre succession"
              onClick={() => navigate('/famille/inheritance')}
              className="w-full h-full"
              variant="outline"
              size="lg"
            />
          </motion.div>
          
          <motion.div variants={item}>
            <ActionButton
              icon={<Crown className="h-5 w-5" />}
              label="Réputation"
              description="Suivez la réputation et l'influence de votre famille"
              title="Suivez la réputation de votre famille"
              onClick={() => navigate('/famille/reputation')}
              className="w-full h-full"
              variant="outline"
              size="lg"
            />
          </motion.div>
          
          <motion.div variants={item}>
            <ActionButton
              icon={<Handshake className="h-5 w-5" />}
              label="Relations"
              description="Gérez les relations avec d'autres familles et factions"
              title="Gérez les relations avec d'autres familles"
              onClick={() => navigate('/famille/relations')}
              className="w-full h-full"
              variant="outline"
              size="lg"
            />
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
