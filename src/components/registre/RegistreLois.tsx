
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Scale, Award, Shield, Users, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Loi {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  date: string;
  proposee_par: string;
  statut: 'active' | 'abrogée' | 'modifiée';
  icon: React.ReactNode;
}

export const RegistreLois: React.FC = () => {
  const lois: Loi[] = [
    {
      id: "lex-001",
      titre: "Lex Hortensia",
      description: "Les décisions des assemblées plébéiennes (plebiscita) ont force de loi pour l'ensemble du peuple romain.",
      categorie: "Constitutionnelle",
      date: "287 av. J.-C.",
      proposee_par: "Quintus Hortensius",
      statut: "active",
      icon: <Award className="h-5 w-5" />
    },
    {
      id: "lex-002",
      titre: "Lex Canuleia",
      description: "Autorise le mariage entre patriciens et plébéiens.",
      categorie: "Sociale",
      date: "445 av. J.-C.",
      proposee_par: "Gaius Canuleius",
      statut: "active",
      icon: <Users className="h-5 w-5" />
    },
    {
      id: "lex-003",
      titre: "Lex Poetelia Papiria",
      description: "Abolit la servitude pour dettes (nexum).",
      categorie: "Économique",
      date: "326 av. J.-C.",
      proposee_par: "C. Poetelius Libo Visolus",
      statut: "active",
      icon: <Scale className="h-5 w-5" />
    },
    {
      id: "lex-004",
      titre: "Lex Villia Annalis",
      description: "Fixe l'âge minimum pour occuper les magistratures.",
      categorie: "Politique",
      date: "180 av. J.-C.",
      proposee_par: "Lucius Villius",
      statut: "active",
      icon: <Shield className="h-5 w-5" />
    },
  ];

  return (
    <div className="space-y-6">
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Lois Fondamentales</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            {lois.map((loi) => (
              <div key={loi.id} className="border border-rome-gold/30 rounded-md p-4 hover:border-rome-gold/60 transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-rome-gold/10 p-2 rounded-full">
                    {loi.icon}
                  </div>
                  <div>
                    <h4 className="font-cinzel font-semibold text-rome-navy">{loi.titre}</h4>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>{loi.date}</span>
                      <span>•</span>
                      <span>Proposée par {loi.proposee_par}</span>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      loi.statut === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : loi.statut === 'abrogée' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {loi.statut.charAt(0).toUpperCase() + loi.statut.slice(1)}
                    </span>
                  </div>
                </div>
                <Separator className="my-3" />
                <p className="text-sm">{loi.description}</p>
                <div className="mt-2 flex justify-between">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {loi.categorie}
                  </span>
                  <button className="text-xs text-rome-navy hover:text-rome-terracotta flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    Détails complets
                  </button>
                </div>
              </div>
            ))}
          </div>
        </RomanCard.Content>
      </RomanCard>

      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Lois Récentes</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="bg-rome-parchment/50 p-4 rounded-md border border-rome-gold/20 text-center">
            <p className="italic text-muted-foreground">Aucune nouvelle loi n'a été promulguée récemment.</p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
