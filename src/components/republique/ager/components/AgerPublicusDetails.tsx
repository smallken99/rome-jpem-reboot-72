
import React, { useState } from 'react';
import { LandParcel } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Users, Building, Map, CircleDollarSign, Tractor, Wheat, Calendar, UserCog, Timer } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAgerPublicus } from '../hooks/useAgerPublicus';
import { ruralProperties } from '@/components/proprietes/data/buildings';

interface AgerPublicusDetailsProps {
  parcel: LandParcel;
  onClose: () => void;
}

export const AgerPublicusDetails: React.FC<AgerPublicusDetailsProps> = ({ parcel, onClose }) => {
  const { addOfficialToParcel, addSlavesToParcel, publicSlavePool } = useAgerPublicus();
  const [slaveCount, setSlaveCount] = useState(5);
  
  // Récupérer les détails du bâtiment rural
  const buildingDetails = ruralProperties[parcel.buildingType];
  
  return (
    <Card className="border border-rome-gold/30">
      <CardHeader className="relative">
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute right-2 top-2" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fermer</span>
        </Button>
        <CardTitle className="flex items-center gap-2 font-cinzel text-rome-navy">
          {parcel.buildingType.includes('domaine') && <Wheat className="h-5 w-5 text-rome-gold" />}
          {parcel.buildingType.includes('paturage') && <Tractor className="h-5 w-5 text-rome-gold" />}
          {parcel.name}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Map className="h-4 w-4" />
          <span>{parcel.location}</span>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <span>{parcel.size} iugera</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informations sur le bâtiment rural */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Building className="h-4 w-4 text-rome-gold" />
            Type de domaine
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-stone-50 rounded-md border">
            <div>
              <p className="font-medium text-base">
                {buildingDetails?.name || parcel.buildingType}
              </p>
              <p className="text-sm text-muted-foreground">
                {buildingDetails?.description || "Domaine agricole public"}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valeur estimée:</span>
                <span className="font-medium">{parcel.value.toLocaleString()} as</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Revenu potentiel:</span>
                <span className="font-medium">{buildingDetails?.income.toLocaleString()} as/an</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Coût d'entretien:</span>
                <span className="font-medium">{buildingDetails?.maintenanceCost.toLocaleString()} as/an</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statut de l'allocation */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-rome-gold" />
            Statut d'allocation
          </h3>
          
          <div className="p-3 bg-stone-50 rounded-md border">
            <div className="flex items-center justify-between">
              <Badge className={`
                ${parcel.status === 'allocated' && 'bg-blue-100 text-blue-800'}
                ${parcel.status === 'available' && 'bg-green-100 text-green-800'}
                ${parcel.status === 'disputed' && 'bg-orange-100 text-orange-800'}
                ${parcel.status === 'protected' && 'bg-purple-100 text-purple-800'}
              `}>
                {parcel.status === 'allocated' && 'Allouée'}
                {parcel.status === 'available' && 'Disponible'}
                {parcel.status === 'disputed' && 'Disputée'}
                {parcel.status === 'protected' && 'Protégée'}
              </Badge>
              
              {parcel.status !== 'allocated' && (
                <Button variant="outline" size="sm">
                  Attribuer
                </Button>
              )}
            </div>
            
            {parcel.allocation && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-rome-navy">
                    <AvatarFallback>{parcel.allocation.familyName?.charAt(0) || 'F'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Famille {parcel.allocation.familyName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Depuis {parcel.allocation.since}</span>
                      {parcel.allocation.until && (
                        <>
                          <Separator orientation="vertical" className="h-3 mx-1" />
                          <Timer className="h-3 w-3" />
                          <span>Jusqu'à {parcel.allocation.until}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Production */}
        {parcel.production && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Wheat className="h-4 w-4 text-rome-gold" />
              Production
            </h3>
            
            <div className="p-3 bg-stone-50 rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Type de production</p>
                  <p className="font-medium">{parcel.production.type}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Production actuelle</p>
                  <p className="font-medium">{parcel.production.amount.toLocaleString()} {parcel.production.unit}/an</p>
                </div>
                
                {parcel.production.potentialYield && (
                  <div>
                    <p className="text-sm text-muted-foreground">Rendement potentiel</p>
                    <p className="font-medium">{parcel.production.potentialYield.toLocaleString()} {parcel.production.unit}/an</p>
                  </div>
                )}
                
                {parcel.production.lastHarvest && (
                  <div>
                    <p className="text-sm text-muted-foreground">Dernière récolte</p>
                    <p className="font-medium">{parcel.production.lastHarvest}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Main d'œuvre */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <UserCog className="h-4 w-4 text-rome-gold" />
            Gestion de la main d'œuvre
          </h3>
          
          <div className="p-3 bg-stone-50 rounded-md border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Efficacité actuelle</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress 
                    value={parcel.workforce?.efficiency || 0} 
                    className="h-2 w-32" 
                  />
                  <span className="font-medium">{parcel.workforce?.efficiency || 0}%</span>
                </div>
              </div>
              
              {parcel.workforce?.requiredWorkforce && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Main d'œuvre requise</p>
                  <p className="font-medium">{parcel.workforce.requiredWorkforce} unités</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="p-2 rounded border bg-white">
                <p className="text-xs text-muted-foreground">Magistrats</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{parcel.workforce?.magistrates || 0}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => addOfficialToParcel && addOfficialToParcel(parcel.id, 'magistrate')}
                  >+</Button>
                </div>
              </div>
              
              <div className="p-2 rounded border bg-white">
                <p className="text-xs text-muted-foreground">Contremaîtres</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{parcel.workforce?.overseers || 0}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => addOfficialToParcel && addOfficialToParcel(parcel.id, 'overseer')}
                  >+</Button>
                </div>
              </div>
              
              <div className="p-2 rounded border bg-white">
                <p className="text-xs text-muted-foreground">Esclaves publics</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{parcel.workforce?.publicSlaves || 0}</p>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => setSlaveCount(Math.max(1, slaveCount - 1))}
                    >-</Button>
                    <span className="w-5 text-center text-sm">{slaveCount}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => setSlaveCount(slaveCount + 1)}
                    >+</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Esclaves disponibles: <span className="font-medium">{publicSlavePool || 0}</span>
              </p>
              <Button 
                variant="default"
                size="sm"
                onClick={() => addSlavesToParcel && addSlavesToParcel(parcel.id, slaveCount)}
                disabled={!publicSlavePool || publicSlavePool < slaveCount}
              >
                Assigner {slaveCount} esclave{slaveCount > 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Dépenses */}
        {parcel.expenses && (
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-rome-gold" />
              Dépenses annuelles
            </h3>
            
            <div className="grid grid-cols-3 gap-4 p-3 bg-stone-50 rounded-md border">
              <div>
                <p className="text-sm text-muted-foreground">Entretien</p>
                <p className="font-medium">{parcel.expenses.maintenance.toLocaleString()} as</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Salaires</p>
                <p className="font-medium">{parcel.expenses.salaries.toLocaleString()} as</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Fournitures</p>
                <p className="font-medium">{parcel.expenses.supplies.toLocaleString()} as</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="pt-3 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          
          {parcel.status === 'available' && (
            <Button variant="default">
              Attribuer ce domaine
            </Button>
          )}
          
          {parcel.status === 'allocated' && (
            <Button variant="destructive">
              Révoquer l'attribution
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
