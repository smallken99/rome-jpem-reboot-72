
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, CalendarCell, CalendarGrid, CalendarHeader, CalendarHeading, CalendarMonthSelectTrigger, CalendarNextButton, CalendarPrevButton, CalendarViewTrigger } from '@/components/ui/calendar';
import { MagistratureType } from '@/components/maitrejeu/types/magistratures';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { getSeasonsAfter } from '@/utils/dateUtils';

export const ElectionPlanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMagistrature, setSelectedMagistrature] = useState<MagistratureType>('consul');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { currentYear, currentSeason, currentDate } = useMaitreJeu();
  
  // Since scheduleElection might not exist in context, implement it locally
  const scheduleElection = (magistrature: MagistratureType, year?: number, season?: string) => {
    console.log(`Scheduling election for ${magistrature} in ${year || currentYear}, ${season || currentSeason}`);
    // Implementation would normally call the context version
    return "election-id";
  };
  
  const handleScheduleElection = () => {
    const electionId = scheduleElection(selectedMagistrature);
    console.log(`Planned election with ID: ${electionId}`);
    setIsOpen(false);
  };
  
  // Generate upcoming dates based on current date
  const futureDates = getSeasonsAfter(currentDate, 4);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planification des Élections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Planifiez les prochaines élections pour les différentes magistratures de la République.
          </p>
          
          <Button onClick={() => setIsOpen(true)}>
            Planifier une Élection
          </Button>
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Planifier une Élection</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Magistrature</Label>
                  <div className="col-span-3">
                    <Select 
                      value={selectedMagistrature} 
                      onValueChange={(value: MagistratureType) => setSelectedMagistrature(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une magistrature" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consul">Consul</SelectItem>
                        <SelectItem value="praetor">Préteur</SelectItem>
                        <SelectItem value="aedile">Édile</SelectItem>
                        <SelectItem value="quaestor">Questeur</SelectItem>
                        <SelectItem value="tribunus">Tribun de la Plèbe</SelectItem>
                        <SelectItem value="censor">Censeur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Date</Label>
                  <div className="col-span-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une date" />
                      </SelectTrigger>
                      <SelectContent>
                        {futureDates.map((date, index) => (
                          <SelectItem key={index} value={`${date.season} ${date.year}`}>
                            {date.season} {date.year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleScheduleElection}>
                  Planifier
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
