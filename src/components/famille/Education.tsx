
import React from 'react';
import { GraduationCap, Sword, Building, ScrollText, ShieldQuestion } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Sample education data
const children = [
  {
    id: '1',
    name: 'Titus Tullius',
    age: 15,
    gender: 'male',
    currentEducation: {
      type: 'military',
      mentor: 'Centurion Flavius Aquila',
      progress: 65,
      skills: ['Tactique de base', 'Maniement du glaive', 'Discipline militaire']
    }
  },
  {
    id: '2',
    name: 'Lucia Tullia Minor',
    age: 12,
    gender: 'female',
    currentEducation: {
      type: 'political',
      mentor: 'Sénateur Marcus Porcius',
      progress: 40,
      skills: ['Rhétorique', 'Histoire romaine', 'Poésie grecque']
    }
  },
  {
    id: '3',
    name: 'Quintus Tullius',
    age: 10,
    gender: 'male',
    currentEducation: {
      type: 'none',
      mentor: null,
      progress: 0,
      skills: []
    }
  },
];

// Education paths
const educationPaths = [
  {
    type: 'military',
    icon: <Sword className="h-5 w-5" />,
    title: 'Carrière Militaire',
    description: 'Formation aux arts de la guerre, stratégie et leadership sur le champ de bataille.',
    minAge: 12,
    suitableFor: 'male',
    benefits: ['Accès aux légions', 'Réputation militaire', 'Possibilité de triomphe'],
    careers: ['Tribun militaire', 'Légat', 'Général']
  },
  {
    type: 'political',
    icon: <Building className="h-5 w-5" />,
    title: 'Carrière Politique',
    description: 'Éducation en rhétorique, droit et philosophie pour exceller au Sénat.',
    minAge: 10,
    suitableFor: 'both',
    benefits: ['Éloquence', 'Réseau politique', 'Prestige au Sénat'],
    careers: ['Questeur', 'Édile', 'Préteur', 'Consul']
  },
  {
    type: 'commercial',
    icon: <Coins className="h-5 w-5" />,
    title: 'Commerce et Agriculture',
    description: 'Formation à la gestion des finances, commerce maritime et administration des terres.',
    minAge: 14,
    suitableFor: 'both',
    benefits: ['Prospérité économique', 'Réseau commercial', 'Gestion efficace des terres'],
    careers: ['Negotiator', 'Publicani', 'Argentarii']
  },
  {
    type: 'religious',
    icon: <ScrollText className="h-5 w-5" />,
    title: 'Carrière Religieuse',
    description: 'Étude des rites sacrés, divination et traditions religieuses romaines.',
    minAge: 12,
    suitableFor: 'both',
    benefits: ['Prestige religieux', 'Influence spirituelle', 'Exemption militaire'],
    careers: ['Pontife', 'Augure', 'Flamine', 'Vestale (femmes uniquement)']
  },
];

