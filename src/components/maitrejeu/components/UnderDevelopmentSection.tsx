
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Construction, Wrench, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface UnderDevelopmentSectionProps {
  title: string;
  description?: string;
  estimatedRelease?: string;
  features?: string[];
}

export const UnderDevelopmentSection: React.FC<UnderDevelopmentSectionProps> = ({ 
  title,
  description = "Cette section est actuellement en cours de développement et sera disponible prochainement.",
  estimatedRelease,
  features
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const iconVariants = {
    animate: {
      rotate: [0, 15, -15, 0],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "reverse" as const, 
        ease: "easeInOut" 
      }
    }
  };
  
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.3, duration: 0.5 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="border-amber-300">
        <CardHeader className="border-b border-amber-200 bg-amber-50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center text-amber-800">
              <Construction className="mr-2 h-5 w-5" />
              {title}
            </CardTitle>
            {estimatedRelease && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <Calendar className="mr-1 h-3.5 w-3.5" />
                Prévu: {estimatedRelease}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center p-6">
            <motion.div 
              className="bg-amber-100 p-4 rounded-full mb-4"
              variants={iconVariants}
              animate="animate"
            >
              <Wrench className="h-12 w-12 text-amber-500" />
            </motion.div>
            
            <h3 className="text-xl font-semibold mb-2">Section en développement</h3>
            
            <p className="text-muted-foreground max-w-md mb-4">
              {description}
            </p>
            
            {features && features.length > 0 && (
              <motion.div 
                className="w-full max-w-md mb-4"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                <h4 className="text-sm font-medium text-amber-800 mb-2">Fonctionnalités prévues :</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {features.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <span className="mr-2">•</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
            
            <div className="flex items-center text-sm bg-amber-50 border border-amber-200 rounded-md px-3 py-2 text-amber-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Des mises à jour régulières étendront les fonctionnalités disponibles.
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
