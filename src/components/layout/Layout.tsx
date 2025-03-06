
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Laurels } from '../ui-custom/Laurels';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { TimePanel } from '@/components/time/TimePanel';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SidebarNavigation } from './SidebarNavigation';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  
  const toggleSidebar = () => setIsExpanded(!isExpanded);
  
  return (
    <div className={`fixed top-0 left-0 h-screen z-50 flex transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
      <div className="h-full flex flex-col bg-gradient-to-b from-rome-navy to-rome-navy/90 text-white shadow-lg border-r border-rome-gold/30">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-rome-gold/30">
          {isExpanded ? (
            <Link to="/" className="font-cinzel text-xl flex items-center gap-2">
              <span className="text-rome-terracotta">ROME</span> 
              <span className="text-white">JPEM</span>
            </Link>
          ) : (
            <Link to="/" className="font-cinzel text-xl text-rome-terracotta mx-auto">R</Link>
          )}
          
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
          >
            {isExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
        
        {/* User info */}
        <div className={`border-b border-rome-gold/30 p-4 ${isExpanded ? 'flex items-center gap-3' : 'flex flex-col items-center py-3'}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rome-terracotta to-rome-terracotta/70 flex items-center justify-center text-white font-cinzel flex-shrink-0">
            JA
          </div>
          {isExpanded && (
            <div className="flex flex-col">
              <span className="font-medium">Julius Aurelius</span>
              <span className="text-xs text-white/70">Paterfamilias</span>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <ScrollArea className="flex-1">
          <div className="p-3">
            <SidebarNavigation isExpanded={isExpanded} />
          </div>
        </ScrollArea>
        
        {/* Time */}
        <div className="border-t border-rome-gold/30 p-3 flex justify-center">
          <TimePanel minimal className="text-white" />
        </div>
      </div>
    </div>
  );
};

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-30">
        <Link to="/" className="font-cinzel text-xl text-rome-navy flex items-center gap-2">
          <span className="text-rome-terracotta">ROME</span> JPEM
        </Link>
        <div className="flex items-center gap-2">
          <TimePanel minimal />
          <button onClick={toggleMenu} className="p-2 text-rome-navy hover:text-rome-terracotta transition-colors">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleMenu}>
          <div className="w-64 h-full bg-white" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200">
              <Link to="/" className="font-cinzel text-xl text-rome-navy">
                <span className="text-rome-terracotta">ROME</span> JPEM
              </Link>
            </div>
            <ScrollArea className="h-[calc(100vh-64px)]">
              <div className="p-4">
                <SidebarNavigation isExpanded={true} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-roman-pattern">
      <MobileHeader />
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-4 md:p-6 pt-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto w-full animate-fade-up">
          {children}
        </div>
      </main>
      
      <footer className="bg-gradient-to-t from-rome-gold/10 via-rome-gold/5 to-transparent py-6 text-center text-sm text-muted-foreground mt-8 md:ml-64">
        <Laurels className="font-cinzel text-rome-navy">ROME JPEM Reboot</Laurels>
        <p className="mt-2">© {new Date().getFullYear()} - République Romaine</p>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Layout;
