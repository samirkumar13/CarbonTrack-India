import React from 'react';
import { Leaf, Menu } from 'lucide-react';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 px-4 py-3 flex items-center justify-between no-print">
      <div className="flex items-center gap-2">
         <div className="bg-brand-600 p-1.5 rounded-lg">
           <Leaf className="w-5 h-5 text-white" />
         </div>
         <span className="font-bold text-slate-900">CarbonTrack</span>
      </div>
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <Menu className="w-6 h-6 text-slate-600" />
      </button>
    </div>
  );
};
