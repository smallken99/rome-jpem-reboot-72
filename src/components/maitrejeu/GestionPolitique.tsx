import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { v4 as uuid } from 'uuid';
import {
  Loi,
  LoiType,
  LoiState,
  ImportanceType
} from './types/lois';
import { useToast } from "@/components/ui/use-toast"
import { useGameTime } from '@/hooks/useGameTime';
import { gameDateToString } from './components/lois/utils/dateConverter';
import { LoiTimeline } from './components/lois/LoiTimeline';

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  type: z.enum(['political', 'economic', 'social', 'military', 'religious', 'constitutional', 'judicial'], {
    required_error: "Please select law type.",
  }),
  importance: z.enum(['low', 'medium', 'high', 'critical'], {
    required_error: "Please select importance.",
  }),
  clauses: z.string().array(),
  commentaires: z.string().array(),
  tags: z.string().array(),
});

export const GestionPolitique = () => {
  const [lois, setLois] = useState<Loi[]>([]);
  const { toast } = useToast()
  const { currentDate } = useGameTime();

  useEffect(() => {
    // Charger les lois depuis le localStorage au montage du composant
    const storedLois = localStorage.getItem('lois');
    if (storedLois) {
      setLois(JSON.parse(storedLois));
    }
  }, []);

  useEffect(() => {
    // Sauvegarder les lois dans le localStorage à chaque modification
    localStorage.setItem('lois', JSON.stringify(lois));
  }, [lois]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "political",
      importance: "medium",
      clauses: [],
      commentaires: [],
      tags: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  const handleAjouterLoi = () => {
    // Make sure to provide all required fields when creating a new Loi
    const newLoi: Loi = {
      id: uuid(),
      titre: `Proposition du ${gameDateToString(currentDate)}`,
      description: "Nouvelle proposition de loi",
      proposeur: "Sénat",
      catégorie: "Politique",
      date: currentDate,
      dateProposition: currentDate,
      état: "proposée" as LoiState,
      importance: "medium" as ImportanceType,
      votesPositifs: 0,
      votesNégatifs: 0,
      votesAbstention: 0,
      soutiens: [],
      opposants: [],
      clauses: [],
      commentaires: [],
      type: "political" as LoiType, // Use valid LoiType
      impacts: {},
      effets: [],
      history: [
        {
          date: currentDate,
          status: "proposée" as LoiState
        }
      ],
      tags: []
    };
    setLois([...lois, newLoi]);
  };

  const handleSupprimerLoi = (id: string) => {
    setLois(lois.filter(loi => loi.id !== id));
  };

  const handleModifierLoi = (id: string, updatedLoi: Loi) => {
    setLois(lois.map(loi => {
      if (loi.id === id) {
        // Fix any other incorrect type usage
        loi.type = validateLoiType(loi.type); // Ensure we have a valid type
        return { ...loi, ...updatedLoi };
      }
      return loi;
    }));
  };

  // Helper function to validate LoiType
  function validateLoiType(type: string): LoiType {
    const validTypes = [
      'political', 'economic', 'social', 'military',
      'religious', 'constitutional', 'judicial'
    ];

    return validTypes.includes(type) ? type as LoiType : 'political';
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Lois</h1>
      <Card>
        <CardHeader>
          <CardTitle>Liste des Lois</CardTitle>
          <CardDescription>
            Ajouter, supprimer et modifier les lois.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Titre</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Importance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lois.map((loi) => (
                <TableRow key={loi.id}>
                  <TableCell className="font-medium">{loi.titre}</TableCell>
                  <TableCell>{loi.description}</TableCell>
                  <TableCell>{loi.type}</TableCell>
                  <TableCell>{loi.importance}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="secondary" size="sm" onClick={() => handleSupprimerLoi(loi.id)}>
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleAjouterLoi}>Ajouter une loi</Button>
        </CardContent>
      </Card>
    </div>
  );
};
