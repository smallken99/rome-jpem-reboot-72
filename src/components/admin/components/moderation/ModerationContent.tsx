
import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { ModLogItem } from './ModLogItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportAlert } from './ReportAlert';
import { Button } from '@/components/ui/button';
import { Settings, RefreshCw } from 'lucide-react';

export const ModerationContent: React.FC = () => {
  const { modLogs, pendingReports } = useAdmin();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Modération</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Actualiser
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Paramètres
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="reports">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            Signalements 
            {pendingReports > 0 && (
              <span className="inline-flex items-center justify-center rounded-full bg-red-100 text-red-700 w-5 h-5 text-xs">
                {pendingReports}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="logs">Journal de modération</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Signalements en attente</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingReports > 0 ? (
                <div className="space-y-4">
                  <ReportAlert 
                    id="r2"
                    reporter="Livia Drusilla"
                    target="Cicero"
                    reason="Insultes"
                    contentType="comment"
                    timestamp={new Date(Date.now() - 2 * 86400000)}
                    severity="medium"
                  />
                  <ReportAlert 
                    id="r3"
                    reporter="Julius Caesar"
                    target="Livia Drusilla"
                    reason="Diffusion de rumeurs"
                    contentType="post"
                    timestamp={new Date(Date.now() - 1 * 86400000)}
                    severity="low"
                  />
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Aucun signalement en attente</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Journal d'actions de modération</CardTitle>
            </CardHeader>
            <CardContent>
              {modLogs.length > 0 ? (
                <div className="divide-y">
                  {modLogs.map(log => (
                    <ModLogItem key={log.id} log={log} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Aucune action de modération enregistrée</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
