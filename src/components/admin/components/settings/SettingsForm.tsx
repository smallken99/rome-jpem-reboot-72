
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Save } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SettingsForm: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const [loading, setLoading] = React.useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    
    setLoading(true);
    await updateSettings(settings);
    setLoading(false);
  };
  
  if (!settings) {
    return <div>Chargement des paramètres...</div>;
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Paramètres généraux</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="siteName">Nom du site</Label>
              <Input 
                id="siteName" 
                value={settings.siteName}
                onChange={(e) => updateSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currentYear">Année actuelle (in-game)</Label>
              <Input 
                id="currentYear" 
                value={settings.currentYear}
                onChange={(e) => updateSettings({ ...settings, currentYear: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <Switch 
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => updateSettings({ ...settings, maintenanceMode: checked })}
              />
              <Label htmlFor="maintenanceMode">Mode maintenance</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="registrationOpen"
                checked={settings.registrationOpen}
                onCheckedChange={(checked) => updateSettings({ ...settings, registrationOpen: checked })}
              />
              <Label htmlFor="registrationOpen">Inscriptions ouvertes</Label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Paramètres de jeu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="gameSpeed">Vitesse du jeu</Label>
              <Select 
                value={settings.gameSpeed}
                onValueChange={(value) => updateSettings({ ...settings, gameSpeed: value as 'slow' | 'normal' | 'fast' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une vitesse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Lente</SelectItem>
                  <SelectItem value="normal">Normale</SelectItem>
                  <SelectItem value="fast">Rapide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxUsersPerFamily">Utilisateurs max par famille</Label>
              <Input 
                id="maxUsersPerFamily" 
                type="number"
                value={settings.maxUsersPerFamily}
                onChange={(e) => updateSettings({ ...settings, maxUsersPerFamily: parseInt(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxFamiliesCount">Nombre max de familles</Label>
              <Input 
                id="maxFamiliesCount" 
                type="number"
                value={settings.maxFamiliesCount}
                onChange={(e) => updateSettings({ ...settings, maxFamiliesCount: parseInt(e.target.value) })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currentTurn">Tour actuel</Label>
              <Input 
                id="currentTurn" 
                type="number"
                value={settings.currentTurn}
                onChange={(e) => updateSettings({ ...settings, currentTurn: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Bannière d'annonce</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="announcementEnabled"
              checked={settings.announcementBanner.enabled}
              onCheckedChange={(checked) => updateSettings({ 
                ...settings, 
                announcementBanner: { ...settings.announcementBanner, enabled: checked } 
              })}
            />
            <Label htmlFor="announcementEnabled">Activer la bannière</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="announcementMessage">Message d'annonce</Label>
            <Input 
              id="announcementMessage" 
              value={settings.announcementBanner.message}
              onChange={(e) => updateSettings({ 
                ...settings, 
                announcementBanner: { ...settings.announcementBanner, message: e.target.value } 
              })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="announcementType">Type d'annonce</Label>
            <Select 
              value={settings.announcementBanner.type}
              onValueChange={(value) => updateSettings({ 
                ...settings, 
                announcementBanner: { ...settings.announcementBanner, type: value as 'info' | 'warning' | 'error' | 'success' } 
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Information</SelectItem>
                <SelectItem value="warning">Avertissement</SelectItem>
                <SelectItem value="error">Erreur</SelectItem>
                <SelectItem value="success">Succès</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="flex items-center gap-2">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Enregistrer les modifications
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
