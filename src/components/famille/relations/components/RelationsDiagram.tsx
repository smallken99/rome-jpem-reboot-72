
import React, { useRef, useEffect, useState } from 'react';
import { FamilyRelation, RelationType, PropertyRelation } from '../types/relationTypes';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Building, Users, ScrollText } from 'lucide-react';

interface RelationsDiagramProps {
  relations: FamilyRelation[];
  onRelationClick?: (relation: FamilyRelation) => void;
}

export const RelationsDiagram: React.FC<RelationsDiagramProps> = ({ relations, onRelationClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const [selectedRelation, setSelectedRelation] = useState<FamilyRelation | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [relationNodes, setRelationNodes] = useState<Array<{relation: FamilyRelation, x: number, y: number, radius: number}>>([]);
  
  // Determine the color based on relation type
  const getRelationColor = (type: RelationType): string => {
    switch (type) {
      case 'positive': return '#22c55e'; // vert
      case 'negative': return '#ef4444'; // rouge
      default: return '#8E9196'; // neutre
    }
  };
  
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
    
    // Store nodes data for interaction
    const nodes: Array<{relation: FamilyRelation, x: number, y: number, radius: number}> = [];
    
    // Dessiner les relations
    const radius = 150;
    relations.forEach((relation, index) => {
      // Distribuer les nœuds en cercle
      const angle = (index / relations.length) * Math.PI * 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Déterminer la couleur en fonction du type de relation
      const color = getRelationColor(relation.type);
      
      // Dessiner la ligne de relation
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = relation.strength ? Math.max(1, Math.min(5, relation.strength / 20)) : 2;
      ctx.stroke();
      
      // Dessiner le nœud
      const nodeRadius = 25;
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Add a slight shadow for depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      // Store node data for interaction
      nodes.push({
        relation,
        x,
        y,
        radius: nodeRadius
      });
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Texte du nœud
      ctx.fillStyle = '#fff';
      ctx.font = '11px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(relation.targetName, x, y - 5);
      ctx.font = '9px Arial';
      ctx.fillText(relation.targetRole, x, y + 8);
      
      // Indicateur de propriétés partagées si présent
      if (relation.properties && relation.properties.length > 0) {
        ctx.beginPath();
        ctx.arc(x + nodeRadius - 5, y - nodeRadius + 5, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#F97316'; // Orange pour indiquer des propriétés
        ctx.fill();
      }
    });
    
    setRelationNodes(nodes);
    
  }, [relations]);
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (relations.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if a node was clicked
    for (const node of relationNodes) {
      const dx = x - node.x;
      const dy = y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= node.radius) {
        setSelectedRelation(node.relation);
        setShowDialog(true);
        
        if (onRelationClick) {
          onRelationClick(node.relation);
        }
        return;
      }
    }
    
    toast({
      title: "Diagramme interactif",
      description: "Cliquez sur un nom pour voir les détails de la relation",
    });
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
          className="w-full h-full cursor-pointer" 
          onClick={handleCanvasClick}
        />
      </CardContent>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Relation avec {selectedRelation?.targetName}
            </DialogTitle>
            <DialogDescription>
              {selectedRelation?.targetRole} - {selectedRelation?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Force de la relation:</span>
                <Badge variant={selectedRelation?.type === 'positive' ? 'default' : selectedRelation?.type === 'negative' ? 'destructive' : 'secondary'}>
                  {selectedRelation?.strength || 50}/100
                </Badge>
              </div>
              
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${selectedRelation?.type === 'positive' ? 'bg-green-500' : selectedRelation?.type === 'negative' ? 'bg-red-500' : 'bg-gray-500'}`}
                  style={{ width: `${selectedRelation?.strength || 50}%` }}
                ></div>
              </div>
            </div>
            
            {selectedRelation?.tags && selectedRelation.tags.length > 0 && (
              <div>
                <span className="text-sm font-medium">Tags:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedRelation.tags.map((tag, i) => (
                    <Badge key={i} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {selectedRelation?.properties && selectedRelation.properties.length > 0 && (
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Building className="h-4 w-4" />
                  <span className="text-sm font-medium">Propriétés partagées:</span>
                </div>
                <div className="space-y-2">
                  {selectedRelation.properties.map((prop, i) => (
                    <div key={i} className="text-sm border rounded-md p-2">
                      <div className="font-medium">{prop.propertyName}</div>
                      <div className="text-xs text-muted-foreground">
                        Type: <Badge variant="outline" className="text-xs">{prop.type}</Badge>
                      </div>
                      <div className="text-xs mt-1">{prop.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedRelation?.benefits && selectedRelation.benefits.length > 0 && (
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <ScrollText className="h-4 w-4" />
                  <span className="text-sm font-medium">Avantages:</span>
                </div>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  {selectedRelation.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
