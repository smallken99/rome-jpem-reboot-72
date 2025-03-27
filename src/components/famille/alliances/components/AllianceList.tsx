
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { familyAlliances } from '@/data/alliances';

export const AllianceList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Alliances Matrimoniales Actives</h3>
        <p className="text-sm text-gray-500">
          Les alliances par mariage avec d'autres familles romaines
        </p>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Famille</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Établie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {familyAlliances.length > 0 ? (
                familyAlliances.map(alliance => (
                  <TableRow key={alliance.id}>
                    <TableCell className="font-medium">{alliance.family}</TableCell>
                    <TableCell>{alliance.type}</TableCell>
                    <TableCell>{alliance.established}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={alliance.status === 'active' ? 'default' : 'outline'}
                        className={
                          alliance.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                          alliance.status === 'pending' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                          'bg-gray-100 text-gray-800 hover:bg-gray-100'
                        }
                      >
                        {alliance.status === 'active' ? 'Active' : 
                         alliance.status === 'pending' ? 'En attente' : 
                         'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500 italic">
                    Aucune alliance matrimoniale active
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="mt-8 mb-4">
        <h3 className="text-lg font-medium">Autres Alliances</h3>
        <p className="text-sm text-gray-500">
          Alliances politiques, commerciales et militaires
        </p>
      </div>
      
      <Card>
        <CardContent className="p-4 text-center text-gray-500 italic">
          Aucune autre alliance en cours
        </CardContent>
      </Card>
    </div>
  );
};
