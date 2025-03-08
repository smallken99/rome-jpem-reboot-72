
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHistoireEntries } from "./useHistoireEntries";
import { Season } from "../../types/common";
import { HistoireEntry } from "../../types/histoire";

// Extend the HistoireEntry type to include the additional fields we need
interface ExtendedHistoireEntry extends Omit<HistoireEntry, "id"> {
  personnagesImpliqués?: string[];
  type?: string;
}

export function HistoireEntryForm() {
  const { createHistoireEntry, currentYear, currentSeason } = useHistoireEntries();

  const [entry, setEntry] = useState<ExtendedHistoireEntry>({
    titre: "",
    contenu: "",
    date: {
      year: currentYear,
      season: currentSeason
    },
    catégorie: "POLITIQUE",
    importance: "normale",
    auteur: "Système",
    visible: true,
    personnagesImpliqués: []
  });

  const handlePersonnageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const personnages = e.target.value.split(",").map(p => p.trim());
    setEntry({
      ...entry,
      personnagesImpliqués: personnages
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (field: keyof ExtendedHistoireEntry, value: string) => {
    setEntry({
      ...entry,
      [field]: value
    });
  };

  const handleSeasonChange = (value: Season) => {
    setEntry({
      ...entry,
      date: { ...entry.date, season: value }
    });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntry({
      ...entry,
      date: { ...entry.date, year: parseInt(e.target.value, 10) }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare the data to match the expected HistoireEntry type
    // Remove any extended properties before submitting
    const { personnagesImpliqués, type, ...standardEntry } = entry;
    
    // Add the entry to the histoire records
    createHistoireEntry(standardEntry);
    
    // Reset the form
    setEntry({
      titre: "",
      contenu: "",
      date: {
        year: currentYear,
        season: currentSeason
      },
      catégorie: "POLITIQUE",
      importance: "normale",
      auteur: "Système",
      visible: true,
      personnagesImpliqués: []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="titre">Titre</Label>
        <Input
          id="titre"
          name="titre"
          value={entry.titre}
          onChange={handleInputChange}
          placeholder="Titre de l'entrée historique"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Année</Label>
          <Input
            id="year"
            name="year"
            type="number"
            value={entry.date.year}
            onChange={handleYearChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="season">Saison</Label>
          <Select
            value={entry.date.season}
            onValueChange={(value) => handleSeasonChange(value as Season)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir la saison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SPRING">Printemps</SelectItem>
              <SelectItem value="SUMMER">Été</SelectItem>
              <SelectItem value="AUTUMN">Automne</SelectItem>
              <SelectItem value="WINTER">Hiver</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="catégorie">Catégorie</Label>
          <Select
            value={entry.catégorie}
            onValueChange={(value) => handleSelectChange("catégorie", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="POLITIQUE">Politique</SelectItem>
              <SelectItem value="MILITAIRE">Militaire</SelectItem>
              <SelectItem value="ECONOMIQUE">Économique</SelectItem>
              <SelectItem value="SOCIAL">Social</SelectItem>
              <SelectItem value="RELIGION">Religion</SelectItem>
              <SelectItem value="CULTURE">Culture</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="importance">Importance</Label>
          <Select
            value={entry.importance}
            onValueChange={(value) => handleSelectChange("importance", value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir l'importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="majeure">Majeure</SelectItem>
              <SelectItem value="normale">Normale</SelectItem>
              <SelectItem value="mineure">Mineure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="personnagesImpliqués">Personnages impliqués (séparés par des virgules)</Label>
        <Input
          id="personnagesImpliqués"
          name="personnagesImpliqués"
          value={entry.personnagesImpliqués?.join(", ") || ""}
          onChange={handlePersonnageChange}
          placeholder="Personnages impliqués"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contenu">Contenu</Label>
        <Textarea
          id="contenu"
          name="contenu"
          value={entry.contenu}
          onChange={handleInputChange}
          placeholder="Détails de l'événement historique"
          rows={6}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="auteur">Auteur</Label>
        <Input
          id="auteur"
          name="auteur"
          value={entry.auteur}
          onChange={handleInputChange}
          placeholder="Auteur de l'entrée"
          required
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Enregistrer l'entrée historique</Button>
      </div>
    </form>
  );
}