export const Education: React.FC = () => {
  return (
    <div className="education">
      <div className="p-4 mb-4 bg-rome-parchment/50 rounded-md">
        <p className="italic text-muted-foreground">
          L'éducation des enfants déterminera l'avenir de votre Gens. Choisissez judicieusement 
          leurs parcours pour renforcer votre influence dans différents domaines de la République.
        </p>
      </div>
      
      <div className="children-education mb-6">
        <h3 className="font-cinzel text-lg mb-3 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-rome-terracotta" />
          Éducation en Cours
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map(child => (
            <ChildEducationCard key={child.id} child={child} />
          ))}
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="education-paths">
        <h3 className="font-cinzel text-lg mb-3 flex items-center gap-2">
          <ShieldQuestion className="h-5 w-5 text-rome-terracotta" />
          Parcours Éducatifs Disponibles
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {educationPaths.map((path, idx) => (
            <EducationPathCard key={idx} path={path} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ChildEducationCardProps {
  child: {
    id: string;
    name: string;
    age: number;
    gender: string;
    currentEducation: {
      type: string;
      mentor: string | null;
      progress: number;
      skills: string[];
    }
  };
}

const ChildEducationCard: React.FC<ChildEducationCardProps> = ({ child }) => {
  const getEducationTypeIcon = (type: string) => {
    switch(type) {
      case 'military':
        return <Sword className="h-4 w-4" />;
      case 'political':
        return <Building className="h-4 w-4" />;
      case 'commercial':
        return <Coins className="h-4 w-4" />;
      case 'religious':
        return <ScrollText className="h-4 w-4" />;
      default:
        return <ShieldQuestion className="h-4 w-4" />;
    }
  };
  
  const getEducationTypeName = (type: string) => {
    switch(type) {
      case 'military':
        return 'Militaire';
      case 'political':
        return 'Politique';
      case 'commercial':
        return 'Commerce';
      case 'religious':
        return 'Religieuse';
      default:
        return 'Aucune';
    }
  };
  
  return (
    <div className="roman-card p-4 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-cinzel">{child.name}</h4>
          <p className="text-sm text-muted-foreground">
            {child.age} ans • {child.gender === 'male' ? 'Garçon' : 'Fille'}
          </p>
        </div>
        
        {child.currentEducation.type !== 'none' ? (
          <div className="flex items-center gap-1 px-2 py-1 bg-rome-navy/10 rounded text-xs">
            {getEducationTypeIcon(child.currentEducation.type)}
            <span>{getEducationTypeName(child.currentEducation.type)}</span>
          </div>
        ) : (
          <div className="px-2 py-1 bg-muted rounded text-xs">
            Pas d'éducation
          </div>
        )}
      </div>
      
      {child.currentEducation.type !== 'none' && (
        <>
          <div className="mt-3">
            <p className="text-xs text-muted-foreground">Progression:</p>
            <div className="mt-1 h-2 bg-muted rounded-full">
              <div 
                className="h-full bg-rome-terracotta rounded-full" 
                style={{ width: `${child.currentEducation.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Débutant</span>
              <span>{child.currentEducation.progress}%</span>
              <span>Maître</span>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-xs text-muted-foreground">Mentor:</p>
            <p className="text-sm">{child.currentEducation.mentor}</p>
          </div>
          
          <div className="mt-3">
            <p className="text-xs text-muted-foreground">Compétences acquises:</p>
            <ul className="ml-5 list-disc text-xs mt-1">
              {child.currentEducation.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      
      <div className="mt-4 flex justify-end">
        <button className="roman-btn-outline text-xs">
          {child.currentEducation.type !== 'none' ? 'Modifier' : 'Assigner'}
        </button>
      </div>
    </div>
  );
};

interface EducationPathCardProps {
  path: {
    type: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    minAge: number;
    suitableFor: string;
    benefits: string[];
    careers: string[];
  }
}

const EducationPathCard: React.FC<EducationPathCardProps> = ({ path }) => {
  return (
    <div className="roman-card p-4 border-t-4 border-t-rome-navy hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-rome-navy">{path.icon}</div>
        <h4 className="font-cinzel">{path.title}</h4>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
      
      <div className="text-xs grid grid-cols-2 gap-x-3 gap-y-2">
        <div>
          <span className="font-medium">Âge minimum:</span> {path.minAge} ans
        </div>
        <div>
          <span className="font-medium">Convient:</span> {
            path.suitableFor === 'both' ? 'Tous' : 
            path.suitableFor === 'male' ? 'Garçons' : 'Filles'
          }
        </div>
      </div>
      
      <Separator className="my-3" />
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="font-medium mb-1">Bénéfices:</p>
          <ul className="ml-4 list-disc">
            {path.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <p className="font-medium mb-1">Carrières possibles:</p>
          <ul className="ml-4 list-disc">
            {path.careers.map((career, idx) => (
              <li key={idx}>{career}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Missing import for Coins
import { Coins } from 'lucide-react';
