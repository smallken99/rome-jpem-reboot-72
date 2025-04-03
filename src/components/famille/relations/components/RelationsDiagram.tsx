
import React, { useRef, useEffect } from 'react';
import { FamilyRelation, RelationType } from '../types/relationTypes';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface RelationsDiagramProps {
  relations: FamilyRelation[];
}

export const RelationsDiagram: React.FC<RelationsDiagramProps> = ({ relations }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!canvasRef.current || relations.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajuster la taille du canvas
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = 400;
    }
    
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Définir le point central (pater familias)
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Dessiner le cercle central
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#9b87f5';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Vous', centerX, centerY);
    
    // Dessiner les relations
    const radius = 150;
    relations.forEach((relation, index) => {
      // Distribuer les nœuds en cercle
      const angle = (index / relations.length) * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Déterminer la couleur en fonction du type de relation
      let color = '#8E9196'; // neutre par défaut
      if (relation.type === 'positive') {
        color = '#22c55e'; // vert
      } else if (relation.type === 'negative') {
        color = '#ef4444'; // rouge
      }
      
      // Dessiner la ligne de relation
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Dessiner le nœud
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Texte du nœud
      ctx.fillStyle = '#fff';
      ctx.font = '11px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(relation.targetName, x, y - 5);
      ctx.font = '9px Arial';
      ctx.fillText(relation.targetRole, x, y + 8);
    });
    
  }, [relations]);
  
  const handleCanvasClick = () => {
    if (relations.length > 0) {
      toast({
        title: "Diagramme interactif",
        description: "Cliquez sur un nom pour voir les détails de la relation (fonctionnalité à venir)",
      });
    }
  };
  
  if (relations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Aucune relation à visualiser.</p>
        <p className="text-sm mt-2">Commencez par établir des relations avec d'autres familles romaines.</p>
      </div>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-6 min-h-[400px] flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full" 
          onClick={handleCanvasClick}
        />
      </CardContent>
    </Card>
  );
};
