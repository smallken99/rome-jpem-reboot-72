
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building, 
  Home, 
  Plus,
  Coins,
  Wrench,
  ShoppingCart,
  Filter
} from 'lucide-react';

export const PropertyManagement: React.FC = () => {
  return (
    <RomanCard className="mb-6">
      <RomanCard.Header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="font-cinzel text-lg text-rome-navy">Gestion des Propriétés</h3>
        <div className="flex gap-2">
          <Button size="sm" className="roman-btn flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Nouvelle Construction
          </Button>
          <Button variant="outline" size="sm" className="roman-btn-outline flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            Acheter
          </Button>
        </div>
      </RomanCard.Header>
      <RomanCard.Content>
        <Tabs defaultValue="urbaines" className="mb-6">
          <TabsList className="w-full justify-start border border-rome-gold/30 bg-rome-parchment">
            <TabsTrigger value="urbaines" className="data-[state=active]:bg-white">Urbaines</TabsTrigger>
            <TabsTrigger value="rurales" className="data-[state=active]:bg-white">Rurales</TabsTrigger>
            <TabsTrigger value="entretien" className="data-[state=active]:bg-white">Entretien</TabsTrigger>
            <TabsTrigger value="revenus" className="data-[state=active]:bg-white">Rentabilité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="urbaines" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="col-span-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Type de propriété</Label>
                  <select id="propertyType" className="w-full rounded-md border border-rome-gold/30 p-2">
                    <optgroup label="Bâtiments d'Habitation">
                      <option value="insula">Insula</option>
                      <option value="villa">Villa</option>
                      <option value="domus">Domus</option>
                    </optgroup>
                    <optgroup label="Bâtiments Religieux">
                      <option value="statuaire">Statuaire</option>
                      <option value="autel">Autel</option>
                      <option value="temple">Temple</option>
                    </optgroup>
                    <optgroup label="Bâtiments Publics">
                      <option value="statue">Statue</option>
                      <option value="maison_indigents">Maison des Indigents</option>
                      <option value="thermes">Thermes</option>
                    </optgroup>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="propertySize">Taille</Label>
                  <select id="propertySize" className="w-full rounded-md border border-rome-gold/30 p-2">
                    <option value="petit">Petit</option>
                    <option value="moyen">Moyen</option>
                    <option value="grand">Grand</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="propertyLocation">Emplacement</Label>
                  <select id="propertyLocation" className="w-full rounded-md border border-rome-gold/30 p-2">
                    <option value="rome_forum">Rome - Forum</option>
                    <option value="rome_palatin">Rome - Palatin</option>
                    <option value="rome_subure">Rome - Subure</option>
                    <option value="ostie">Ostie</option>
                    <option value="campanie">Campanie</option>
                  </select>
                </div>
              </div>
              
              <div className="col-span-2 border-l border-rome-gold/20 pl-6">
                <div className="mb-4">
                  <h4 className="font-cinzel text-base text-rome-navy mb-2">Détails de construction</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Coût initial</Label>
                      <div className="text-lg font-bold text-rome-navy flex items-center">
                        <Coins className="h-4 w-4 mr-2 text-rome-gold" />
                        25,000 As
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Entretien annuel</Label>
                      <div className="text-lg font-bold text-rome-navy flex items-center">
                        <Wrench className="h-4 w-4 mr-2 text-rome-gold" />
                        1,200 As/an
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-cinzel text-base text-rome-navy mb-2">Avantages</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>+5 Points de popularité</li>
                    <li>Logement pour 8 clients</li>
                    <li>Revenu mensuel de 400 As</li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <Button className="roman-btn w-full sm:w-auto">Lancer la construction</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rurales" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="col-span-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ruralType">Type de propriété</Label>
                  <select id="ruralType" className="w-full rounded-md border border-rome-gold/30 p-2">
                    <optgroup label="Domaines (production agricole)">
                      <option value="domaine_cereales">Culture céréalière</option>
                      <option value="domaine_vignoble">Vignoble</option>
                      <option value="domaine_oliviers">Oliveraies</option>
                    </optgroup>
                    <optgroup label="Pâturages (production animale)">
                      <option value="paturage_equides">Élevage d'équidés</option>
                      <option value="paturage_bovins">Élevage de bovins</option>
                      <option value="paturage_moutons">Élevage de moutons</option>
                    </optgroup>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ruralSize">Taille</Label>
                  <select id="ruralSize" className="w-full rounded-md border border-rome-gold/30 p-2">
                    <option value="petit">Petit</option>
                    <option value="moyen">Moyen</option>
                    <option value="grand">Grand</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ruralLocation">Région</Label>
                  <select id="ruralLocation" className="w-full rounded-md border border-rome-gold/30 p-2">
                    <option value="latium">Latium</option>
                    <option value="campanie">Campanie</option>
                    <option value="etrurie">Étrurie</option>
                    <option value="apulie">Apulie</option>
                    <option value="sicile">Sicile</option>
                  </select>
                </div>
              </div>
              
              <div className="col-span-2 border-l border-rome-gold/20 pl-6">
                <div className="mb-4">
                  <h4 className="font-cinzel text-base text-rome-navy mb-2">Détails d'acquisition</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Prix d'achat</Label>
                      <div className="text-lg font-bold text-rome-navy flex items-center">
                        <Coins className="h-4 w-4 mr-2 text-rome-gold" />
                        75,000 As
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Coûts d'exploitation</Label>
                      <div className="text-lg font-bold text-rome-navy flex items-center">
                        <Wrench className="h-4 w-4 mr-2 text-rome-gold" />
                        5,000 As/an
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-cinzel text-base text-rome-navy mb-2">Production</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>200 modii de blé par an</li>
                    <li>Valeur estimée: 8,000 As</li>
                    <li>Capacité de stockage nécessaire: 200 modii</li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <Button className="roman-btn w-full sm:w-auto">Acquérir le domaine</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="entretien" className="pt-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-cinzel text-base text-rome-navy">Maintenance des propriétés</h4>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="roman-btn-outline flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    Filtrer
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-rome-gold/10 text-left">
                      <th className="p-3 font-cinzel">Propriété</th>
                      <th className="p-3 font-cinzel">Type</th>
                      <th className="p-3 font-cinzel">Emplacement</th>
                      <th className="p-3 font-cinzel">État</th>
                      <th className="p-3 font-cinzel">Coût d'entretien</th>
                      <th className="p-3 font-cinzel">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-rome-gold/10">
                      <td className="p-3 font-semibold">Domus du Palatin</td>
                      <td className="p-3">Domus (Grand)</td>
                      <td className="p-3">Rome, Palatin</td>
                      <td className="p-3"><span className="text-green-600 font-medium">Excellent</span></td>
                      <td className="p-3">2,500 As/an</td>
                      <td className="p-3">
                        <Button variant="outline" size="sm" className="roman-btn-outline text-xs">Réparer</Button>
                      </td>
                    </tr>
                    <tr className="border-b border-rome-gold/10 bg-rome-marble/20">
                      <td className="p-3 font-semibold">Insula de Subure</td>
                      <td className="p-3">Insula (Moyen)</td>
                      <td className="p-3">Rome, Subure</td>
                      <td className="p-3"><span className="text-yellow-600 font-medium">Moyen</span></td>
                      <td className="p-3">1,200 As/an</td>
                      <td className="p-3">
                        <Button size="sm" className="roman-btn text-xs">Réparer</Button>
                      </td>
                    </tr>
                    <tr className="border-b border-rome-gold/10">
                      <td className="p-3 font-semibold">Domaine de Campanie</td>
                      <td className="p-3">Culture céréalière (Grand)</td>
                      <td className="p-3">Campanie</td>
                      <td className="p-3"><span className="text-green-500 font-medium">Bon</span></td>
                      <td className="p-3">4,000 As/an</td>
                      <td className="p-3">
                        <Button variant="outline" size="sm" className="roman-btn-outline text-xs">Réparer</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="revenus" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-rome-gold/10 text-left">
                        <th className="p-3 font-cinzel">Propriété</th>
                        <th className="p-3 font-cinzel">Type</th>
                        <th className="p-3 font-cinzel">Revenus</th>
                        <th className="p-3 font-cinzel">Dépenses</th>
                        <th className="p-3 font-cinzel">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-rome-gold/10">
                        <td className="p-3 font-semibold">Domus du Palatin</td>
                        <td className="p-3">Habitation</td>
                        <td className="p-3 text-green-600">0 As/an</td>
                        <td className="p-3 text-red-600">2,500 As/an</td>
                        <td className="p-3 text-red-600">-2,500 As/an</td>
                      </tr>
                      <tr className="border-b border-rome-gold/10 bg-rome-marble/20">
                        <td className="p-3 font-semibold">Insula de Subure</td>
                        <td className="p-3">Habitation</td>
                        <td className="p-3 text-green-600">4,800 As/an</td>
                        <td className="p-3 text-red-600">1,200 As/an</td>
                        <td className="p-3 text-green-600">+3,600 As/an</td>
                      </tr>
                      <tr className="border-b border-rome-gold/10">
                        <td className="p-3 font-semibold">Domaine de Campanie</td>
                        <td className="p-3">Agricole</td>
                        <td className="p-3 text-green-600">12,000 As/an</td>
                        <td className="p-3 text-red-600">4,000 As/an</td>
                        <td className="p-3 text-green-600">+8,000 As/an</td>
                      </tr>
                      <tr className="border-b border-rome-gold/10 bg-rome-marble/20">
                        <td className="p-3 font-semibold">Vignobles du Latium</td>
                        <td className="p-3">Agricole</td>
                        <td className="p-3 text-green-600">16,000 As/an</td>
                        <td className="p-3 text-red-600">3,500 As/an</td>
                        <td className="p-3 text-green-600">+12,500 As/an</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-rome-gold/20 font-bold">
                        <td colSpan={2} className="p-3">Total</td>
                        <td className="p-3 text-green-600">32,800 As/an</td>
                        <td className="p-3 text-red-600">11,200 As/an</td>
                        <td className="p-3 text-green-600">+21,600 As/an</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <RomanCard>
                  <RomanCard.Header>
                    <h3 className="font-cinzel text-base text-rome-navy">Rentabilité</h3>
                  </RomanCard.Header>
                  <RomanCard.Content>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Propriétés les plus rentables</p>
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>Vignobles du Latium (+12,500 As/an)</li>
                          <li>Domaine de Campanie (+8,000 As/an)</li>
                          <li>Insula de Subure (+3,600 As/an)</li>
                        </ol>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Propriétés déficitaires</p>
                        <ol className="list-decimal pl-5 space-y-1">
                          <li>Domus du Palatin (-2,500 As/an)</li>
                        </ol>
                      </div>
                      
                      <div className="pt-4 border-t border-rome-gold/20">
                        <p className="text-sm text-muted-foreground mb-2">Recommandations</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-rome-gold mr-2">•</span>
                            Investir dans plus de propriétés locatives comme des insulae pour augmenter les revenus
                          </li>
                          <li className="flex items-start">
                            <span className="text-rome-gold mr-2">•</span>
                            Envisager d'agrandir les vignobles pour maximiser les profits
                          </li>
                        </ul>
                      </div>
                    </div>
                  </RomanCard.Content>
                </RomanCard>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </RomanCard.Content>
    </RomanCard>
  );
};
