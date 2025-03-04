
import React from 'react';
import { Heart, Users, Shield } from 'lucide-react';

// Sample marriage alliances data
const alliances = [
  {
    id: '1',
    member: 'Gaius Tullius',
    spouse: 'Cornelia Minor',
    family: 'Gens Cornelia',
    status: 'active',
    benefits: ['Influence au Sénat +2', 'Relations commerciales'],
    date: '709 AUC'
  },
  {
    id: '2',
    member: 'Julia Tullia',
    spouse: 'Quintus Fabius',
    family: 'Gens Fabia',
    status: 'negotiating',
    benefits: ['Soutien militaire', 'Accès aux ports'],
    date: '710 AUC (prévu)'
  },
  {
    id: '3',
    member: 'Marcus Tullius (Oncle)',
    spouse: 'Claudia Major',
    family: 'Gens Claudia',
    status: 'active',
    benefits: ['Protection contre les rivalités', 'Accès aux marchés d\'Asie'],
    date: '702 AUC'
  },
  {
    id: '4',
    member: 'Lucia Tullia (Cousine)',
    spouse: 'Decimus Junius',
    family: 'Gens Junia',
    status: 'broken',
    benefits: ['Ancien accès aux mines d\'argent'],
    date: '704 AUC'
  }
];

export const MarriageAlliances: React.FC = () => {
  return (
    <div className="marriage-alliances">
      <div className="p-4 mb-4 bg-rome-parchment/50 rounded-md">
        <p className="italic text-muted-foreground">
          Les alliances matrimoniales sont essentielles pour étendre l'influence de votre Gens.
          Créez de nouvelles alliances ou renforcez celles existantes pour assurer la prospérité de votre famille.
        </p>
      </div>
      
      <div className="space-y-4">
        {alliances.map(alliance => (
          <AllianceCard key={alliance.id} alliance={alliance} />
        ))}
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="roman-btn-outline text-sm">
          <span className="mr-2">+</span> Proposer une Alliance
        </button>
      </div>
    </div>
  );
};

interface AllianceCardProps {
  alliance: {
    id: string;
    member: string;
    spouse: string;
    family: string;
    status: string;
    benefits: string[];
    date: string;
  };
}

const AllianceCard: React.FC<AllianceCardProps> = ({ alliance }) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return (
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
            Alliance Active
          </span>
        );
      case 'negotiating':
        return (
          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
            En Négociation
          </span>
        );
      case 'broken':
        return (
          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
            Alliance Rompue
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={`roman-card hover:shadow-md transition-all duration-300 p-4 border-l-4 ${
      alliance.status === 'active' ? 'border-l-green-500' : 
      alliance.status === 'negotiating' ? 'border-l-yellow-500' : 
      'border-l-red-500'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-cinzel">{alliance.member}</h3>
            <Heart className="h-4 w-4 text-rome-terracotta fill-rome-terracotta" />
            <h3 className="font-cinzel">{alliance.spouse}</h3>
          </div>
          
          <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
            <Shield className="h-4 w-4" />
            <span>{alliance.family}</span>
            <span className="text-rome-gold">•</span>
            <span>{alliance.date}</span>
          </div>
        </div>
        
        <div>
          {getStatusBadge(alliance.status)}
        </div>
      </div>
      
      <div className="mt-3">
        <h4 className="text-sm font-medium mb-1">Bénéfices:</h4>
        <ul className="text-sm space-y-1">
          {alliance.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-rome-gold">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {alliance.status !== 'broken' && (
        <div className="mt-3 flex justify-end">
          <button className="text-sm text-rome-terracotta hover:underline">
            Gérer l'alliance
          </button>
        </div>
      )}
    </div>
  );
};
