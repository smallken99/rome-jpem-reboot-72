
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Laurels } from '@/components/ui-custom/Laurels';
import { ScrollText, Users, Building, Coins, ShieldCheck, LogIn } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-roman-pattern flex flex-col">
      {/* En-tête */}
      <header className="py-4 px-6 bg-gradient-to-b from-rome-parchment to-white/90 backdrop-blur-sm border-b border-rome-gold/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-cinzel text-2xl text-rome-navy flex items-center gap-2">
            <span className="text-rome-terracotta">ROME</span> JPEM
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="border-rome-navy/30 text-rome-navy hover:bg-rome-navy/10">
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-rome-terracotta hover:bg-rome-terracotta/90">
                Inscription
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 max-w-4xl mx-auto">
        <Laurels className="text-rome-navy mb-6">Roma Æterna</Laurels>
        <h1 className="text-4xl md:text-6xl font-cinzel text-rome-navy mb-6">Gérez Votre <span className="text-rome-terracotta">Gens</span> Romaine</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Plongez dans l'Antiquité romaine et prenez en main la destinée de votre famille patricienne. 
          Politique, commerce, alliances - votre héritage vous attend.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-rome-terracotta hover:bg-rome-terracotta/90 text-lg font-cinzel">
              Commencer l'Aventure
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="border-rome-navy/30 text-rome-navy hover:bg-rome-navy/10 text-lg font-cinzel">
              Connexion Compte
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white/80 border-t border-b border-rome-gold/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-cinzel text-rome-navy text-center mb-12">
            Caractéristiques <span className="text-rome-terracotta">Principales</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Users className="h-10 w-10" />}
              title="Gestion Familiale"
              description="Gérez votre famille, arrangez des mariages stratégiques et éduquez vos héritiers."
            />
            <FeatureCard 
              icon={<Building className="h-10 w-10" />}
              title="Propriétés & Domaines"
              description="Administrez vos villas, fermes et autres propriétés à travers l'Empire."
            />
            <FeatureCard 
              icon={<Coins className="h-10 w-10" />}
              title="Finances & Commerce"
              description="Suivez vos finances, investissez dans le commerce et gérez votre fortune."
            />
            <FeatureCard 
              icon={<ScrollText className="h-10 w-10" />}
              title="Carrière Politique"
              description="Gravissez le Cursus Honorum et influencez la politique de Rome."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-rome-navy/90 to-rome-navy text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-cinzel mb-4">Prêt à Écrire Votre <span className="text-rome-gold">Histoire Romaine</span>?</h2>
          <p className="text-lg mb-8 text-white/80">
            Rejoignez des milliers de joueurs et découvrez l'expérience immersive de la République Romaine.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-rome-terracotta hover:bg-rome-terracotta/90 text-lg font-cinzel">
              Créer Votre Gens Maintenant
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gradient-to-t from-rome-gold/10 via-rome-gold/5 to-transparent py-8 text-center text-sm text-muted-foreground">
        <Laurels className="font-cinzel text-rome-navy">SPQR</Laurels>
        <p className="mt-2">© {new Date().getFullYear()} - République Romaine</p>
      </footer>
    </div>
  );
};

// Composant Feature Card
const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="p-6 bg-white border border-rome-gold/20 rounded-md shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
      <div className="text-rome-terracotta mb-4">{icon}</div>
      <h3 className="font-cinzel text-xl text-rome-navy mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Welcome;
